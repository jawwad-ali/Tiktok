import { uuid } from 'uuidv4';
import { client } from './../../../utils/client';
import type { NextApiRequest, NextApiResponse } from "next";
import { postDetailQuery } from "../../../utils/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Fetching a single post by Id 
    if (req.method === "GET") {
        // This id is destructured from PostdetailsPage
        const { id }: any  = req.query
 
        const query = postDetailQuery(id)

        const data = await client.fetch(query)
        res.status(200).json(data[0])
    }

    // Adding Comment to Sanity
    else if (req.method === "PUT") {
        const { comment, userId } = req.body;
        const { id }: any = req.query

        const data = await client
            .patch(id)
            .setIfMissing({ comments: [] })
            .insert("after", "comments[-1]", [
                {
                    comment,
                    _key: uuid(),
                    postedBy: { _type: 'postedBy', _ref: userId }
                }
            ])
            .commit()
        res.status(200).json(data)
    }
}