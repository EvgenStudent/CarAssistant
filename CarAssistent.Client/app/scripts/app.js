'use strict';

angular
  .module('carAssistentclientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
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
