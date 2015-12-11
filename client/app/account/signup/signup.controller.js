'use strict';

angular.module('spc')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {

    $scope.errors = {};

    $scope.roles = ["admin", "crema"];
    $scope.selectedRole = $scope.roles[0];

    $scope.register = function (form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          roles: [$scope.selectedRole]
        })
          .then(function () {
            console.debug("client signup.controller.js.register()", "success");
            // Account created, redirect to home
            $location.path('/');
          })
          .catch(function (err) {
            console.debug("client signup.controller.js register", "failed");
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
      }
    };
  });
