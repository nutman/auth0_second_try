var path = require('path');
var async = require('async');
var mongoose = require('mongoose');
var Users = mongoose.model('auth0_users');

var authenticate = require('../auth0/authenticate.js');
var authApi = require('../auth0/auth0.js');

module.exports = function (app, mongo_acl) {
    app.get('/authentication', authenticate, function (req, res) {
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

                    async.parallel({
                        permissions: function (cb) {
                            mongo_acl.allowedPermissions(user.user_id, ['/admin', '/ping', '/photographer'], function (err, object) {
                                cb(err, object);
                            });
                        },
                        roles: function (cb) {
                            mongo_acl.userRoles(user.user_id, function (err, object) {
                                console.log(object)
                                cb(err, object);
                            });
                        }
                    }, function (err, results) {
                        if (err) {
                            console.log(err);
                            res.send(200, {
                                text: "All good. You only get this message if you're authenticated"
                            });
                        }
                        res.send(200, {
                            text: "All good. You only get this message if you're authenticated",
                            permissions: results.permissions,
                            roles: results.roles
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

                    var role = 'user';
                    console.log('new user saved with default permissions', user);

                    if (user.email === 'juncker8888@gmail.com') {
                        role = 'admin';
                    }

                    mongo_acl.addUserRoles(user.user_id, role);

                    async.parallel({
                        permissions: function (cb) {
                            mongo_acl.whatResources(role, ['/admin', '/ping', '/photographer'], function (err, object) {
                                cb(err, object);
                            });
                        },
                        roles: function (cb) {
                            cb(err, [role]);
                        }
                    }, function (err, results) {
                        if (err) {
                            console.log(err);
                            res.send(500, {
                                text: "Some server error happened"
                            });
                        }
                        res.send(200, {
                            text: "All good. You only get this message if you're authenticated",
                            permissions: results.permissions,
                            roles: results.roles
                        });

                    });
                })
            });
        });
    });
};
