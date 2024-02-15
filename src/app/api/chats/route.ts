import { getAllChats, createChat } from '@/services/chats'
import { createChatSchema } from '@/schemas/chats'
import { handleError } from "@/utils/api/errorHandler"

export const GET = async (req: Request) => {
    const url = new URL(req.url)
    const queries = new URLSearchParams(url.search)
    const queryString = queries.get('query')
    const queryObject = queryString ? JSON.parse(queryString) : {}
    try {
        const chats = await getAllChats(queryObject)
        return Response.json({ chats })
    } catch (error) {
        return handleError(error)
    }
}

export async function POST(req: Request) {
    const body = await req.json()

    try {
        const validatedBody = createChatSchema.parse(body)
        const chat = await createChat(validatedBody)
        return Response.json({ message: 'success', chat })
    } catch (error) {
        return handleError(error)
    }
}
