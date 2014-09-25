myApp.controller('RegistrationController', 
  function($scope, $location) {
  
  $scope.login = function() {
    $location.path('/meetings');
  } //login

  $scope.register = function() {
    $location.path('/meetings');
  } //login

}); //RegistrationController