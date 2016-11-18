myApp.controller('CheckInsController',
  ['$scope', '$rootScope', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $routeParams, $firebaseObject, $firebaseArray) {

    var ref;

    $scope.whichmeeting = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    ref = firebase.database().ref()
      .child('users').child($scope.whichuser)
      .child('meetings').child($scope.whichmeeting)
      .child('checkins');

    $scope.addCheckin = function() {
      $firebaseArray(ref).$add({
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date: firebase.database.ServerValue.TIMESTAMP
      }); //$add
    }//addCheckin

}]); //myApp.controller
