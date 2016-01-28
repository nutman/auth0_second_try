var nconf = require('./../conf/conf.js');
var jwt = require('express-jwt');

module.exports = jwt({
    secret: new Buffer(nconf.get('AUTH0_CLIENT_SECRET'), 'base64'),
    audience: nconf.get('AUTH0_CLIENT_ID')
});
