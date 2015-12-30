'use strict';

angular.module('spc')
  .factory('User', function ($resource, spcServerUrl) {
    return $resource(spcServerUrl + '/auth/users/:id/:controller', {
        id: '@_id'
      },
      {
        changePassword: {
          method: 'PUT',
          params: {
            controller: 'password'
          }
        }
      });
  });

angular.module('spc')
  .factory('CremaAuth', function ($resource, $cookieStore, spcServerUrl, apiKey, projectId) {
    return $resource(spcServerUrl + '/api/auth/' + projectId, {
      apikey: apiKey,
      access_token: function() {
        return $cookieStore.get('access_token');
      }
    });
  });
