import {NextApiRequest, NextApiResponse} from "next";
import {TaskVerbs} from "./TaskVerbs"
const router = new TaskVerbs()
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	console.log(JSON.stringify(req.query, null, 4))

	switch (method) {
		case 'DELETE': {
			router.DELETE(req).then(added => {
				res
					.status(200)
					.json({data: added, message: "Task Deleted Successfully"});
			}).catch(e => {
				res.status(500).json({message: "Internal Server Error " + e.message});
			})
			break
		}

		case 'PUT': {
			router.PUT(req).then(added => {
				res
					.status(200)
					.json({data: added, message: "Task Updated Successfully"});
			}).catch(e => {
				res.status(500).json({message: "Internal Server Error " + e.message});
			})
		}
	}
}
