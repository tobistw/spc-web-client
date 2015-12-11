/**
 * Created by tobi on 15.11.2015.
 */
angular.module('spc').controller('GoogleCbCtrl', function ($location, Auth, $scope) {
  // extract the AccessToken from URL response
  var currentUser = {};
  //todo: at least decode base64 (sensitive information)
  var accessToken = $location.search().access_token;
  var secondFactor = $location.search().secondFactor;
  var setupOtp = $location.search().setupOtp;
  var email = $location.search().email;
  var userId = $location.search()._id;
  var name = $location.search().name;
  var roles = $location.search().roles;
  currentUser = {
    userId: userId,
    name: name,
    email: email,
    roles: roles,
    secondFactor: secondFactor,
    setupOtp: setupOtp
  };
  // save token in cookie store
  // call the meta data endpoint to get the user / entity information
  Auth.loginGoogle(accessToken, currentUser)
    .then(function () {

      // check for two factor authentication
      if (secondFactor && setupOtp) {
        clear();
        $location.path('/setup-otp');
      } else if (secondFactor && !setupOtp) {
        clear();
        $location.path('/login-otp');
      }
      else {
        currentUser = Auth.getCurrentMetaData();
        // Logged in, redirect to home
        clear();
        $location.path('/');
      }
    }).catch(function (err) {
    console.debug("login failed", err);
    clear();
    $location.path('/google/callback');
    $scope.google = err.message;
  });

  function clear() {
    $location.search('access_token', null);
    $location.search('secondFactor', null);
    $location.search('setupOtp', null);
    $location.search('email', null);
    $location.search('_id', null);
    $location.search('name', null);
    $location.search('roles', null);
  }
});
