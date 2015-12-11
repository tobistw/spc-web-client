'use strict';

angular.module('spc')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentMetaData = Auth.getCurrentMetaData;

    if (Auth.isAdmin === true) {
      $scope.menu = [
        {
        'title': 'Home',
        'link': '/'
        },
        {
          'title': 'User Info',
          'link': '/user-info'
        },
        {
          'title': 'User Management',
          'link': '/user-manager'
        }];
    } else {
      $scope.menu = [{
        'title': 'Home',
        'link': '/'
      },
        {
          'title': 'User Info',
          'link': '/user-info'
        }];
    }


    $scope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function (route) {
      return route === $location.path();
    };
  });
