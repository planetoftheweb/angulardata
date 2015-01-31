myApp.factory('Authentication', function($firebase, 
  $firebaseAuth, $routeParams, $location, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  //Temporary object
  var myObject = {

    login: function(user) {
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      }); //authWithPassword
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
    } //register

  }; //myObject
  return myObject;
}); //myApp Factory