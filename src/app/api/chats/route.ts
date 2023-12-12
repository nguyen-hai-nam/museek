import { getAllChats, createChat } from '@/services/chats'
import { createChatSchema } from '@/schemas/chats'
import { handleError } from "@/utils/api/errorHandler"

export const GET = async () => {
    try {
        const chats = await getAllChats()
        return Response.json({ chats })
    } catch (error) {
        return handleError(error)
    }
}

export const POST = async (req: Request) => {
    const body = await req.json()
    try {
        const validatedBody = createChatSchema.parse(body)
        await createChat(validatedBody)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}