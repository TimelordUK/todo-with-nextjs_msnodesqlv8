import {NextApiRequest, NextApiResponse} from "next"
import {TaskVerbs} from "./TaskVerbs"
const verbs = new TaskVerbs()
type Action = () => Promise<any>
type ToJSON = (data: any) => any

export class Controller {
    public static async dispatch(req: NextApiRequest, res: NextApiResponse) {
        const {method} = req;
        switch (method) {
            case 'GET': {
                return Controller.execute(res, () => verbs.GET(req),
                        tasks => { return { data: tasks } }, 200)
            }

            case 'POST': {
                return Controller.execute(res, () => verbs.POST(req),
                    added => { return { data: added, message: "Task Added successfully" } }, 201)
            }

            case 'DELETE': {
                return Controller.execute(res, () => verbs.DELETE(req),
                    deleted => { return { data: deleted, message: "Task Deleted successfully" } }, 200)
            }

            case 'PUT': {
                return Controller.execute(res, () => verbs.PUT(req),
                    updated => { return { data: updated, message: "Task Updated successfully" } }, 200)
            }
        }
    }

    private static async execute(res: NextApiResponse, action: Action, toJson: ToJSON, status: number) {
        return action()
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