console.log("Initializing schema");

var studentSchema = new Schema({
	firstname: String,
	lastname: String,
	roll: String,
	mail: String,
	password: String,
	dob: Date
});
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