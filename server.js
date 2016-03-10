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
multer			= require('multer');

// routes ==================================================
var signup		= require('./routes/signup.js');
var login		= require('./routes/login.js');
var indiv		= require('./routes/indiv.js');
var updcour		= require('./routes/updateCourse.js');
var roots		= require('./routes/root.js');
var submit		= require('./routes/submit.js');

// configuration ===========================================
var port = process.env.PORT || 8080; 
var AES = require("crypto-js/aes");
//var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
 
db.on('error', function (err) {
	console.log('Error connecting to mongo server', err);
});
db.once('open', function () {
	console.log('Connected to mongo server');
});
var mailgun = require('mailgun-js')({
  apiKey: "a18379a3156e7e111ed6458409ffbb46",
  domain: "sandbox8ff9ab0b589f41269897c09d8f728835.mailgun.org",
  proxy: "http://10.3.100.207:8080"
});

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	filename: function(req, file, cb) {
		var datetimestamp = Date.now();
		cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
	}
});
var upload = multer({storage: storage}).single('file');

app.use(express.static("./public"));
app.use(bodyParser.json());

app.get('/show', function(req, res, next){
	modules.Student.find({}, function(err, docs){
		var i;
		for(i=0;i<docs.length;i++){
			console.log(docs[i]);
		}
	});
	modules.Instructor.find({}, function(err, docs){
		var i;
		for(i=0;i<docs.length;i++){
			console.log(docs[i]);
		}
	});
	modules.Admin.find({}, function(err, docs){
		var i;
		for(i=0;i<docs.length;i++){
			console.log(docs[i]);
		}
	});
	modules.Course.find({}, function(err, docs){
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
	modules.Instructor.find({}, function(err, docs){
		var i;
		for(i=0;i<docs.length;i++){
			docs[i].remove(function (err) {
    		});
		}
	});
	modules.Admin.find({}, function(err, docs){
		var i;
		for(i=0;i<docs.length;i++){
			docs[i].remove(function (err) {
    		});
		}
	});
	modules.Course.find({}, function(err, docs){
		var i;
		for(i=0;i<docs.length;i++){
			docs[i].remove(function (err) {
    		});
		}
	});
	modules.Submission.find({}, function(err, docs){
		var i;
		for(i=0;i<docs.length;i++){
			docs[i].remove(function (err) {
    		});
		}
	});
	modules.Assignment.find({}, function(err, docs){
		var i;
		for(i=0;i<docs.length;i++){
			docs[i].remove(function (err) {
    		});
		}
	});
	
	res.send('Maar hi diya :D');
});

app.get('/clearcourse', function(req, res, next){
	modules.Course.find({}, function(err, docs){
		var i;
		for(i=0;i<docs.length;i++){
			docs[i].remove(function (err) {
    		});
		}
	});
	res.send('all courses are removed');
});

app.get('/dummy', function(req, res, next){
	var instance = new modules.Instructor();
	var d = new Date();
	var now = d.getTime();
	instance.firstname = "GuruDev";
	instance.lastname = "Babaji";
	instance.mail = "gurudev@babaji.com";
	instance.dob = now;
	instance.password = "whatmightitbe";
	instance.status = true;
	instance.save(function(err){
		if (err) return handleError(err);
		res.send('Mei tho wo kar diya');
	});
});

app.get('/dummyadmin', function(req, res, next){
	var instance = new modules.Admin();
	var d = new Date();
	var now = d.getTime();
	instance.firstname = "Nitesh";
	instance.lastname = "Sekhar";
	instance.mail = "nit@gmail.com";
	// instance.dob = now;
	instance.password = "1234";
	// instance.status = true;
	instance.save(function(err){
		if (err) return handleError(err);
		console.log(instance);
		res.send('Mei tho wo kar diya');
	});
});

app.post('/signup', signup.register);
app.post('/login', login.checkauth);
app.post('/stin', login.loadSData);
app.post('/sstin', login.loadSsData);
app.post('/tein', login.loadTData);
app.post('/admin', login.loadAData);
app.get('/admins', login.approveList);
app.post('/files', login.acceptit);
app.post('/adaccept', login.acceptit);
app.post('/noticecourse',updcour.noticecourse)
app.post('/adreject', login.rejectit);
app.post('/assessment', updcour.addassessment);
app.post('/getassessment', indiv.getassessment);
app.post('/assignment', updcour.addassignment);
app.post('/remcour', updcour.remcour);

app.post('/profile', login.loadData);
app.post('/regcour', indiv.regCour);
app.post('/viewcour', indiv.viewCour);
app.post('/makecour', indiv.makeCour);
app.post('/updcour', updcour.makeChange);
app.post('/noticecourse',updcour.noticecourse)
app.post('/dummyadd', updcour.addCour);
app.post('/getteachcour', updcour.tagCour);
app.post('/courname', login.courseName);
app.post('/courdate', login.courseDate);

app.post('/files', submit.savefile);
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