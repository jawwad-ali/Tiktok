import { topicPostsQuery } from './../../../utils/queries';
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { topic } = req.query

        const topicQuery = topicPostsQuery(topic)
        const topics = await client.fetch(topicQuery)
        res.status(200).json(topics)
    }
} 