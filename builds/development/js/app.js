var myApp = angular.module('myApp',
  ['ngRoute', 'firebase'])
  .constant('FIREBASE_URL',
    'https://adata2.firebaseio.com/');

myApp.run(['$rootScope', '$location', 
  function($rootScope, $location) {
  $rootScope.$on('$routeChangeError',
  function(event, next, previous, error) {
    if(error === 'AUTH_REQUIRED') {
      $rootScope.message='Sorry, you must log in to access that page';
      $location.path('/login');
    }
  });
}]); //Run myApp

myApp.config(['$routeProvider',
  function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller:  'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller:  'RegistrationController'
    }).
    when('/checkins/:uId/:mId', {
      templateUrl: 'views/checkins.html',
      controller:  'CheckInsController'
    }).
    when('/checkins/:uId/:mId/checkinsList', {
      templateUrl: 'views/checkinslist.html',
      controller:  'CheckInsController'
    }).
    when('/meetings', {
      templateUrl: 'views/meetings.html',
      controller: 'MeetingsController',
      resolve : {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //currentAuth
      }
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
