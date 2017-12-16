'use strict';

var myApp = angular.module('myApp', [
    'ngRoute',
    'AppControllers',
    'AppServices'
]);

myApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'partials/list.html',
                controller: 'AppListController'
            }).otherwise({
                redirectTo: '/'
            });
        }
    ]
);