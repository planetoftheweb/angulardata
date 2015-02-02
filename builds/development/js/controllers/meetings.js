myApp.controller('MeetingsController',
  function($scope, $rootScope, $firebase,
    CountMeetings, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/meetings');

  var meetingsInfo = $firebase(ref);
  var meetingsObj = meetingsInfo.$asObject();

  meetingsObj.$loaded().then(function(data) {
    $scope.meetings = data;
  }); //make sure meetings data is loaded


  $scope.addMeeting = function() {
    meetingsInfo.$push({
      name: $scope.meetingname,
      date: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.meetingname='';
    });
  }; //addmeeting

  $scope.deleteMeeting = function(key) {
    meetingsInfo.$remove(key);
  }; //deleteMeeting


}); //MeetingsController