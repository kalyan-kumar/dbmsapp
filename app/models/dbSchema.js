console.log("Initializing schema");
// var mongoose 		= require('mongoose');
// var Schema = mongoose.Schema;
var studentSchema = new Schema({
	firstname: String,
	lastname: String,
	roll: String,
	mail: String,
	password: String,
	dob: Date
});
studentSchema.methods.addStudent = function(){
	return this.model('')
}
var Student = mongoose.model('Student', studentSchema);

var courseSchema = new Schema({
	name: String,
	cid: Number,
	start: Date,
	end: Date
});
var Course = mongoose.model('Course', courseSchema);

module.exports = {
	Student: Student,
	Course: Course
};