import {Task} from "../../../models/Task";
import {Connection, ConnectionPromises} from "msnodesqlv8/types";
import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest} from "next";

export class TaskVerbs {

    private async getConnection(): Promise<ConnectionPromises> {
        const sql = dbConnect()
        console.log(`[index] opening connection`)
        const con: Connection = await sql.driver.promises.open(sql.connStr)
        return con.promises
    }

    public async GET(req: NextApiRequest): Promise<any> {
        const promises: ConnectionPromises = await this.getConnection()
        const sqlQuery = 'select _id, task, completed from Task'
        console.log(sqlQuery)
        const q = await promises.query(sqlQuery);
        const tasks: Task[] = q.first
        console.log(tasks)
        await promises.close()
        return tasks
    }

    public async POST(req: NextApiRequest): Promise<any> {
        const promises: ConnectionPromises = await this.getConnection()
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
        await promises.close()
        return added
    }
}