myApp.controller('RegistrationController', 
  ['$scope', '$firebaseAuth', '$location', 
  'Authentication', 'FIREBASE_URL',
  function($scope, $firebaseAuth, $location,
    Authentication, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);
  
  $scope.login = function() {
    Authentication.login($scope.user);
  }; //login

  $scope.register = function() {
    Authentication.register($scope.user);
  }; //register

}]); //RegistrationController