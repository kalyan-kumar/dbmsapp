console.log("Initializing schema");

var studentSchema = new Schema({
	firstname: String,
	lastname: String,
	mail: String,
	password: String,
	dob: Date,
	courses: [{type:ObjectId, ref:'Course'}],
	submissions: [{type:ObjectId, ref:'Submission'}]
});
var Student = mongoose.model('Student', studentSchema);

var instructorSchema = new Schema({
	firstname: {type:String, required:true},
	lastname: {type:String, required:true},
	mail: {type:String, required:true},
	password: {type:String, required:true},
	dob: {type:Date, required:true},
	courses: [{type:ObjectId, ref:'Course'}]
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

var courseSchema = new Schema({
	name: String,
	start: Date,
	end: Date,
	instr: {type:ObjectId, ref:'Instructor'},
	content: String,
	syl: String,
	prereq: [{type:ObjectId, ref:'Course'}],
	lectures: [{id:Number, start:Date}],
	assignments: [{type:ObjectId, ref:'Assignment'}],
	fees: Number,
	Notice: String,
	enrollist: [{type:ObjectId, ref:'Student'}]
});
var Course = mongoose.model('Course', courseSchema);

module.exports = {
	Student: Student,
	Instructor: Instructor,
	Admin: Admin,
	Course: Course
};