'use strict';

angular.module('carAssistentclientApp')
  .controller('StationController', function (stationService, $scope) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        stationService.getAllStations(pos.k, pos.D).then(function (data) {
          for (var i = 0; i < data.length; i++)
            createMarker(data[i]);
        }, function (error) {
          debugger;
        });

        var mapOptions = {
          zoom: 13,
          center: pos
        };
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.map.setCenter(pos);
      }, function() {
        handleNoGeoLocation(true);
      });
    } else {
      // Browser doesn't support GeoLocation
      handleNoGeoLocation(false);
    }

    function createMarker(info){
      var infoWindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(info.lat, info.lon),
        title: info.display_name
      });

      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent('<h6>' + marker.title + '</h6>');
        infoWindow.open($scope.map, marker);
      });
    };
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
  });
