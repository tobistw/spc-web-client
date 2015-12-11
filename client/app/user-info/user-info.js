'use strict';

angular.module('spc')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/user-info', {
        templateUrl: 'app/user-info/user-info.html',
        controller: 'UserInfoCtrl',
        authenticate: true
      });
  });
