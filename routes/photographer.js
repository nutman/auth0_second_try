var path = require('path');
var authenticate = require('auth0/authenticate.js');

module.exports = function (app, mongo_acl) {
    app.get('/photographer', authenticate, mongo_acl.middleware(1, get_user_id, ['create', 'read']), function (req, res) {
        console.log('photographer is here');
        mongo_acl.allowedPermissions(req.user.sub, '/admin', function (err, object) {
            console.log(object);

        });
        res.send(200, {
            text: "All good. You only get this message if you're photographer"
        });
    });
};

function get_user_id(req, res) {
    return req.user.sub;
}
