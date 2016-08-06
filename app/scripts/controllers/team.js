'use strict';

/**
 * @ngdoc function
 * @name rapidApp.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the rapidApp
 */
angular.module('rapidApp')
    .controller('TeamCtrl', function($routeParams, $scope, vblService) {
        $scope.matches = {};
        $scope.months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
        var guid = $routeParams.guid;
        vblService.getMatches(guid).then(function(result) {
            console.log(result);
            var matches = result.data;
            for (var i = 0; i < matches.length; i++) {
                var match = matches[i];
                var datestring = match.datumString;
                var pattern = /(\d{2})-(\d{2})-(\d{4})/;
                var date = new Date(datestring.replace(pattern, '$3-$2-$1'));
                match.date = date;
                console.log(datestring + ' converted to: ' + date);
            }
            $scope.matches = matches;
        });
    });