const router = require("express").Router();
const dbRouter = require("./db/db").router;
const authRouter = require("./auth/auth").router;
router.get("/", (req, res) => {
	res.json({ message: "Hello world from Dummy FAQS api." });
});
router.use("/auth", authRouter);
router.use("/db", dbRouter);
module.exports.router = router;
