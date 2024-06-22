async function highlightVerse(app, pool) {
	app.post("/users/bible", async (req, res) => {
		const user_id = req.user.id;
		let { userHighlights, verse_id, fathers_id } = req.body;

		if (userHighlights) {
			try {
				const results = await pool.query(
					`INSERT INTO user_highlights (user_id, verse_id, fathers_id, highlight_color) VALUES ($1, $2, $3, $4) RETURNING id, user_id, verse_id, fathers_id, highlight_color`,
					[user_id, verse_id, fathers_id, userHighlights]
				);

				console.table(results.rows);b
				res.redirect("/users/bible");
			} catch (err) {
				console.log(err, "Server Error");
				res.status(500).send("Could not send request");
			}
		}
	});
}

module.exports = { highlightVerse };