'use strict';

angular.module('carAssistentclientApp')
  .controller('NearestStationController', function (stationService, $scope) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        stationService.getNearestStation(pos.k, pos.D).then(function (data) {
          requestDirections(pos, new google.maps.LatLng(data.lat, data.lon), { strokeColor: '#ff0000' });
        }, function (error, status) {
          console.log("Bad response in Nearest Station. Status: " + status);
        });

        var mapOptions = {
          zoom: 13,
          center: pos,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.directionsService = new google.maps.DirectionsService();
        //$scope.map.setCenter(pos);
      }, function() {
        handleNoGeoLocation(true);
      });
    } else {
      // Browser doesn't support GeoLocation
      handleNoGeoLocation(false);
    }

    function handleNoGeoLocation(errorFlag) {
      if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
      } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
      }

      var options = {
        map: $scope.map,
        position: new google.maps.LatLng(60, 105),
        content: content
      };

      var infowindow = new google.maps.InfoWindow(options);
      $scope.map.setCenter(options.position);
    }
    function renderDirections(result, polylineOpts) {
      var directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap($scope.map);

      if (polylineOpts) {
        directionsRenderer.setOptions({
          polylineOptions: polylineOpts
        });
      }

      directionsRenderer.setDirections(result);
    }
    function requestDirections(start, end, polylineOpts) {
      $scope.directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, function (result) {
        renderDirections(result, polylineOpts);
      });
    }
  });
