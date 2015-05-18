'use strict';

angular.module('myApp.view1')
    .controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {
        $scope.people = [
            {
                'name': 'Alan',
                'age': '28'
            },
            {
                'name': 'Maris',
                'age': '23'
            }
        ];

    }]);