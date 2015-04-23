'use strict';

angular.module('carAssistentclientApp')
  .service('stationService', ['$http', '$q', '$localStorage', 'settings', function stationService($http, $q, $localStorage, settings) {
    var getAllStations = function (lat, long) {
      var deferred = $q.defer();
      $http.get(settings.apiBaseUri + "/stations?lat=" + lat + "&lon=" + long)
        .success(function (response) {
          $localStorage.myPositionLat = lat;
          $localStorage.myPositionLong = long;
          $localStorage.getAllStations = response;

          deferred.resolve(response);
        }).error(function (err, status) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    var getNearestStation = function (lat, long) {
      var deferred = $q.defer();
      $http.get(settings.apiBaseUri + "/neareststation?lat=" + lat + "&lon=" + long)
        .success(function (response) {
          $localStorage.myPositionLat = lat;
          $localStorage.myPositionLong = long;

          deferred.resolve(response);
        }).error(function (err, status) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return {
      getAllStations: getAllStations,
      getNearestStation: getNearestStation
    };
  }]);
