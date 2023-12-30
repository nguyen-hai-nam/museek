import { getAllChats, createChat } from '@/services/chats'
import { createChatSchema } from '@/schemas/chats'
import { handleError } from "@/utils/api/errorHandler"

export const GET = async (req: Request) => {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search)
    const includeString = params.get('include')
    const include = includeString ? JSON.parse(includeString) : null
    const whereString = params.get('where')
    const where = whereString ? JSON.parse(whereString) : null

    try {
        const chats = await getAllChats(where, include)
        return Response.json({ chats })
    } catch (error) {
        return handleError(error)
    }
}

export async function POST(req: Request) {
    const body = await req.json()

    try {
        const validatedBody = createChatSchema.parse(body)
        await createChat(validatedBody)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}
