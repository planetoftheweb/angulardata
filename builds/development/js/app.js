var myApp = angular.module('myApp', ['ngRoute', 'appControllers']);

var appControllers = angular.module('appControllers', []);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html'
    }).
    when('/register', {
      templateUrl: 'views/register.html'
    }).
    when('/meetings', {
      templateUrl: 'views/meetings.html'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);