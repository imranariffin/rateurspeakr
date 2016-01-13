'use strict';

angular.module('myApp.controllers', ['ngRoute', 'ngCookies'])

/* CONTROLLERS */
.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.username = "imranariffin";
}])
.controller('LoginCtrl', ['$scope', '$cookieStore', '$http', '$location', 
  function($scope, $cookieStore, $http, $location) {
    $scope.userLogin = function (user) {
      $cookieStore.put('signedin', 'true');
      console.log("user signing in ...");
      var apiurl = "http://localhost:1337";
      $http({
          url:  apiurl + "/login",
          method: "POST",
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded'
          // },
          data: {
              username: $scope.username,
              password: $scope.password,
              _csrf: $scope._csrf
          }
        }).success(function(data, status, headers, config) {
          $scope.data = data;
          if (data.loginSuccess === 'true') {
            $location.path('/');
          } else {
            $location.path('/login');
          }

        }).error(function(data, status, headers, config) {
          $scope.data = data;
          $scope.status = status;
          $scope.headers = headers;
          $scope.config = config;
          console.log($scope.data);
          console.log("status: " + String($scope.status));
          console.log($scope.headers);
          console.log($scope.config);
      });
    }
}])
.controller('SignupCtrl', ['$scope', '$http', '$cookieStore', '$location',
  function($scope, $http, $cookieStore, $location) {
    $scope.userSignup = function () {
      console.log("user signing up ...");
      var apiurl = "http://localhost:1337";
      $http({
        url: apiurl + '/signup',
        method: 'POST',
        data : {
          username : $scope.username,
          password : $scope.password,
          _csrf: $scope._csrf
        }
      }).success(function (response) {
        // save session
        $cookieStore.put('signedin', 'true');
        console.log('response:');
        console.log(response);
        $cookieStore.put('user', response);
        // redirect to /speakrs
        $location.path('/speakrs');
      }).error(function (err) {
        $cookieStore.put('signedin', '');
        console.log("err:");
        console.log(err);
      });
    }
}])
.controller('LogoutCtrl', ['$scope', '$cookieStore', 
  function($scope, $cookieStore) {
    $scope.username = "uzername";
    $scope.userLogout = function (user) {
      $cookieStore.put('signedin', '');
      console.log($cookieStore.get('signedin'));
      console.log("logged out");
    }
}])
.controller('MeCtrl', ['$scope', 
  function($scope) {
    $scope.me = "Imran";
}])
.controller('SpeakrsCtrl', ['$scope', '$cookieStore',
  function($scope, $cookieStore) {
    var user = $cookieStore.get('user');
    $scope.user = user;
    $scope.speakrs = 'speakr list';
}])

/* user session controller */
.controller('HeaderCtrl', ['$scope', '$cookieStore',
  function($scope, $cookieStore) {
    $scope.signedIn= $cookieStore.get('signedin');
    console.log("HeaderCtrl: $scope.signedIn is "+String($scope.signedIn));
      if ($scope.signedIn === 'true') {
        $scope.notSignedIn = '';
      } else {
        $scope.notSignedIn = 'true';
        $scope.signedIn = '';
      }
}])
.controller('SessionCtrl', ['$scope', '$cookieStore', 
  function($scope, $cookieStore) {
    $scope.signedIn = $cookieStore.get('signedin');
    console.log("SessionCtrl: $scope.signedIn is "+String($scope.signedIn));
}])

/* try CORS from local server api */
.controller('CorsCtrl', ['$scope', '$http', 
  function($scope, $http) {
    var apiurl = "http://localhost:1337";
    $http({
        url:  apiurl + "/get-cors",
        method: "GET",
        data: {
          // user:user
        }
      }).success(function(data, status, headers, config) {
        $scope.data = data;
        $scope.status = status;
        $scope.headers = headers;
        $scope.config = config;
        console.log($scope.data);
        console.log("status: " + String($scope.status));
        console.log($scope.headers);
        console.log($scope.config);
      }).error(function(data, status, headers, config) {
        $scope.data = data;
        $scope.status = status;
        $scope.headers = headers;
        $scope.config = config;
        console.log($scope.data);
        console.log("status: " + String($scope.status));
        console.log($scope.headers);
        console.log($scope.config);
    });
}]);