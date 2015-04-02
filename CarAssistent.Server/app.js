var express = require('express');
var path = require('path');
var config = require('./libs/config');
var log = require('./libs/log')(module);
//var ArticleModel = require('./libs/mongoose').ArticleModel;
var app = express();
var fuelController = require('./controllers/fuelStationController');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.get('/api/stations', function(req, res) {
    var lat = req.query.lat;
    var lon = req.query.lon;

    if (lat == null || lon == null) {
        res.status(400);
        res.send({ error: 'There are no options lat and lon' });
        return;
    }

    fuelController.getAllStation(lat, lon, function (response){
        res.status(200);
        res.send(response);
    });
});

app.get('/api/neareststation', function(req, res) {
    var lat = req.query.lat;
    var lon = req.query.lon;

    if (lat == null || lon == null) {
        res.status(400);
        res.send({ error: 'There are no options lat and lon' });
        return;
    }

    fuelController.getNearestStation(lat, lon, function (response){
        res.status(200);
        res.send(response);
    });
});

app.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});