var app = angular.module('myApp',  [ 'ngRoute' ]);

app
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'login.html',
        controller: 'login'
      }).
      when('/', {
        templateUrl: 'hello.html',
        controller: 'hello'
      });
  }]).controller('hello',
function($scope,$rootScope, $http, $location) 
{
	var basepath = "http://localhost:8080";
	if($rootScope.authenticated)
	{
		$http.get(basepath.concat("/hello"), {})
		.success(function(data) {
			$scope.hello = data;
			console.log(data);
		});
		
	}else{
		$location.path("/login");
	}
	

}).controller(
'login',

function($rootScope, $scope, $http, $location, $route) {
	var basepath = "http://localhost:8080";
	$scope.tab = function(route) {
		return $route.current && route === $route.current.controller;
	};

	var authenticate = function(credentials, callback) {

		var headers = credentials ? {
			authorization : "Basic "
			+ btoa(credentials.username + ":"
				+ credentials.password)
		} : {};

		$http.get(basepath.concat("/user"), {
			headers : headers
		}).success(function(data) {
			if (data.name) {
				$rootScope.authenticated = true;
			} else {
				$rootScope.authenticated = false;
			}
			callback && callback($rootScope.authenticated);
		}).error(function() {
			$rootScope.authenticated = false;
			callback && callback(false);
		});

	}

	authenticate();

	$scope.credentials = {};
	$scope.login = function() {
		authenticate($scope.credentials, function(authenticated) {
			if (authenticated) {
				console.log("Login succeeded")
				$location.path("/");
				$scope.error = false;
				$rootScope.authenticated = true;
			} else {
				console.log("Login failed")
				$location.path("/login");
				$scope.error = true;
				$rootScope.authenticated = false;
			}
		})
	};

	$scope.logout = function() {
		$http.post('logout', {}).success(function() {
			$rootScope.authenticated = false;
			$location.path("/");
		}).error(function(data) {
			console.log("Logout failed")
			$rootScope.authenticated = false;
		});
	}

});