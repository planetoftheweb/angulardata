myApp.controller('CheckInsController',
  ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray) {

    var ref, checkinsList;

    $scope.whichmeeting = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    ref = firebase.database().ref()
      .child('users').child($scope.whichuser)
      .child('meetings').child($scope.whichmeeting)
      .child('checkins');

    checkinsList = $firebaseArray(ref);
    $scope.checkins = checkinsList;

    $scope.order = 'firstname';
    $scope.direction = null;
    $scope.query = '';

    $scope.addCheckin = function() {
      $firebaseArray(ref).$add({
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date: firebase.database.ServerValue.TIMESTAMP
      }).then(function() {
        $location.path('/checkins/' + $scope.whichuser + '/' +
        $scope.whichmeeting + '/checkinsList')
      }); //$add
    }//addCheckin

    $scope.deleteCheckin = function(id) {
      var refDel = ref.child(id);
      var record = $firebaseObject(refDel);
      record.$remove(id);
    }

}]); //myApp.controller
