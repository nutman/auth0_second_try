var fs    = require('fs'),
    nconf = require('nconf');

module.exports = nconf.argv()
    .env()
    .file({ file: 'conf/config.json' });