'use strict';

angular.module('spc')
    .controller('LoginOtpCtrl', function ($scope, Auth, Totp, $location) {
        $scope.errors = {};
        var fingerprint = window.fp;

        Totp.checkFingerprint(fingerprint)
            .then(function () {
                $location.path('/');
            })
            .catch(function (err) {
                console.debug('no existing fingerprint', err);
                if (err.message !== 'new fingerprint')
                    $scope.errors.fp = err.message;
            });

        $scope.verifyTotp = function (form) {

            $scope.submitted = true;

            if (form.$valid) {
                Totp.verifyTotp({
                        code: $scope.totp.code,
                        fingerprint: fingerprint
                    })
                    .then(function () {
                        // Logged in, redirect to home
                        $location.path('/')
                    })
                    .catch(function (err) {
                        console.debug("login failed", err);
                        $location.path('login-otp');
                        $scope.errors.other = err.message;
                    });
            }
        }
    });
