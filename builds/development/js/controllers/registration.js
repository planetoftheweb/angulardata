myApp.controller('RegistrationController', function($scope) {
  
  $scope.login = function() {
    alert($scope.user.email);
  } //login

}); //RegistrationController