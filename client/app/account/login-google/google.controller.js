/**
 * Created by tobi on 15.11.2015.
 */
angular.module('spc').controller('GoogleCtrl', function($location, $window, spcServerUrl) {
  $window.location.href = spcServerUrl + "/api/auth/google";
});
