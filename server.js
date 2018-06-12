var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const server = app.listen(5000);
console.log('listening on port: 5000');


//session
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
const flash = require('express-flash');
app.use(flash());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

var UserSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3, maxlength: 10},
    quote: { type: String, required: true, minlength: 5, maxlength: 150}
},
{timestamps: true});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

mongoose.Promise = global.Promise;