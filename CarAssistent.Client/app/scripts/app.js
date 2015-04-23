'use strict';

var app = angular.module('carAssistentclientApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngStorage',
  'ngTouch'
]);

app.constant('settings', {
  apiBaseUri: 'http://localhost:8000/api'
});

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'StationController'
      })
      .when('/neareststation', {
        templateUrl: 'views/main.html',
        controller: 'NearestStationController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
