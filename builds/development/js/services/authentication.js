myApp.factory('Authentication', function($firebase, 
  $firebaseAuth, $rootScope, $routeParams, $location, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  auth.$onAuth(function(authUser) {
    if (authUser) {
      var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
      var user = $firebase(ref).$asObject();
      $rootScope.currentUser = user;
    } else {
      $rootScope.currentUser = '';
    }
  });

  //Temporary object
  var myObject = {

    login: function(user) {
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      }); //authWithPassword
    }, //login

    logout: function(user) {
      return auth.$unauth();
    }, //login

    register: function(user) {
      return auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        var ref = new Firebase(FIREBASE_URL+'users');
        var firebaseUsers = $firebase(ref);

        var userInfo = {
          date : Firebase.ServerValue.TIMESTAMP,
          regUser : regUser.uid,
          firstname: user.firstname,
          lastname : user.lastname,
          email: user.email
        }; //user info

        firebaseUsers.$set(regUser.uid, userInfo);
      }); //promise
    }, //register

    requireAuth: function() {
      return auth.$requireAuth();
    }, //require Authentication

    waitForAuth: function() {
      return auth.$waitForAuth();
    } //Wait until user is Authenticated


  }; //myObject
  return myObject;
}); //myApp Factory