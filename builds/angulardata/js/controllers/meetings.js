myApp.controller('MeetingsController', 
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function(authUser) {
      if (authUser) {
        var meetingsRef = new Firebase(FIREBASE_URL + 'users/' +
          $rootScope.currentUser.$id + '/meetings');
        var meetingsInfo = $firebaseArray(meetingsRef);

        $scope.addMeeting = function() {
          meetingsInfo.$add({
            name: $scope.meetingname,
            date: Firebase.ServerValue.TIMESTAMP
          }).then(function() {
            $scope.meetingname='';
          }); //promise
        }; // addMeeting
      } // User Authenticated
    }); // on Auth
}]); //Controller