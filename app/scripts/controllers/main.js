'use strict';

/**
 * @ngdoc function
 * @name rapidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rapidApp
 */
angular.module('rapidApp')
  .controller('MainCtrl', function ($scope, vblService) {
  	$scope.teams = {};
    vblService.getOrganization().then(function(result) {
    	var json = result.data[0];
    	$scope.teams = json.teams;
    	
    });
  });
