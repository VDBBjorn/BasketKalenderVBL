'use strict';

/**
 * @ngdoc service
 * @name rapidApp.vblService
 * @description
 * # vblService
 * Service in the rapidApp.
 */
angular.module('rapidApp')
    .constant('API', 'http://vblcb.wisseq.eu/VBLCB_WebService/data/')
    .constant('TEAM', 'BVBL1074')
    .service('vblService', function($http, $q, API, TEAM) {

        this.getOrganization = function() {
            var deferred = $q.defer();
            $http.get(API + 'OrgDetailByGuid?issguid=' + TEAM)
                .then(function(result) {
                    deferred.resolve(result);
                }, function() {
                    deferred.reject();
                });
            return deferred.promise;
        };

        this.getMatches = function(guid) {
            var deferred = $q.defer();
            $http.get(API + 'TeamMatchesByGuid?teamguid=' + guid)
                .then(function(result) {
                    deferred.resolve(result);
                }, function() {
                    deferred.reject();
                });
            return deferred.promise;
        };

    });