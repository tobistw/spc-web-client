/**
 * Created by tobi on 11.12.2015.
 */
var express = require('express');
var app = require('http').createServer(server);
app.use(express.static(__dirname + '/client'));
require('./client/config/express')(app);
require('./client/config/routes')(app);
var port = 8080;
app.createServer().listen(port, '127.0.0.1', function() {
    console.log('Webserver for SPC Client listening on %d', port);
});
