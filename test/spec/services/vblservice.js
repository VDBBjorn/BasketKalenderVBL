'use strict';

describe('Service: vblService', function () {

  // load the service's module
  beforeEach(module('rapidApp'));

  // instantiate service
  var vblService;
  beforeEach(inject(function (_vblService_) {
    vblService = _vblService_;
  }));

  it('should do something', function () {
    expect(!!vblService).toBe(true);
  });

});
