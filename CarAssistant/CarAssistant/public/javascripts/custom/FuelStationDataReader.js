var request = require('request');

var url = "http://nominatim.openstreetmap.org/search?q=belarus[fuel]&format=xml&polygon=0&addressdetails=1&limit=1000";


var getFuelStations = ReadByUrl(url);

function ReadByUrl(url) {
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
}

module.exports = getFuelStations;