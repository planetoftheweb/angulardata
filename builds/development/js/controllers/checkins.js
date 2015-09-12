myApp.controller('CheckInsController', [
  '$scope', '$rootScope', '$firebaseArray',
  '$firebaseObject', '$routeParams',
  '$location', 'Authentication', 'CountMeetings', 'FIREBASE_URL',
  function($scope, $rootScope, $firebaseArray, $firebaseObject, $routeParams,
  $location, Authentication, CountMeetings, FIREBASE_URL) {

  $scope.whichmeeting = $routeParams.mId;
  $scope.whichuser = $routeParams.uId;
  $scope.order="firstname";
  $scope.direction= null;
  $scope.recordId='';
  $scope.query='';

  var ref = new Firebase(FIREBASE_URL + "/users/" +
    $scope.whichuser + "/meetings/" +
    $scope.whichmeeting + '/checkins');

  var checkinsList = $firebaseArray(ref);
  $scope.checkins = checkinsList;

  $scope.addCheckin = function() {
    var checkinsObj = $firebaseArray(ref);

    var myData = {
      firstname: $scope.user.firstname,
      lastname: $scope.user.lastname,
      email: $scope.user.email,
      date: Firebase.ServerValue.TIMESTAMP
    };

    checkinsObj.$add(myData).then(function() {
      $location.path('/checkins/' + $scope.whichuser + '/' +
        $scope.whichmeeting + '/checkinsList');
    });//checkinsObj
  }; //addCheckin


  $scope.pickRandom = function() {
    var whichRecord = Math.round(Math.random() * checkinsList.length);
    $scope.recordId = checkinsList.$keyAt(whichRecord);
  }; //pick winner

  $scope.deleteCheckin = function(myCheckin) {
    var refDel = new Firebase(FIREBASE_URL + "/users/" +
      $scope.whichuser + "/meetings/" +
      $scope.whichmeeting + '/checkins/' + myCheckin);
    var record = $firebaseObject(refDel);
    record.$remove(myCheckin);
  }; //deleteCheckin

  $scope.showLove = function(myCheckin) {
    myCheckin.show = !myCheckin.show;

    if(myCheckin.userState == 'expanded') {
      myCheckin.userState = '';
    } else {
      myCheckin.userState = 'expanded';
    }
  }; //showLove

  $scope.giveLove = function(myCheckin, myGift) {
    var refLove = new Firebase(FIREBASE_URL + '/users/'+
      $scope.whichuser + '/meetings/' +
      $scope.whichmeeting + '/checkins/' + myCheckin.$id +
      '/awards');
    var checkinsArray = $firebaseArray(refLove);

    var myData = {
      name: myGift,
      date: Firebase.ServerValue.TIMESTAMP
    };

    checkinsArray.$add(myData);
  }; //giveLove

  $scope.deleteLove = function(checkinId, award) {
    var refLove = new Firebase(FIREBASE_URL + '/users/'+
      $scope.whichuser + '/meetings/' +
      $scope.whichmeeting + '/checkins/' + checkinId +
      '/awards');
    var record = $firebaseObject(refLove);
    record.$remove(award);
  }; //deleteLove

}]); //CheckInsController
