'use strict';

describe('Controller: UserInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('spc'));

  var UserInfoCtrl, scope, metaData;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    metaData = {};
    UserInfoCtrl = $controller('UserInfoCtrl', {
      $scope: scope
    });
  }));

  it('should respond an empty meta object', function () {
    expect(scope.meta).toMatch(metaData);
  });
});
