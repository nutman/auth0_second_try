var http = require('http');
var express = require('express');
var app = express();

require('./models/user.js')

require('./acl/acl.js')(require('./routes.js'), app);

require('./server_conf.js')(app);

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('listening in http://localhost:' + port);
});
