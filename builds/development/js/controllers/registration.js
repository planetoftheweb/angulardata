myApp.controller('RegistrationController', 
  function($scope, $firebaseAuth, $location, Authentication) {

  var ref = new Firebase('https://sunovait.firebaseio.com/');
  var auth = $firebaseAuth(ref);
  
  $scope.login = function() {
    consoel.log($scope.user.email);
    Authentication.login($scope.user)
    .then(function(user) {
      $location.path('/meetings');
    }).catch(function(error) {
      $scope.message = error.message;
    });
  }; //login

  $scope.register = function() {
    Authentication.register($scope.user)
      .then(function(user) {
        Authentication.login($scope.user);
        $location.path('/meetings');
      }).catch(function(error) {
        $scope.message = error.message;
      });

    $scope.name='Chi';
      $scope.$on('$viewContentLoaded',function(){
console.log($scope.myform);*/
      });
  }; //register

}); //RegistrationController