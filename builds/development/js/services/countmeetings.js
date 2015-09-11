myApp.factory('CountMeetings', [
  '$firebaseArray', '$rootScope', 'FIREBASE_URL',
  function($firebaseArray,
  $rootScope, FIREBASE_URL) {

  $rootScope.currentUser.$watch(function()  {
    var ref = new Firebase(FIREBASE_URL + '/users/' +
    $rootScope.currentUser.$id + '/meetings');
    var meetingsArray = $firebaseArray(ref);

    meetingsArray.$loaded(function(data) {
      $rootScope.howManyMeetings = meetingsArray.length;
    });

    meetingsArray.$watch(function(data) {
      $rootScope.howManyMeetings = meetingsArray.length;
    });
  }); //watch for changes
  return true;
}]); //CountMeetings
