(function(angular) {
  'use strict';
  
  var demoApp = angular.module('demoApp', [
    'cmsClient', 
    'ngRoute', 
    'ngMaterial'
  ]);

  demoApp.config(['$routeProvider', '$locationProvider', 'cmsClientProvider', function ($routeProvider, $locationProvider, cmsClientProvider) {
    // Set the Firebase URL from which application data will be downloaded 
    cmsClientProvider.setContentUrl('https://sinanbolel.firebaseio.com/app/content');
    // Set route for the index.html
    $routeProvider.otherwise({ redirectTo: '/' });
    // Set HTML5 mode to hide `/#` form URL 
    $locationProvider.html5Mode(true);  
  }]);

  demoApp.controller('HomeController', ['$log', '$scope', '$cmsClient', function ($log, $scope, $cmsClient) {
    // TODO
    $scope.$content = {};

    $cmsClient.getContent().then(function(data){
      $scope.$content = data;
    }).catch(function(error){
      $log.error(error);
    });

  }]);


})(window.angular);
