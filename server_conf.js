var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var path = require('path');

var authenticate = require('./auth0/authenticate.js');

module.exports = function server_conf(app) {
    app.configure(function () {
        app.use(cors());

        // Request body parsing middleware should be above methodOverride

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        app.use('/app', express.static(path.join(__dirname, '/app')));

        app.use('/secured', authenticate, function (req, res) {
            if (!req.user.admin) return res.send(401);
            res.send(200);
        });

        app.use(app.router);
    });
};
