'use strict';

angular.module('myApp.loginView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'loginView/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', [function($scope) {
	$scope.username = "uzername";
}]);