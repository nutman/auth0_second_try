var path = require('path');
var mongoose = require('mongoose');
var Users = mongoose.model('auth0_users');
var authApi = require('auth0/auth0.js');

module.exports = function (app, mongo_acl) {
    app.get('/secured/ping', function (req, res) {
        authApi.getUser(req.user.sub, function (err, currentUser) {
            if (err) {
                return console.log(err);
            }

            Users.findOne({email: currentUser.email}).exec(function (err, user) {
                if (err) {
                    return console.log(err);
                }
                if (user) {
                    console.log('user exists');


                    mongo_acl.isAllowed(user.user_id, '/ping', 'read', function (err, res) {
                        if (err) {
                            console.log('mongo_acl = ', err);
                        }
                        console.log('mongo_acl = ', res);
                    });

                    mongo_acl.allowedPermissions(user.user_id, '/ping', function (err, object) {
                        res.send(200, {
                            text: "All good. You only get this message if you're authenticated",
                            permissions: object
                        });

                    });


                    if (user.user_id !== currentUser.user_id) {
                        console.log('Updating user_id from ', user.user_id, ' to ', currentUser.user_id);
                        Users.update({email: currentUser.email}, {user_id: currentUser.user_id})
                    }
                    return;
                }

                var user = new Users({
                    name: currentUser.name,
                    email: currentUser.email,
                    picture: currentUser.picture,
                    user_id: currentUser.user_id
                });

                user.save(function (err, user) {
                    if (err) {
                        return console.log(err);
                    }

                    console.log('new user saved with default permissions', user);

                    if (user.email === 'juncker8888@gmail.com') {
                        mongo_acl.addUserRoles(user.user_id, 'admin');
                    } else {
                        mongo_acl.addUserRoles(user.user_id, 'user');
                    }


                    res.send(200, {
                        text: "All good. You only get this message if you're authenticated",
                        permissions: 'aaa'

                    });
                })
            });
        });
    });
};
