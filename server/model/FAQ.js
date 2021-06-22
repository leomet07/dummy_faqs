const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
	question: {
		required: true,
		type: String,
	},
	answer: {
		required: true,
		type: String,
	},
});

const faqModelfordb = mongoose.model("FAQ", faqSchema);

module.exports = faqModelfordb;
