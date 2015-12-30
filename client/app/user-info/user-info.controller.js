'use strict';

angular.module('spc')
  .controller('UserInfoCtrl', function ($scope, $http, Auth) {

    // Use the User $resource to fetch all users
    //$scope.isAdmin = Auth.isAdmin();
    $scope.meta = Auth.getCurrentMetaData();

    $scope.errors = {};

  });
