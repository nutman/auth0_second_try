var http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('./models/user.js')

mongoose.connect('mongodb://127.0.0.1:27017/auth0_users');


require('./acl/acl.js')(require('./routes'), app);

require('./server_conf.js')(app);

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('listening in http://localhost:' + port);
});
