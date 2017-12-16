'use strict';

var appServices = angular.module('AppServices', ['ngResource']);

appServices.factory('Count', ['$resource',
    function ($resource) {
        return $resource('/emails/list/count', {});
    }]);

appServices.factory('Cars', ['$resource',
    function ($resource) {
        return $resource('/cars/:id', {id: '@id'},
            {
                'update': {
                    method: 'PUT'
                }
            });
    }]);

console.log("In services");