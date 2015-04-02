var config = require('../libs/config');
require('../helpers/stringExtensions');
var helper = require('../helpers/fuelStationControllerHelper');
var request = require('request');

var getAllStation = function (lat, lon, callback) {
    var viewBox = helper.getViewBox(parseFloat(lat), parseFloat(lon), config.get('map:radius'));
    var url = config.get('map:urlTemplate').format(lat, lon, viewBox.left, viewBox.top, viewBox.right, viewBox.bottom);

    request({ url: url, json: true }, function (error, response, body) {
        if (!error && response.statusCode === 200)
            callback(helper.compressJson(body, config.get('map:responseFormat')));
    });
};

var getNearestStation = function (lat, lon, callback) {
    getAllStation(lat, lon, function(stations){
        var resultStation = stations[0];
        var resultLength = calculateLength({lat: lat, lon: lon}, {lat: resultStation.lat, lon: resultStation.lon});
        for (var i = 1; i < stations.length; i++) {
            var length = calculateLength({lat: lat, lon: lon}, {lat: stations[i].lat, lon: stations[i].lon});
            if (length < resultLength) {
                resultStation = stations[i];
                resultLength = length;
            };
        };
        callback(resultStation);
    });
};

var calculateLength = function (user, station) {
    return Math.sqrt(Math.pow(station.lon - user.lon, 2) + Math.pow(station.lat - user.lat, 2));
};

module.exports.getAllStation = getAllStation;
module.exports.getNearestStation = getNearestStation;