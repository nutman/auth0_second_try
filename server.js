var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('express-jwt');
var dotenv = require('dotenv');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth0_users');
var db = mongoose.connection;

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    picture: String,
    role: String
});
var Users = mongoose.model('users', userSchema);

var acl = require('acl');

acl = new acl(new acl.mongodbBackend(db, 'users'));

dotenv.load();

var Auth0 = require('auth0');

var api = new Auth0({
    domain: 'nutman.auth0.com',
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
});


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

    app.use('/app', express.static(path.join(__dirname, '/app')));

    app.use('/secured', authenticate, function (req, res) {
        console.log(req)

        if (!req.user.admin) return res.send(401);
        res.send(200);
    });

    app.use(app.router);
});

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname + '/app/index.html'));
});

app.get('/ping', function (req, res) {
    res.send(200, {text: "All good. You don't need to be authenticated to call this"});
});

app.get('/secured/ping', function (req, res) {

    api.getUser(req.user.sub, function (err, currentUser) {
        if (err) {
            return console.log(err);
        }

        Users.findOne({email: currentUser.email}).exec(function (err, user) {
            if (err) {
                return console.log(err);
            }
            if (user) {
                console.log('user exists');
                res.send(200, {text: "All good. You only get this message if you're authenticated"});
                return;
            }

            var user = new Users({
                name: currentUser.name,
                email: currentUser.email,
                picture: currentUser.picture,
                role: 'user'
            });

            user.save(function (err, user) {
                if (err) {
                    return console.log(err);
                }

                console.log('new user saved with default permissions', user)
                res.send(200, {text: "All good. You only get this message if you're authenticated"});
            })
        });
    });
});

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
    console.log('listening in http://localhost:' + port);
});
