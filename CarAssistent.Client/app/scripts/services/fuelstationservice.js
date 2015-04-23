'use strict';

angular.module('carAssistentclientApp')
  .service('stationService', ['$http', '$q', function stationService($http, $q) {
    var getAllStations = function (lat, long) {
      var deferred = $q.defer();
      $http.get("http://localhost:8000/api/stations?lat=" + lat + "&lon=" + long)
        .success(function (response) {
          deferred.resolve(response);
        }).error(function (err, status) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    var getNearestStation = function (lat, long) {
      var deferred = $q.defer();
      $http.get("http://localhost:8000/api/neareststation?lat=" + lat + "&lon=" + long)
        .success(function (response) {
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
