'use strict';

angular.module('myApp.controllers', ['ngRoute', 'ngCookies'])

/* CONTROLLERS */
.controller('HomeCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore) {
  $scope.user = $cookieStore.get('user');
}])
.controller('LoginCtrl', ['$scope', '$cookieStore', '$http', '$location', '$window',
  function($scope, $cookieStore, $http, $location, $window) {
    $scope.userLogin = function (user) {
      $cookieStore.put('signedin', 'true');
      console.log("user signing in ...");
      var apiurl = "http://localhost:1337";
      $http({
          url:  apiurl + "/login",
          method: "POST",
          data: {
              username: $scope.username,
              password: $scope.password,
              _csrf: $scope._csrf
          }
        }).success(function(data, status, headers, config) {
          var user = data;
          if (data.loginSuccess === 'true') {
            console.log("login success");
            $cookieStore.put('user', user);
            $cookieStore.put('signedIn', "true");
            $window.location.reload();
            $location.path('/speakrs');
          } else {
            console.log("login fail");
            $location.path('/login');
            $cookieStore.put('signedIn', "");
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
.controller('SignupCtrl', ['$scope', '$http', '$cookieStore', '$location', '$window',
  function($scope, $http, $cookieStore, $location, $window) {
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
        $window.location.reload();
        $location.path('/speakrs');
      }).error(function (err) {
        $cookieStore.put('signedin', '');
        console.log("err:");
        console.log(err);
      });
    }
}])
.controller('LogoutCtrl', ['$scope', '$cookieStore', '$location', '$window',
  function($scope, $cookieStore, $location, $window) {
    $scope.username = "uzername";
    $scope.userLogout = function (user) {
      $cookieStore.put("signedin", "");
      $cookieStore.put("notSignedIn", "true");
      $cookieStore.remove("user");
      $cookieStore.remove("username");
      console.log($cookieStore.get("signedin"));
      console.log("logged out");
      $window.location.reload();
      $location.path('/');
    }
}])
.controller('MeCtrl', ['$scope', 
  function($scope) {
    $scope.me = "Imran";
}])
.controller('SpeakrsCtrl', ['$scope', '$cookieStore',  '$http',
  function($scope, $cookieStore, $http) {
    var user = $cookieStore.get('user');
    $scope.user = user;
    var apiurl = 'http://localhost:1337';
    $http({
      url: apiurl + '/speakrs',
      method: "GET"
    }).success(function (response) {
      console.log(response);
      $scope.speakrs = response;
      $scope.speakrs.forEach(function (speakr) {
        $http({
          url: apiurl + "/talks?speakrId=" + speakr._id,
          method: "GET"
        }).success(function (response) {
          speakr.talks = response;
        }).error(function (err) {
          console.log(err);
        });
      });
      // $scope.speakrs.talks = 
    }).error(function (err) {
      console.log(err);
    });

    // $scope.getTalks = function (speakrId) {
    //   $http({
    //     url: ""
    //   });
    //   $scope.talks
    // }
}])

/* user session controller */
.controller('HeaderCtrl', ['$scope', '$cookieStore',
  function($scope, $cookieStore) {
    $scope.signedIn = $cookieStore.get('signedin');
    console.log("HeaderCtrl: $scope.signedIn is "+String($scope.signedIn));
    if ($scope.signedIn === 'true') {
      $scope.notSignedIn = '';
      $scope.user = $cookieStore.get('user');
      console.log("$cookieStore.get('user'):");
      console.log($scope.user);
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