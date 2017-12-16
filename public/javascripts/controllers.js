'use strict';

var appControllers = angular.module('AppControllers', []);

appControllers.controller('AppListController', ['$scope', 'Cars',
    function ($scope, Cars) {
        $scope.friends = [
            {name: 'Vikram', age: 25, gender: 'boy'}
        ];
        $scope.friends.forEach(function (a) {
            console.log(a.name);
        });

        $scope.title = 'Cars';
        $scope.text = 'Store cars to compare!!';
        $scope.action = 'Go ahead add a car you test driven.';

        // order crap
        $scope.orderByField = 'make';
        $scope.reverseSort = false;

        $scope.makes = [
            'Audi',
            'Jeep',
            'Mercedez',
            'Nissan'
        ];

        $scope.years = [
            '2019',
            '2018',
            '2017',
            '2016',
            '2015',
            '2014'
        ];

        $scope.showCarForm = true;
        $scope.formcar = {};

        getCars();

        $scope.showCarList = true;
        $scope.isEditScreen = false;

        function getCars() {
            $scope.cars = Cars.query({});
        }

        $scope.addUpdateCar = function () {
            if ($scope.formcar.make == undefined || $scope.formcar.model == undefined) {
                alert("Please provide valid values for make and model");
            } else {
                if ($scope.isEditScreen && $scope.formcar._id != undefined) {
                    delete $scope.formcar._id;
                    Cars.update({id: $scope.formcar._id}, $scope.formcar);
                    getCars();
                    $scope.isEditScreen = false;
                    $scope.formcar = {};
                } else if ($scope.isEditScreen && $scope.formcar._id == undefined) {
                    alert("Not a valid car to update, please select again to update.")
                } else {
                    Cars.save($scope.formcar);
                    $scope.formcar = {};
                    getCars();
                }
            }
        };

        $scope.editCar = function (car, $index) {
            $scope.formcar = car;
            $scope.isEditScreen = true;
        };

        $scope.deleteCar = function (car, index) {
            console.log('Asking to delete car %s', car._id);
            if (confirm('Are you sure you want to delete this car - ' + car.make + ' ' + car.model)) {
                $scope.cars.splice(index, 1);
                Cars.delete({id: car._id}, {});
            } else {
                console.log('Not deleting - ' + car._id);
            }
        };
    }
]);