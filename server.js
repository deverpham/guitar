"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var controller_1 = require("./app/control/controller");
var config_1 = require("./app/core/config");
app.set('views', config_1.default.viewPath);
app.set('view engine', config_1.default.viewEngine);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(config_1.default.publicFolder, express.static('public'));
controller_1.default(app);
app.listen(config_1.default.port, config_1.default.host, function () {
    console.log('server Started');
});
