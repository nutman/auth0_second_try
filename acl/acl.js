var mongodb = require('mongodb');
var node_acl = require('acl');
var mongo_acl;

module.exports = function(routes, app) {
    mongodb.connect('mongodb://127.0.0.1:27017/auth0_users', _mongo_connected);
    function _mongo_connected(err, db) {

        var mongoBackend = new node_acl.mongodbBackend(db, 'acl_');
        if (err) {
            console.log(err);
        }

        mongo_acl = new node_acl(mongoBackend);

        require('./acl_conf.js')(mongo_acl);
        routes(app, mongo_acl);
    }
};


