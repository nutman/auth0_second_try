var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    picture: String,
    user_id: String
});

mongoose.model('auth0_users', userSchema);