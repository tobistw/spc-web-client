'use strict';

angular.module('spc')
  .controller('LoginLdapCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function (form) {

      $scope.submitted = true;

      if (form.$valid) {
        Auth.loginLdap({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            var currentMetaData = Auth.getCurrentMetaData();
            if(currentMetaData.secondFactor && currentMetaData.setupOtp) {
              $location.path('/setup-otp');
            } else if (currentMetaData.secondFactor && !currentMetaData.setupOtp) {
              $location.path('/login-otp');
            }
            else {
              // Logged in, redirect to home
              $location.path('/');
            }
          })
          .catch(function (err) {
            console.debug("login failed", err);
            $scope.errors.other = err.message;
          });
      }
    };
  });
