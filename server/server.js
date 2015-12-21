/**
 * Created by tobi on 11.12.2015.
 */
/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var app = express();
var server = require('http').createServer(app);


app.use(express.static(__dirname + '/client'));
require('./config/express')(app);
require('./config/routes')(app);

server.listen(config.port, config.ip, function() {
    var host = server.address().address;
    console.log('Webserver for SPC Client url: %s listening on %d', host, config.port);
});

// Expose app
exports = module.exports = app;