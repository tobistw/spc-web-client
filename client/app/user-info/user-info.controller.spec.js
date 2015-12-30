'use strict';

describe('Controller: UserInfoCtrl', function () {

  var UserInfoCtrl, scope, metaData, $httpBackend;

  // load the controller's module
  beforeEach(module('spc'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('api/auth/001').
    respond([{id: '001', name: 'test'}, {company: 'test'},{color: 'red'}]);

    scope = $rootScope.$new();
    metaData = {};
    UserInfoCtrl = $controller('UserInfoCtrl', {
      $scope: scope
    });
  }));

  it('should respond an empty meta object', function () {
    expect(scope.meta).toMatch(metaData);
  });

  //it('should create MetaData model with user, public and private Payload', function() {
  //  $httpBackend.flush();
  //
  //  expect(scope.meta).
  //  toEqual([{id: '001', name: 'test'}, {company: 'test'}, {color: 'red'}]);
  //});
});
