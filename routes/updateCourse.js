exports.makeChange = function(req, res, next) {
	console.log("Updating course");
	switch(req.body.type) {
		case 1:
			modules.Course.findOneAndUpdate({'name':req.body.name}, {'content': req.body.content}, function(err, docs){
				if (err) return handleError(err);
				if (docs.length == 0) {
					res.send("No course exists with this name");
				} else if(docs.length > 1) {
					console.log("You fucked up again. Seriously Kalyan? -_-");
				} else {
					res.send(req.body.content);
				}
			});
			break;
		case 2:
			modules.Course.findOneAndUpdate({'syl':req.body.name}, {'content': req.body.syllabus}, function(err, docs){
				if (err) return handleError(err);
				if (docs.length == 0) {
					res.send("No course exists with this name");
				} else if(docs.length > 1) {
					console.log("You fucked up again. Seriously Kalyan? -_-");
				} else {
					res.send(req.body.content);
				}
			});
			break;
		case 3:
			modules.Course.findOneAndUpdate({'prereq':req.body.name}, {'content': req.body.prereq}, function(err, docs){
				if (err) return handleError(err);
				if (docs.length == 0) {
					res.send("No course exists with this name");
				} else if(docs.length > 1) {
					console.log("You fucked up again. Seriously Kalyan? -_-");
				} else {
					res.send(req.body.content);
				}
			});
			break;
		case 4:
			modules.Course.findOneAndUpdate({'fees':req.body.name}, {'content': req.body.fees}, function(err, docs){
				if (err) return handleError(err);
				if (docs.length == 0) {
					res.send("No course exists with this name");
				} else if(docs.length > 1) {
					console.log("You fucked up again. Seriously Kalyan? -_-");
				} else {
					res.send(req.body.content);
				}
			});
			break;
	}
};

exports.addCour = function (req, res, next) {
	console.log("Creating a course");
	console.log(req.body);
	modules.Course.find({'name':req.body.name}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			// console.log(req.body);
			var instance = new modules.Course();
			instance.name = req.body.name;
			instance.prof = req.body.ID;

			console.log(instance);

			instance.save(function(err){
				if (err) return handleError(err);
				modules.Instructor.findOneAndUpdate({'_id':req.body.ID}, {$push:{"courses":instance._id}}, function(err, model){
					console.log(instance._id);
					console.log("Updated");
					console.log(model);
				});
			});
			res.send("Now add the details -_-");
		} else {
			res.send("failed");
		}
	});
};

exports.addassessment = function (req, res, next)
{
	// console.log(req.body);
	console.log("yahan");
	var instance=new modules.Assessment();
	for (var i = 0;i<req.body.assessments.length ; i++) {
		var ques= new modules.Question();
		ques=req.body.assessments[i];
		instance.questions.push(ques);
		console.log(ques);
		console.log("----------------------------");

	};
	console.log(instance)
	// console.log(req.body.assessments);
	modules.Course.findOneAndUpdate({'name':req.body.name}, {$push:{"assessments":instance}}, function(err, model)
	{
		if(err)
		{
			console.log("why god why?");
			return handleError(err);
		} 
		console.log("adding it ");
		res.send("success");
	});
	// instance.index=docs.assessments.length;
	
}

exports.noticecourse=function(req,res,next)
{	
	var instance={};
	modules.Course.find({'_id':req.body.ID},function(err,docs){
		if (err) return handleError(err);
		else
		{
			instance.assessmentlength=docs[0].assessments.length;
			instance.name=docs[0].name;
			console.log(docs);

			res.json(instance);
		}

exports.noticecourse=function(req,res,next)
{
	var instance = {};
	modules.Course.find({'_id':req.body.ID},function(err,docs){
		if (err) return handleError(err);
		else
		{
			console.log(docs);
			instance.assessmentlength=docs[0].assessments.length;
			instance.name=docs[0].name;
			console.log(docs);


	});
};
exports.remcour=function(req,res,next)
{	
	// var instance={};
	modules.Course.findOne({'_id':req.body.ID},function(err,docs){
		if (err) return handleError(err);
		else
		{
			
			modules.Course.remove(docs);
			modules.Course.save(callback(err));
			res.send("removed");

		}


	});
};


exports.sendmail=function(req, res) {
  var data = {
    from: req.body.name + '<' + req.body.sendermail + '>',
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.text
  };

  mailgun.messages().send(data)
    .then(respondWithResult(res))
    .catch(handleError(res));
}
exports.addassignment=function(req, res, next)
{
	modules.Course.findOneAndUpdate({'_id':req.body.ID}, {$push:{"assignments":req.body.assignment}}, function(err, model)
	{
		if(err)
		{
			console.log("why god why?");
			return handleError(err);
		} 
		console.log("adding it ");
		res.send("success");
	});	
}


exports.tagCour = function (req, res, next) {
	console.log("Tagging Course");
	var instr = {};
	var cour = {};
	modules.Instructor.find({'mail':req.body.email}, function(err, docs){
		if (err) return handleError(err);
		if(docs.length == 0) {
			res.send("failed");
			console.log("No such professor");
		} else if (docs.length > 1){
			res.send("failed");
			console.log("You fucked up again. Seriously Kalyan? -_-");
		} else {
			instr = docs[0];
			console.log(instr);
			modules.Course.find({'name':req.body.name}, function(err, docs){
				if (err) return handleError(err);
				if(docs.length == 0) {
					res.send("failed");
					console.log("No such course");
				} else if (docs.length > 1){
					res.send("failed");
					console.log("You fucked up again. Seriously Kalyan? -_-");
				} else {		
					cour = docs[0];
					console.log(cour);
					var instance = {'teacher':instr, 'course': cour};
					res.json(instance);
				}
			});
		}
	});
}
