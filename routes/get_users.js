var path = require('path');
var async = require('async');
var mongoose = require('mongoose');
var Users = mongoose.model('auth0_users');

var authenticate = require('auth0/authenticate.js');

module.exports = function (app, mongo_acl) {
    app.get('/get_users', authenticate, mongo_acl.middleware(1, get_user_id, ['create', 'read', 'update', 'delete']), function (req, res) {
        Users.find({}, {
            _id: 1,
            name: 1,
            email: 1,
            picture: 1,
            user_id: 1
        }).lean().exec(function (err, users) {
            if (err) {
                return console.log(err);
            }

            async.map(users,
                function iterator(user, cb) {
                    mongo_acl.userRoles(user.user_id, function (err, object) {
                        user.role = object[0];
                        cb(null, user);
                    });

                }, function (err, users) {
                    if (err) {
                        console.log(err);
                        res.send(500, {
                            text: "Server error."
                        });
                    }

                    res.send(200, {
                        text: "All good. Get your your users",
                        data: users
                    });
                }
            );
        });
    });
};

function get_user_id(req, res) {
    return req.user.sub;
}
