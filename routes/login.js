exports.checkauth = function(req, res, next) {
	console.log("Logging In");
	modules.Student.find({'mail':req.body.mail}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			modules.Instructor.find({'mail':req.body.mail}, function(err, them){
				if (err) return handleError(err);
				if (them.length == 0) {
					modules.Admin.find({'mail':req.body.mail},function(err,adm){
						if(err) return handleError(err);
						if(adm.length!=0){
							if(adm[0].password.localeCompare(req.body.password)==0){
								res.send("admin");
							}
						}
						else
						{
							console.log("some error");
						}


					});

				} else if(them.length > 1) {
					console.log("You fucked up while registering users. Seriously Kalyan? -_-");
				} else {
					if(them[0].password.localeCompare(req.body.password)==0) {
						console.log("Passwords matched");
						if(them[0].status)
							res.send("teacher");
						else
							res.send("notapproved");
					} else {
						console.log("Passwords didnt match");
						res.send("failed");
					}
				}
			});
		} else if(docs.length > 1) {
			console.log("You fucked up while registering users. Seriously Kalyan? -_-");
		} else {
			if(docs[0].password.localeCompare(req.body.password)==0) {
				console.log("Passwords matched");
				res.send("student");
			} else {
				console.log("Passwords didnt match");
				res.send("failure");
			}
		}
	});
};
exports.approveList=function(req,res,next){
	console.log("here");
	modules.Instructor.find({'status':"false"},function(err,docs){
		if (err) return handleError(err);
		else
		{
			console.log(docs);
			res.json(docs);
		}


	})
};
exports.acceptit=function(req,res,next){
	console.log("here");
	modules.Instructor.update({'mail':req.body.email},{'status':true},function(err,docs){
		console.log(docs);
	});

	res.send("accepted");

};
exports.rejectit=function(req,res,next){
	console.log("here");
	modules.Instructor.remove({'mail':req.body.email},function(err,docs){
		console.log(docs);
	});

	res.send("rejected");

};
exports.loadSData = function(req, res, next) {
	modules.Student.find({'mail':req.body.email}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			res.send("No account exists with this email");
		} else if(docs.length > 1) {
			console.log("You fucked up while registering users. Seriously Kalyan? -_-");
		} else {
			modules.Course.find({'name':req.body.course}, function(err, them){
				if (err) return handleError(err);
				if (them.length == 0) {
				} else if(them.length > 1) {
					console.log("You fucked up while registering users. Seriously Kalyan? -_-");
				} else {
					var instance = {'student':docs[0], 'course':them[0]};
					console.log(instance);
					res.json(instance);
				}
			});
		}
	});
};

exports.loadSsData = function(req, res, next) {
	console.log("Getting the student data1234");
	modules.Student.find({'mail':req.body.email}, function(err, docs){
			if (err) return handleError(err);
			if (docs.length == 0) {
				res.send("failed");
			} else if(docs.length > 1) {
				console.log("You fucked up while registering users. Seriously Kalyan? -_-");
			} else {
				res.json(docs[0]);
			}
		});
};

exports.courseName = function(req, res, next) {
	var instance = {};
	modules.Course.find({'_id':req.body.ID}, function(err, docs){
		if (err) return handleError(err);
		if(docs.length == 0) {
			res.send("failed");
		} else if(docs.length > 1) {
			console.log("You fucked up while registering users. Seriously Kalyan? -_-");
		} else {
			instance.name = docs[0].name;
			modules.Instructor.find({'_id':docs[0].prof}, function(err, them){
				if (err) return handleError(err);
				if(them.length == 0)
					res.send("failed");
				else if(them.length > 1) {
					console.log("You fucked up while registering users. Seriously Kalyan? -_-");
				} else {
					instance.prof = them[0].firstname + " " + them[0].lastname;
					res.json(instance);
				}
			});
		}
	});
}

exports.courseDate = function(req, res, next) {
	var instance = [];
	modules.Course.find({'_id':req.body.ID}, function(err, docs){
		if (err) return handleError(err);
		if(docs.length == 0) {
			res.send("failed");
		} else if(docs.length > 1) {
			console.log("You fucked up while registering users. Seriously Kalyan? -_-");
		} else {
			var i, tmp = {};
			for(i=0;i<docs[0].assignments.length;i++){
				tmp.cname = docs[0].name;
				tmp.type = "Assignment";
				tmp.title = docs[0].assignments[i].title;
				tmp.when = docs[0].assignments[i].deadline;
				instance.push(tmp);
			}
			res.json(instance);
		}
	});
}

exports.loadAData = function(req, res, next) {
	console.log("Getting the student data1234");
	modules.Admin.find({'mail':req.body.email}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			res.send("No account exists with this email");
		} else if(docs.length > 1) {
			console.log("You fucked up while registering users. Seriously Kalyan? -_-");
		} else {
			res.json(docs[0]);
		}
	});
};
exports.loadData = function(req, res, next) {
	console.log("Getting the student data1234");
	modules.Student.find({'mail':req.body.email}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			modules.Instructor.find({'mail':req.body.email}, function(err, doc){
				if (err) return handleError(err);
				if (doc.length == 0) {
					modules.Admin.find({'mail':req.body.email}, function(err, ad){
						if (err) return handleError(err);
						if (ad.length == 0) {
							res.send("No account exists with this email");
						} else if(ad.length > 1) {
							console.log("You fucked up while registering users. Seriously Kalyan? -_-");
						} else {
							res.json(ad[0]);
						}
					});
				} else if(doc.length > 1) {
					console.log("You fucked up while registering users. Seriously Kalyan? -_-");
				} else {
					res.json(doc[0]);
				}
			});
		} else if(docs.length > 1) {
			console.log("You fucked up while registering users. Seriously Kalyan? -_-");
		} else {
			res.json(docs[0]);
		}
	});
};

exports.loadTData = function(req, res, next) {
	modules.Instructor
		.find({'mail':req.body.email})
		.populate('courses')
		.exec(function(err, docs){
			if (err) return handleError(err);
			if (docs.length == 0) {
				res.send("No account exists with this email");
			} else if(docs.length > 1) {
				console.log("You fucked up while registering users. Seriously Kalyan? -_-");
			} else {
				res.json(docs[0]);
			}
	});
};