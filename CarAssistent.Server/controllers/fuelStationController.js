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

module.exports.getAllStation = getAllStation;