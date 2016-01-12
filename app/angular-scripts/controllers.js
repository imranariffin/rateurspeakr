'use strict';

angular.module('myApp.controllers', ['ngRoute', 'ngCookies'])

/* CONTROLLERS */
.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.username = "imranariffin";
}])
.controller('LoginCtrl', ['$scope', '$cookieStore', '$http', '$location', function($scope, $cookieStore, $http, $location) {
  $scope.userLogin = function (user) {
    $cookieStore.put('signedin', 'true');
    console.log("signed in!");
    var apiurl = "http://localhost:1337";
    $http({
        url:  apiurl+"/login",
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
        console.log($scope.data);

        console.log("data.loginSuccess:");
        console.log(data.loginSuccess);

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
    console.log("done http");
  }
}])
.controller('SignupCtrl', ['$scope', function($scope) {
  $scope.username = "uzername";
}])
.controller('LogoutCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore) {
  $scope.username = "uzername";
  $scope.userLogout = function (user) {
    $cookieStore.put('signedin', '');
    console.log($cookieStore.get('signedin'));
    console.log("logged out");
  }
}])
.controller('MeCtrl', ['$scope', function($scope) {
  $scope.me = "Imran";
}])

/* user session controller */
.controller('HeaderCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore) {
  $scope.signedIn= $cookieStore.get('signedin');
  console.log("HeaderCtrl: $scope.signedIn is "+String($scope.signedIn));
    if ($scope.signedIn === 'true') {
      $scope.notSignedIn = '';
    } else {
      $scope.notSignedIn = 'true';
      $scope.signedIn = '';
    }
}])
.controller('SessionCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore) {
  $scope.signedIn = $cookieStore.get('signedin');
  console.log("SessionCtrl: $scope.signedIn is "+String($scope.signedIn));
}])

/* try CORS from local server api */
.controller('CorsCtrl', ['$scope', '$http', function($scope, $http) {
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