import {NextApiRequest} from "next"

export interface Verbs {
    GET(req: NextApiRequest): Promise<any>
    POST(req: NextApiRequest): Promise<any>
    DELETE(req: NextApiRequest): Promise<any>
    PUT(req: NextApiRequest): Promise<any>
}