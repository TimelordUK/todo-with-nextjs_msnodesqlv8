import dbConnect from "../../../utils/dbConnect";

export default async (req, res) => {
	const { method } = req;
	// Connect to database
	const sql = dbConnect();
	console.log(`[index] opening connection`)
	const con = await sql.driver.promises.open(sql.connStr)

	// Create task
	if (method === "POST") {
		try {
			const q1 = 'select max(id) as id from Task'
			console.log(q1)
			const queryRes = await con.promises.query(q1)
			const lastId = queryRes.first[0].id
			const newTask = {
				completed: false,
				task: req.body.task,
				_id: lastId + 1
			}
			console.log(JSON.stringify(newTask, null, 4))
			const q2 = `insert into Task (task, completed) values ('${newTask.task}', 0)`
			console.log(q2)
			await con.promises.query(q2)
			res
				.status(201)
				.json({ data: newTask, message: "Task added successfully" });
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
			console.log(error);
		}
	}

	if (method === "GET") {
		try {
			const sqlQuery = 'select * from Task'
			console.log(sqlQuery)
			const q = await con.promises.query(sqlQuery);
			q.first.map(r => r._id = r.id)
			console.log(q.first)
			res.status(200).json({ data: q.first });
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
			console.log(error);
		}
	}
	console.log(`[index] closing connection`)
	await con.promises.close()
};
