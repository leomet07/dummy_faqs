const router = require("express").Router();
const FAQ = require("../../model/FAQ");
// Base route
router.get("/", async (req, res) => {
	res.json({ message: "Index for db" });
});

// Create an item
router.get("/get_faqs", get_faqs_handler);
router.post("/get_faqs", get_faqs_handler);
// Create an item
router.post("/create_faq", async (req, res, next) => {
	try {
		const saved_faq = await create_faq(req.body);
		res.json({
			faq: saved_faq,
			description: "Successfully created the FAQ.",
		});
	} catch (error) {
		next(error);
	}
});

async function create_faq(query) {
	let faq = await FAQ.create(query);
	let saved_faq = await faq.save();
	return saved_faq;
}
async function get_faqs(query) {
	let faqs = await FAQ.find(query);
	return faqs;
}
async function get_faqs_handler(req, res, next) {
	try {
		const faqs = await get_faqs(req.body || {});
		res.json({
			faqs: faqs,
			description: "Successfully retrieved FAQs.",
		});
	} catch (error) {
		next(error);
	}
}
module.exports.router = router;
