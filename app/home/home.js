angular.module( 'sample.home', [
'auth0',
'ngSanitize',
'ui.select'
])
.controller( 'HomeCtrl', function HomeController( $scope, auth, $http, $location, store, jwtHelper, HomeService ) {

  $scope.auth = auth;
  $scope.role = [];
  $scope.roles = [];
  $scope.rolesList = ['admin', 'photographer', 'user'];
  $scope.users = [];

  $scope.callApiSecuredAdmin = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://192.168.1.144:3001/admin',
      method: 'GET'
    }).then(function() {
      console.log("We got the secured data successfully");
    }, function(response) {
      if (response.status == 0) {
        console.log("Please download the API seed so that you can call it.");
      }
      else {
        console.log(response.data);
      }
    });
  };

  $scope.callApiSecuredPhotographer = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://192.168.1.144:3001/photographer',
      method: 'GET'
    }).then(function() {
      console.log("We got the secured data successfully");
    }, function(response) {
      if (response.status == 0) {
        console.log("Please download the API seed so that you can call it.");
      }
      else {
        console.log(response.data);
      }
    });
  };

  $scope.callApiSecuredPing = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://192.168.1.144:3001/secured/ping',
      method: 'GET'
    }).then(function() {
      console.log("We got the secured data successfully");
    }, function(response) {
      if (response.status == 0) {
        console.log("Please download the API seed so that you can call it.");
      }
      else {
        console.log(response.data);
      }
    });
  };

  $scope.canView = function(arr) {
    var access = false;
    if (typeof arr !== 'object') {
      arr = [arr]
    }

    arr.forEach(function(role) {
      if ($scope.roles.indexOf(role) !== -1) {
        access = true;
      }
    });

    return access;
  };

  $http({
    url: 'http://192.168.1.144:3001/authentication',
    method: 'GET'
  }).then(function(response) {
    $scope.permissions = response.data.permissions;
    $scope.roles = response.data.roles;

    HomeService.getUsers({}, function (err, users) {
      if (err) {
        console.log(err);
        return;
      }
      $scope.users = users;
    });

  }, function(response) {
    if (response.status == 0) {
      console.log("Please download the API seed so that you can call it.");
    }
    else {
      console.log(response.data);
    }
  });

  $scope.login = function() {
    auth.signin({}, function(profile, token) {
      store.set('profile', profile);
      store.set('token', token);

      $http({
        url: 'http://192.168.1.144:3001/authentication',
        method: 'GET'
      }).then(function(response) {
        $scope.roles = response.data.roles;

        HomeService.getUsers({}, function (err, users) {
          if (err) {
            console.log(err);
            return;
          }
          $scope.users = users;
        });
      }, function(response) {
        if (response.status == 0) {
          console.log("Please download the API seed so that you can call it.");
        }
        else {
          console.log(response.data);
        }
      });
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  };

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $scope.roles = [];
  };

  $scope.saveUserRole = function(user) {
    HomeService.setUser(user, function(err) {
      if (err) {
        console.log(err);
      }
    });
  };
});
