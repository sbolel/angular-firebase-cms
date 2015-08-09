(function(angular) {

  var demoApp = angular.module('demoApp', ['firebaseCms', 'ngRoute', 'ngMaterial']);


  demoApp.config(['$routeProvider', '$locationProvider', 'firebaseCmsProvider', function ($routeProvider, $locationProvider, firebaseCmsProvider) {
    
    // Set the Firebase URL from which application data will be downloaded 
    firebaseCmsProvider.setContentUrl('https://sinanbolel.firebaseio.com/app/content');
    
    // Set route for the index.html
    $routeProvider.otherwise({ redirectTo: '/' });
    
    // Set HTML5 mode to hide `/#` form URL 
    $locationProvider.html5Mode(true);  
  
  }]);


  demoApp.controller('HomeController', ['$scope', function ($scope) {
    // TODO
  }]);


})(window.angular);
