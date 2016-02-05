module.exports = function router(app, mongo_acl) {
    require('./admin')(app, mongo_acl);
    require('./authentication')(app, mongo_acl);
    require('./get_users')(app, mongo_acl);
    require('./photographer')(app, mongo_acl);
    require('./ping')(app, mongo_acl);
    require('./secured_ping')(app, mongo_acl);
    require('./set_user')(app, mongo_acl);
};