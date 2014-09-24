myApp.controller('RegistrationController', 
  function($scope, $location) {
  
  $scope.login = function() {
    $location.path('/meetings');
  } //login

}); //RegistrationController