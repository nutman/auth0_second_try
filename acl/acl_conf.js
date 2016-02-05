module.exports = function acl_conf(acl) {

    acl.allow([
        {
            roles: ['user'],
            allows: [
                {resources:['/ping'], permissions:['read']}
            ]
        }, {
            roles: ['photographer'],
            allows: [
                {resources:['/ping', '/photographer'], permissions:['create', 'read']}
            ]
        }, {
            roles: 'admin',
            allows: [
                {resources:['/admin', '/ping', '/photographer', '/get_users', '/set_user'], permissions:['create', 'read', 'update', 'delete']}
            ]
        }
    ]);
};