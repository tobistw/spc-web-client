'use strict';

angular.module('spc')
  .factory('User', function ($resource) {
    return $resource('/auth/users/:id/:controller', {
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
  .factory('CremaAuth', function ($resource, $cookieStore) {
    return $resource('/api/auth/001', {
      apikey: '59559afbdae9e1075e68fa263057653b',
      access_token: function() {
        return $cookieStore.get('access_token');
      }
    });
  });
