/**
 * Created by tobi on 20.10.2015.
 */
'use strict';

angular.module('spc')
  .controller('SetupOtpCtrl', function ($scope, Auth, Totp, $location) {
    var fingerprint = window.fp;

    Totp.setupTotp()
      .then(function () {
        var TotpService = Totp.getTotpService();
        $scope.qrCode = TotpService.qrCode;
        $scope.code = TotpService.totpkey;
      })
      .catch(function () {
        console.debug("setup failed", err);
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
            $scope.errors.other = err.message;
          });
      }
    }
  });
