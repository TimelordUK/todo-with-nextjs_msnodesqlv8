import dbConnect from "../../../utils/dbConnect";
import {Task} from "../../../models/Task";

export default async (req, res) => {
	const { method } = req;
	// Connect to database
	const sql = dbConnect();
	console.log(`[index] opening connection`)
	const con = await sql.driver.promises.open(sql.connStr)

	// Create task
	if (method === "POST") {
		try {
			await con.promises.beginTransaction()
			const q1 = `insert into Task (task, completed) values ('${req.body.task}', 0)`
			console.log(q1)
			await con.promises.query(q1)
			const q2 = 'select max(_id) as id from Task'
			console.log(q2)
			const queryRes = await con.promises.query(q2)
			const lastId = queryRes.first[0].id
			const q3 = `select * from Task where _id = ${lastId}`
			console.log(q3)
			const fetched = await con.promises.query(q3)
			const added = fetched.first[0] as Task
			await con.promises.commit()
			res
				.status(201)
				.json({ data: added, message: "Task added successfully" });
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
			const tasks: Task[] = q.first
			console.log(tasks)
			res.status(200).json({ data: tasks });
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
			console.log(error);
		}
	}
	console.log(`[index] closing connection`)
	await con.promises.close()
};
