var mongoose = require('mongoose'),
	db = mongoose.connection,
	Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');

var studentSchema = new Schema({
	name: {
		type: String
	},
	roll: {
		
	}
});