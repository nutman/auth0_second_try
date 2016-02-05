var path = require('path');
var mongoose = require('mongoose');
var authenticate = require('auth0/authenticate.js');

module.exports = function (app, mongo_acl) {
    app.get('/admin', authenticate, mongo_acl.middleware(1, get_user_id, ['create', 'read', 'update', 'delete']), function (req, res) {
        console.log('admin is here');
        mongo_acl.allowedPermissions(req.user.sub, '/admin', function (err, object) {
            if (err) {
                console.log('err = ', err);
            }
            console.log(object);
        });
        res.send(200, {
            text: "All good. You only get this message if you're admin"
        });
    });
};

function get_user_id(req, res) {
    return req.user.sub;
}
