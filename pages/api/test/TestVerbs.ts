import {NextApiRequest} from "next"

export class TestVerbs {
    public async GET(req: NextApiRequest): Promise<any> {
        return {msg: 'here is a GET response!'}
    }
}