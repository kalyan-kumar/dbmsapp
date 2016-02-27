// server.js

// modules =================================================
var express        	= require('express');
var mongoose 		= require('mongoose');
var Schema 			= mongoose.Schema;
var app            	= express();
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var modules 		= require('./app/models/dbSchema.js');
var login			= require('./app/routes/login.js');
var signup			= require('./app/routes/signup.js');

// configuration ===========================================
var port = process.env.PORT || 8080; 

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
 
db.on('error', function (err) {
	console.log('Error connecting to mongo server', err);
});
db.once('open', function () {
	console.log('Connected to mongo server');
});

app.get('', function(req, res, next){
	res.send('Hello World');
});

app.get('/signup', signup.register);

/*
// config files
var db = require('./config/db');


// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app); // configure our routes
*/

var server = app.listen(port, function(){
	var host = server.address().address
 	var port = server.address().port
  	console.log("DBMS app listening at http://%s:%s", host, port)
});               

// expose app           
exports = module.exports = app;