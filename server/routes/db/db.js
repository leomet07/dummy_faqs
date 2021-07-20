const router = require("express").Router();
const Question = require("../../model/Question");
const verifyToken = require("../auth/verifyTokenMiddleware");

router.use(verifyToken);

// Base route
router.get("/", async (req, res) => {
	res.json({ message: "Index for db" });
});

// Create an item
router.get("/get_questions", get_questions_handler);
router.post("/get_questions", get_questions_handler);
// Create an item
router.post("/create_question", async (req, res, next) => {
	try {
		const saved_question = await create_question(req.body);
		res.json({
			question: saved_question,
			description: "Successfully created the question.",
		});
	} catch (error) {
		next(error);
	}
});

async function create_question(query) {
	let question = await Question.create(query);
	let saved_question = await question.save();
	return saved_question;
}
async function get_questions(query) {
	let questions = await Question.find(query);
	return questions;
}
async function get_questions_handler(req, res, next) {
	try {
		const questions = await get_questions(req.body || {});
		res.json({
			questions: questions,
			description: "Successfully retrieved questions.",
		});
	} catch (error) {
		next(error);
	}
}
module.exports.router = router;
