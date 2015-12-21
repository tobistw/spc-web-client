/**
 * Created by tobi on 11.12.2015.
 */
'use strict';

var path = require('path');

var all = {
    env: process.env.NODE_ENV,
    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server IP
    ip:       process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    'localhost',

    // Server port
    port:     process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080
};

module.exports = all;