myApp.controller('StatusController', [
	'$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {

  $scope.logout = function() {
    Authentication.logout();
    $location.path('/login');
  }; //logout

}]); //StatusController