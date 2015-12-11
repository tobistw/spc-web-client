'use strict';

angular.module('spc')
  .controller('UserInfoCtrl', function ($scope, $http, Auth, CremaAuth) {

    // Use the User $resource to fetch all users
    //$scope.info = CremaAuth.get();
    //$scope.isAdmin = Auth.isAdmin();
    $scope.meta = Auth.getCurrentMetaData();

    $scope.errors = {};

  });
