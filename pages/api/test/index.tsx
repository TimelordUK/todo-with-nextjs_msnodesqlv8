import {NextApiRequest, NextApiResponse} from "next"
import {TestVerbs} from "./TestVerbs"

const router = new TestVerbs()

const Controller = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    switch (method) {
        case 'GET': {
            const data = await router.GET(req)
            res
                .status(201)
                .json(data);
            break
        }
    }
}

export default Controller
