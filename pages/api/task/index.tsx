import {NextApiRequest, NextApiResponse} from "next";
import {TaskVerbs} from "./TaskVerbs";
const router = new TaskVerbs()

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	switch (method) {
		case 'GET': {
			router.GET(req).then(tasks => {
				res.status(200).json({data: tasks});
			}).catch(e => {
				res.status(500).json({message: "Internal Server Error " + e.message});
			})
			break
		}

		case 'POST': {
			router.POST(req).then(added => {
				res
					.status(201)
					.json({data: added, message: "Task added successfully"});
			}).catch(e => {
				res.status(500).json({message: "Internal Server Error " + e.message});
			})
			break
		}
	}
};
