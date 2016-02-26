var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var studentSchema = new Schema({
	name: {
		type: String
	},
	roll: {

	},
	mail: {
		type: String
	}
});
studentSchema.methods.addStudent = function(){
	return this.model('')
}
var Student = mongoose.model('Student', studentSchema);

var courseSchema = new Schema({
	name: {
		type: String
	},
	cid: {
		type: Number
	}
});
var Course = mongoose.model('Course', courseSchema);

module.exports = {
	Student: Student,
	Course: Course
}