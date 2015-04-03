'use strict';

angular.module('carAssistentclientApp')
  .service('stationService', ['$http', '$q', function stationService($http, $q) {

    var getAllStations = function (lat, long) {
      var deferred = $q.defer();
      $http.get("http://localhost:8000/api/stations?lat=" + lat + "&lon=" + long)
        .success(function (response) {
          debugger;
          deferred.resolve(response);
        }).error(function (err, status) {
          debugger;
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return {
      getAllStations: getAllStations
    };
  }]);
