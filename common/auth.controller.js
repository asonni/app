(function () {
  angular
    .module('retinaeApp')
    .controller('loginController', loginController);

  loginController.$inject = ['$firebaseAuth', '$firebaseObject', '$location', 'firebaseUrl'];
  function loginController ($firebaseAuth, $firebaseObject, $location, firebaseUrl) {
    var vm = this;
    vm.isLoggedIn  = false;

    var ref = new Firebase(firebaseUrl);
    var authObj = $firebaseAuth(ref);

    //initialize and get current authenticated state:
    init();

    function init(){
      authObj.$onAuth(authDataCallback);
      if (authObj.$getAuth()){
          vm.isLoggedIn  = true;
      }
    }

    function authDataCallback(authData) {
        if (authData) {
          console.log("User " + authData.uid + " is logged in with " + authData.provider);
          vm.isLoggedIn = true;
          var user = $firebaseObject(ref.child('users').child(authData.uid));
          user.$loaded().then(function () {
            if (user.name == undefined) {
              var newUser = {};
              if (authData.google) {
                newUser.name = authData.google.displayName;
              }
              if (authData.facebook) {
                newUser.name = authData.facebook.username;
              }
              if (authData.twitter) {
                newUser.name = authData.twitter.displayName;
              }
              if (authData.password) {
                newUser.name = vm.name;
              }
              user.$ref().set(newUser);
            }
          });
        } else {
            console.log("User is logged out");
            vm.isLoggedIn = false;
        }
    }
    vm.logout = function () {
      ref.unauth();
      $location.path('/');
    }
    
    firebaseAuthLogin = function(provider){
      authObj.$authWithOAuthPopup(provider).then(function (authData) {
          console.log("Authenticated successfully with provider " + provider +" with payload:", authData);
      }).catch(function (error) {
          console.error("Authentication failed:", error);
          vm.errorLogin = error;
          vm.errorRegister = error;
      });
    }

    authWithPassword = function(obj){
      ref.authWithPassword(obj, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          vm.errorLogin = error;
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    }
    register = function(obj){
      ref.createUser(obj, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
          vm.errorRegister = error;
        } else {
          console.log(userData);
          console.log("Successfully created user account with uid:", userData.uid);
          authWithPassword(obj);
        }
      });
    }
    vm.facebookLogin = function () {
      firebaseAuthLogin('facebook');
      $location.path('/');
    }
    vm.googleLogin = function () {
      firebaseAuthLogin('google');
      $location.path('/');
    }
    vm.twitterLogin = function () {
      firebaseAuthLogin('twitter');
      $location.path('/');
    }

    vm.emailLogin = function (valid) {
      if(valid){
        authWithPassword({email : vm.email, password : vm.password});
        $location.path('/');
      } else {
        console.log("Invalid Form!");
      }
    }
    vm.register = function (valid) {
      if(valid){
        register({email : vm.email, password : vm.password});
        $location.path('/');
      } else {
        console.log("Invalid Form!");
      }
    }
    vm.goToRegister = function(){
      $location.path('/register');
    }
    vm.goToLogin = function(){
      $location.path('/login');
    }
  }
})();