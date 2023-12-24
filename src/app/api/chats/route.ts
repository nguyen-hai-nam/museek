import { getAllChats, createChat } from '@/services/chats'
import { createChatSchema } from '@/schemas/chats'
import { handleError } from "@/utils/api/errorHandler"
import { pusherServer } from '@/lib/pusher'

export const GET = async () => {
    try {
        const chats = await getAllChats()
        return Response.json({ chats })
    } catch (error) {
        return handleError(error)
    }
}

export async function POST(req: Request) {
    const body = await req.json()

    try {
        const validatedBody = createChatSchema.parse(body)
        pusherServer.trigger(body.collaborationId, 'incoming-message', body.message)
        await createChat(validatedBody)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}
