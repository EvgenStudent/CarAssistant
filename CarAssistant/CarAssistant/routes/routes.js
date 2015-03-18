var express = require('express');
var router = express.Router();

//==============

var fuelStations = require('../public/javascripts/custom/fuelStationDataReader');
var test = fuelStationData.getFuelStations();
var ttt = 1 + 1;

//==============

var indexData = { x: 53.6733327, y: 23.826727 };
var fuelStationData = { from: { x: 53.642946, y: 23.842051 }, to: { x: 53.676540, y: 23.825031 } };

router.get("/", function (req, res) {
	res.render("index", { model: indexData });
});

router.get("/fuelStation", function (req, res) {
    res.render("fuelStation", { model: fuelStationData });
});

module.exports = router;