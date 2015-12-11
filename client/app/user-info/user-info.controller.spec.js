'use strict';

describe('Controller: UserManagementCtrl', function () {

  // load the controller's module
  beforeEach(module('spc'));

  var UserManagementCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserManagementCtrl = $controller('UserManagementCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
