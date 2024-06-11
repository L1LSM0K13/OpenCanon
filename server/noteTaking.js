async function takeNote(app, pool) {
	app.post("/users/bible", async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		let { noteText } = req.body;

		const result = await pool.query(
			`INSERT INTO user_notes (text) VALUES ($1) RETURNING id, text`,
			[noteText]
		);
		console.table([result.rows]);

		if (isAuth) {
			await defaultRender(req, res, true, "../public/views/scripture", {});
		} else {
			await defaultRender(req, res, false, "../public/views/scripture", {});
		}
	});
}

module.exports = { takeNote };
