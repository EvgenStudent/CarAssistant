'use strict';

angular.module('carAssistentclientApp')
  .controller('StationController', function (stationService, $scope) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        stationService.getAllStations(pos.k, pos.D).then(function (data) {
          createMarker(position.coords.latitude, position.coords.longitude, null, false, 'images/mymarker.png');
          for (var i = 0; i < data.length; i++)
            createMarker(data[i].lat, data[i].lon, data[i].display_name, true, 'images/objectmarker.png');
        }, function (error, status) {
          console.log("Bad response in All Stations. Status: " + status);
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

    function createMarker(lat, lon, title, isClickable, icon){
      var infoWindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(lat, lon),
        title: title,
        icon: icon
      });

      if (isClickable)
        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h6 style="width: 250px;">' + marker.title + '</h6>');
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
