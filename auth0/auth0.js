var Auth0 = require('auth0');
var nconf = require('./../conf/conf.js');

module.exports = new Auth0({
        domain: nconf.get('AUTH0_DOMAIN'),
        clientID: nconf.get('AUTH0_CLIENT_ID'),
        clientSecret: nconf.get('AUTH0_CLIENT_SECRET')
    });

