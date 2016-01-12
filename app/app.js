'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',  
  'myApp.controllers',
  'myApp.version',
  'ngCookies'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/', {
	    templateUrl: 'views/home.html',
	    controller: 'HomeCtrl'
  	}).  
  	when('/login', {
	    templateUrl: 'views/login.html',
	    controller: 'LoginCtrl'
  	}).
  	when('/signup', {
	    templateUrl: 'views/signup.html',
	    controller: 'LoginCtrl'
  	}).
  	when('/me', {
  		templateUrl: 'views/me.html',
  		controller: 'MeCtrl'
  	}).

  	/* try CORS from local server api */
  	when('/get-cors', {
  		templateUrl: 'views/cors.html',
  		controller: 'CorsCtrl'
  	}).

  	otherwise({
  		redirectTo: '/view1'
  	});
}]);