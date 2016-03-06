console.log("Initializing schema");

var studentSchema = new Schema({
	firstname: String,
	lastname: String,
	mail: String,
	password: String,
	dob: Date,
	courses: [courseSchema],//[{type:ObjectId, ref:'Course'}],
	submissions: [submissionSchema]
});
var Student = mongoose.model('Student', studentSchema);

var instructorSchema = new Schema({
	firstname: {type:String, required:true},
	lastname: {type:String, required:true},
	mail: {type:String, required:true},
	password: {type:String, required:true},
	dob: {type:Date, required:true},
	status: Boolean,
	courses: [courseSchema]
});
var Instructor = mongoose.model('Instructor', instructorSchema);

var adminSchema = new Schema({
	firstname: {type:String, required:true},
	lastname: {type:String, required:true},
	mail: {type:String, required:true},
	password: {type:String, required:true}
});
var Admin = mongoose.model('Admin', adminSchema);

var submissionSchema = new Schema({
	content: String,
	asstitle: String,
	ofcour: String,
	ahas: String,
	maxtime: Date,
	subtime: Date
});
var Submission = mongoose.model('Submission', submissionSchema);

var assignmentSchema = new Schema({
	title: String,
	cname: String,
	index: Number,
	ahas: String,
	float: Date,
	deadline: Date,
	statement: String
});
var Assignment = mongoose.model('Assignment', assignmentSchema);
var questionSchema = new Schema({
	question: String,
	optionA: String,
	optionB: String,
	optionC: String,
	optionD: String,
	key: Number 
});
var Question=mongoose.model('Question',questionSchema);
var assessmentSchema = new Schema({
	index: Number,
	questions :[questionSchema]
	
});
var Assessment=mongoose.model("Assessment",assessmentSchema);
var courseSchema = new Schema({
	name: String,
	start: Date,
	end: Date,
	prof: String,
	content: String,
	syl: String,
	prereq: String,
	lectures: [{id:Number, start:Date}],
	assignments: [assignmentSchema],
	assessments: [assessmentSchema],
	fees: Number,
	Notice: String,
	enrollist: [{type:ObjectId, ref:'Student'}]
});
var Course = mongoose.model('Course', courseSchema);

module.exports = {
	Student: Student,
	Instructor: Instructor,
	Admin: Admin,
	Course: Course,
	Assignment: Assignment,
	Submission: Submission,
	Assessment:Assessment
};