/**
 * Created by tobi on 20.10.2015.
 */
angular.module('spc')
  .factory('Totp', function Totp($http, Auth, CremaAuth, spcServerUrl, $q, $cookieStore) {
    var TotpService = {};
    var currentMetaData = Auth.getCurrentMetaData();

    return {
      setupTotp: function () {
        var deferred = $q.defer();

        $http.get(spcServerUrl + '/api/auth/setup-otp', {
          params: currentMetaData
        }).
          success(function (data) {
            TotpService.qrCode = data.qrCode;
            TotpService.totpkey = data.totpkey;
            deferred.resolve(data);
          }).
          error(function (err) {
            deferred.reject(err);
          }.bind(this));

        return deferred.promise;
      },

      verifyTotp: function (totp, fingerprint) {
        var deferred = $q.defer();

        $http.post(spcServerUrl + '/api/auth/login-otp', {
          code: totp.code,
          user: currentMetaData,
          fingerprint: totp.fingerprint
        })
          .success(function (data) {
            $cookieStore.put('access_token', data.access_token);
            currentMetaData = CremaAuth.get(null, function () {
              Auth.setCurrentMetaData(currentMetaData);
              deferred.resolve(currentMetaData);
            }, function (error) {
              deferred.reject(error.data);
            });
          })
          .error(function (err) {
            // Auth.logout();
            deferred.reject(err);
          }.bind(this));

        return deferred.promise;
      },

      checkFingerprint: function (fingerprint) {
        var deferred = $q.defer();
        currentMetaData = Auth.getCurrentMetaData();
        currentMetaData.fingerprint = fingerprint;

        //todo: encode at least base 64 (sensitive information)
        $http.get(spcServerUrl + '/api/auth/login-otp', {
          params: currentMetaData
        })
          .success(function (data) {
            $cookieStore.put('access_token', data.access_token);
            currentMetaData = CremaAuth.get(null, function () {
              Auth.setCurrentMetaData(currentMetaData);
              deferred.resolve(currentMetaData);
            }, function (error) {
              deferred.reject(error.data);
            });
          }).error(function (err) {
            deferred.reject(err);
          }.bind(this));

        return deferred.promise;
      },

      getTotpService: function () {
        return TotpService;
      }
    }
  });
