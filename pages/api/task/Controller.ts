import {NextApiRequest, NextApiResponse} from "next"
import {TaskVerbs} from "./TaskVerbs"
const verbs = new TaskVerbs()
type Action = (_: NextApiRequest) => Promise<any>
type ToJSON = (data: any) => any

export class Controller {
    public static async dispatch(req: NextApiRequest, res: NextApiResponse) {
        const {method} = req;
        switch (method) {
            case 'GET': {
                return Controller.execute(req, res, r => verbs.GET(r),
                        tasks => { return { data: tasks } }, 200)
            }

            case 'POST': {
                return Controller.execute(req, res, r => verbs.POST(r),
                    added => { return { data: added, message: "Task Added successfully" } }, 201)
            }

            case 'DELETE': {
                return Controller.execute(req, res, r => verbs.DELETE(r),
                    deleted => { return { data: deleted, message: "Task Deleted successfully" } }, 200)
            }

            case 'PUT': {
                return Controller.execute(req, res, r => verbs.PUT(r),
                    updated => { return { data: updated, message: "Task Updated successfully" } }, 200)
            }
        }
    }

    private static async execute(req: NextApiRequest, res: NextApiResponse, action: Action, toJson: ToJSON, status: number) {
        return action(req)
            .then(data => {
                res
                    .status(status)
                    .json(toJson(data));
            }).catch(e => {
                res
                    .status(500)
                    .json({
                        message: "Internal Server Error " + e.message
                    });
            })
    }
}