const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
	question: {
		required: true,
		type: String,
	},
	answer: {
		required: true,
		type: String,
	},
});

const questionModelfordb = mongoose.model("question", questionSchema);

module.exports = questionModelfordb;
