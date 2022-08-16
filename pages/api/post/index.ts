import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { allPostsQuery } from '../../../utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Fetching all the Posts
    if (req.method === "GET") {
        const query = allPostsQuery()

        const data = await client.fetch(query)
        res.status(200).json(data)
    } 

    // uploading post to sanity
    else if (req.method === "POST") {
        const document = req.body
        client.create(document)
        try {
            res.status(201).json("Posted")
        }
        catch (err) {
            console.error(err)
        }
    }
} 