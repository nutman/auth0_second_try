var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('express-jwt');
var dotenv = require('dotenv');
var path = require('path');

dotenv.load();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});


app.configure(function () {
  app.use(cors());

 // Request body parsing middleware should be above methodOverride
  app.use(express.bodyParser());
  app.use(express.urlencoded());
  app.use(express.json());

  app.use('/app',  express.static(path.join(__dirname, '/app')));

  app.use('/secured', authenticate, function(req, res) {
    console.log(req)

    if (!req.user.admin) return res.send(401);
    res.send(200);
  });

  app.use(app.router);
});

app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname + '/app/index.html'));
});

app.get('/ping', function(req, res) {
  res.send(200, {text: "All good. You don't need to be authenticated to call this"});
});

app.get('/secured/ping', function(req, res) {
  res.send(200, {text: "All good. You only get this message if you're authenticated"});
})

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
