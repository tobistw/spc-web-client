/**
 * Created by tobi on 11.12.2015.
 */
/**
 * Express configuration
 */

'use strict';

var express = require('express');
var path = require('path');
var config = require('./environment');

module.exports = function(app) {
    app.set('appPath', 'client');
    app.set('views', config.root + '/' + app.get('appPath'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.static(path.join(config.root, 'client')));
};