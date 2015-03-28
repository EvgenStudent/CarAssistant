/**
 * Created by Evgen on 28.03.2015.
 */
var getViewBox = function (lat, lon, radius){
    return {
        left: lat + radius,
        top: lon + radius,
        right: lat - radius,
        bottom: lon - radius
    };
};

var compressJson = function (array, config){
    var resultArray = [];
    for (var i = 0; i < array.length; i++) {
        var station = {};
        for (var j = 0; j < config.length; j++){
            var parameter = config[j];
            station[parameter] = array[i][parameter];
        };
        resultArray[i] = station;
    };

    return resultArray;
};

module.exports.getViewBox = getViewBox;
module.exports.compressJson = compressJson;