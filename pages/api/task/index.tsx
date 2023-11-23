import dbConnect from "../../../utils/dbConnect";
import {Task} from "../../../models/Task";
import { Connection, ConnectionPromises } from "msnodesqlv8/types";

export default async (req, res) => {
	const { method } = req;
	// Connect to database
	const sql = dbConnect()
	console.log(`[index] opening connection`)
	const con: Connection = await sql.driver.promises.open(sql.connStr)
	const promises: ConnectionPromises = con.promises
	// Create task
	switch (method) {
		case "POST":
			try {
				await promises.beginTransaction()
				const q1 = `insert into Task (task, completed) values ('${req.body.task}', 0)`
				console.log(q1)
				await promises.query(q1)
				const q2 = 'select max(_id) as id from Task'
				console.log(q2)
				const queryRes = await promises.query(q2)
				const lastId = queryRes.first[0].id
				const q3 = `select _id, task, completed from Task where _id = ${lastId}`
				console.log(q3)
				const fetched = await promises.query(q3)
				const added = fetched.first[0] as Task
				await promises.commit()
				res
					.status(201)
					.json({data: added, message: "Task added successfully"});
			} catch (error) {
				res.status(500).json({message: "Internal Server Error"});
				console.log(error);
			}
			break;

		case "GET": {
			try {
				const sqlQuery = 'select _id, task, completed from Task'
				console.log(sqlQuery)
				const q = await promises.query(sqlQuery);
				const tasks: Task[] = q.first
				console.log(tasks)
				res.status(200).json({ data: tasks });
			} catch (error) {
				res.status(500).json({ message: "Internal Server Error" });
				console.log(error);
			}
		}
		break
	}

	console.log(`[index] closing connection`)
	await con.promises.close()
};
