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
mongoose.connect('mongodb://localhost/quoting_dojo');

var UserSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3, maxlength: 10},
    quote: { type: String, required: true, minlength: 5, maxlength: 150}
},
{timestamps: true});

mongoose.model('User', UserSchema);
// var User = mongoose.model('User');

mongoose.Promise = global.Promise;

require('./server/config/routes.js')(app);

// // ============= INDEX =====================
// app.get('/', function(req, res) {   
//         res.render('index');
//     })


// // ============= POST /QUOTES METHOD ==========
// app.post('/quotes', function(req, res) {
//     console.log("POST DATA", req.body);
//     console.log(req.body.name);
//     console.log(req.body.quote);
    
//     var userInstance = new User({
//         name: req.body.name, 
//         quote: req.body.quote
//     });

//     userInstance.save(function(err) {
//         if(err) {
//             console.log('we have an error', err);
//             for(var key in err.errors){
//                 req.flash('registration', err.errors[key].message);
//             }
//             res.redirect('/');
//         } 
//         else { 
//             console.log('successfully added a user!');
//             res.redirect('/quotes');
//         }
//     })
// })


// // ============= GET /QUOTES PAGE ==============
// app.get('/quotes', function(req, res){
//     console.log('>>>> SERVER > /quotes ejs =============');
//     User.find({}, function(err, users){
//         console.log(users);
//         console.log(err);
//         if(err){
//             return res.json(err)
//         }
        
//         // console.log(users[0].name)
//         // console.log(users[0].quote);     
//         return res.render('quotes', {users: users});
//     });
// });