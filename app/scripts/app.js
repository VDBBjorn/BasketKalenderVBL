'use strict';

/**
 * @ngdoc overview
 * @name rapidApp
 * @description
 * # rapidApp
 *
 * Main module of the application.
 */
angular
  .module('rapidApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/team', {
        templateUrl: 'views/team.html',
        controller: 'TeamCtrl',
        controllerAs: 'team'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
