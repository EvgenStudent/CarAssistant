'use strict';

angular.module('carAssistentclientApp')
  .controller('StationController', ['$http', function ($http, $scope) {

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        $http.get("http://localhost:8000/api/stations?lat=" + pos.k + "&lon=" + pos.D)
          .success(function (response) {
            debugger;
            for (var i = 0; i < response.length; i++){
              createMarker(response[i]);
            };
          }).error(function (err, status) {
            debugger;
          });

        var mapOptions = {
          zoom: 13,
          center: pos
        };
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var infowindow = new google.maps.InfoWindow({
          map: $scope.map,
          position: pos,
          content: 'Location found using HTML5.'
        });

        $scope.map.setCenter(pos);
      }, function() {
        handleNoGeoLocation(true);
      });
    } else {
      // Browser doesn't support GeoLocation
      handleNoGeoLocation(false);
    }


    $scope.markers = [];
    var createMarker = function (info){
      var infoWindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(info.lat, info.lon),
        title: info.display_name
      });
      marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent('<h5>' + marker.title + '</h5>' + marker.content);
        infoWindow.open($scope.map, marker);
      });

      $scope.markers.push(marker);
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
  }]);
