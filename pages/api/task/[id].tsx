import dbConnect from "../../../utils/dbConnect";

export default async (req, res) => {
	const { method } = req;
	const { id } = req.query;
	console.log(JSON.stringify(req.query, null, 4))
	// Connect to database
	const sql = dbConnect();
	console.log(`[id] opening connection`)
	const con = await sql.driver.promises.open(sql.connStr)

	if (method === "PUT") {
		try {
			const task = req.body
			console.log(JSON.stringify(task))
			const q = `update Task set task='${task.task}', completed='${task.completed ? 1 : 0}' where _id = ${id}`
			console.log(q)
			await con.promises.query(q)
			const result = await con.promises.query(`select _id, task, completed from Task where _id = ${id}`)
			res
				.status(200)
				.json({ data: result.first[0], message: "Task Updated Successfully" });
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
			console.log(error);
		}
	}

	if (method === "DELETE") {
		try {
			const q = `delete from Task where _id = ${id}`
			console.log(q)
			await con.promises.query(q)
			res.status(200).json({ message: "Task Deleted Successfully" });
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
			console.log(error);
		}
	}
	console.log(`[id] close connection`)
	await con.promises.close()
};
