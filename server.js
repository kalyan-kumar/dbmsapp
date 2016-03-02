// server.js

// modules =================================================
express        	= require('express');
mongoose 		= require('mongoose');
Schema 			= mongoose.Schema;
ObjectId		= Schema.ObjectId;
app            	= express();
bodyParser     	= require('body-parser');
methodOverride 	= require('method-override');
modules 		= require('./models/dbSchema.js');

// routes ==================================================
var signup		= require('./routes/signup.js');
var login		= require('./routes/login.js');
var indiv		= require('./routes/indiv.js');
var updcour		= require('./routes/updateCourse.js');

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

app.use(express.static("./public"));
app.use(bodyParser.json());

app.get('/show', function(req, res, next){
	modules.Student.find({}, function(err, docs){
		var i;
		for(i=0;i<docs.length;i++){
			console.log(docs[i]);
		}
	});
	res.send('Dekhle :P');
});

app.get('/clear', function(req, res, next){
	modules.Student.find({}, function(err, docs){
		var i;
		for(i=0;i<docs.length;i++){
			docs[i].remove(function (err) {
    		});
		}
	});
	res.send('Cleared :D');
});

app.post('/signup', signup.register);
app.post('/login', login.checkauth);
app.post('/stin', login.loadSData);
app.post('/tein', login.loadTData);
app.post('/regcour', indiv.regCour);
app.post('/viewcour', indiv.viewCour);
app.post('/makecour', indiv.makeCour);

/*
// config files

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
*/

var server = app.listen(port, function(){
	var host = server.address().address
 	var port = server.address().port
  	console.log("DBMS app listening at http://%s:%s", host, port)
});               

// expose app           
exports = module.exports = app;