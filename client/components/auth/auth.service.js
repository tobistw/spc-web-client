'use strict';

angular.module('spc')
  .factory('Auth', function Auth($location, $rootScope, $http, User, CremaAuth, $cookieStore, $q) {
    var currentMetaData = {};
    if ($cookieStore.get('access_token')) {
      currentMetaData = CremaAuth.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function (user) {
        var deferred = $q.defer();

        $http.post('/api/auth/login', {
          email: user.email,
          password: user.password
        }).
          success(function (data) {
            if (data.secondFactor) {
              currentMetaData = data;
              deferred.resolve(data);
            } else {
              $cookieStore.put('access_token', data.access_token);
              currentMetaData = CremaAuth.get(null, function () {
                deferred.resolve(data);
              }, function (error) {
                deferred.reject(error.data);
              });
            }
          }).
          error(function (err) {
            this.logout();
            deferred.reject(err);
          }.bind(this));

        return deferred.promise;
      },

      loginLdap: function (user) {
        var deferred = $q.defer();

        $http.post('/api/auth/ldap', {
          email: user.email,
          password: user.password
        }).
        success(function (data) {
          if (data.secondFactor) {
            currentMetaData = data;
            deferred.resolve(data);
          } else {
            $cookieStore.put('access_token', data.access_token);
            currentMetaData = CremaAuth.get(null, function () {
              deferred.resolve(data);
            }, function (error) {
              deferred.reject(error.data);
            });
          }
        }).
        error(function (err) {
          this.logout();
          deferred.reject(err);
        }.bind(this));

        return deferred.promise;
      },

      loginGoogle: function (accessToken, user) {
        var deferred = $q.defer();
        if (user.secondFactor) {
          currentMetaData = user;
          currentMetaData.$promise = '&promise';
          deferred.resolve(currentMetaData);
        } else {
          $cookieStore.put('access_token', accessToken);
          currentMetaData = CremaAuth.get(null, function() {
            deferred.resolve();
          }, function (error) {
            deferred.reject(error.data);
          });
        }

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function () {
        $cookieStore.remove('access_token');
        currentMetaData = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function (user) {
        var deferred = $q.defer();

        console.debug("client auth.service.js createUser", "userData", user);

        User.save(user).$promise.then(function (data) {
          console.debug("client auth.service.js.createUser", "success", data);
          $cookieStore.put('access_token', data.access_token);
          return CremaAuth.get({id: currentMetaData._id}).$promise;
        }).then(function (cremaUser) {
          currentMetaData = cremaUser;
          deferred.resolve(cremaUser)
        }).catch(function (err) {
            console.debug("client auth.service.js createUser", "failed", err);
            deferred.reject(err);
          }
        );
        return deferred.promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function (oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({id: currentMetaData._id}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function (user) {
          return cb(user);
        }, function (err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user / entity
       *
       * @return {Object} user
       */
      getCurrentMetaData: function () {
        return currentMetaData;
      },

      setCurrentMetaData: function (metaData) {
        currentMetaData = metaData;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function () {
        return $cookieStore.get('access_token');
      },

      /**
       * Waits for currentMetaData to resolve before checking if user is logged in
       */
      isLoggedInAsync: function (cb) {
        if (currentMetaData.hasOwnProperty('$promise')) {
          currentMetaData.$promise.then(function () {
            cb(true);
          }).catch(function () {
            cb(false);
          });
        }
         else if (currentMetaData.hasOwnProperty('secondFactor')) {
          cb(true);
        } else {
          cb(false);
        }

      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function () {
        var isAdmin = false;
        if (currentMetaData && currentMetaData.entity !== undefined) {
          var roles = currentMetaData.entity.roles;
          roles.forEach(function(role, index, roles) {
            if (role === 'admin') {
              isAdmin = true;
            }
          });
        }
        return isAdmin;
      },

      /**
       * Check if user needs two-factor auth
       */
      isTwoFactor: function() {
        return currentMetaData.secondFactor;
      },

      /**
       * Get auth token
       */
      getToken: function () {
        return $cookieStore.get('access_token');
      }
    };
  });
