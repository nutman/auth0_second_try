var path = require('path');
var authenticate = require('auth0/authenticate.js');

module.exports = function (app, mongo_acl) {
    app.post('/set_user/:id', authenticate, mongo_acl.middleware(1, get_user_id, ['create', 'read', 'update', 'delete']), function (req, res) {

        var userInfo = req.body.user;

        mongo_acl.removeUserRoles(userInfo.user_id, ['admin', 'photographer', 'user'], function(err) {
            if (err) {
                return console.log(err)
            }
            console.log('user roles removed')
        });

        mongo_acl.addUserRoles(userInfo.user_id, userInfo.role, function(err) {
            if (err) {
                return console.log(err)
            }
            console.log('user role updated')
        });

        res.send(200, {
            text: "All good."
        });
    });
};

function get_user_id(req, res) {
    return req.user.sub;
}
