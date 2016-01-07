'use strict';

angular.module('spc')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/google-login', {
        templateUrl: 'app/account/login-google/google-login.html',
        controller: 'GoogleCtrl'
    })
      .when('/google/callback', {
        templateUrl: 'app/account/login-google/googlecb-login.html',
        controller: 'GoogleCbCtrl'
      })
      .when('/login-ldap', {
        templateUrl: 'app/account/login-ldap/login-ldap.html',
        controller: 'LoginLdapCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/login-otp', {
        templateUrl: 'app/account/login-otp/login-otp.html',
        controller: 'LoginOtpCtrl'
      })
      .when('/setup-otp', {
        templateUrl: 'app/account/setup-otp/setup-otp.html',
        controller: 'SetupOtpCtrl'
      })
  });
