import {NextApiRequest, NextApiResponse} from "next"
import {TaskVerbs} from "./TaskVerbs"
const verbs = new TaskVerbs()
export class Controller {
    public static async dispatch(req: NextApiRequest, res: NextApiResponse) {
        const {method} = req;
        switch (method) {
            case 'GET': {
                verbs.GET(req).then(tasks => {
                    res
                        .status(200)
                        .json({data: tasks});
                }).catch(e => {
                    res
                        .status(500)
                        .json({message: "Internal Server Error " + e.message});
                })
                break
            }

            case 'POST': {
                verbs.POST(req).then(added => {
                    res
                        .status(201)
                        .json({data: added, message: "Task added successfully"});
                }).catch(e => {
                    res
                        .status(500)
                        .json({message: "Internal Server Error " + e.message});
                })
                break
            }

            case 'DELETE': {
                verbs.DELETE(req).then(added => {
                    res
                        .status(200)
                        .json({data: added, message: "Task Deleted Successfully"});
                }).catch(e => {
                    res
                        .status(500)
                        .json({message: "Internal Server Error " + e.message});
                })
                break
            }

            case 'PUT': {
                verbs.PUT(req).then(added => {
                    res
                        .status(200)
                        .json({data: added, message: "Task Updated Successfully"});
                }).catch(e => {
                    res
                        .status(500)
                        .json({message: "Internal Server Error " + e.message});
                })
            }
        }
    }
}