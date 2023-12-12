import { getChat, updateChat, deleteChat } from "@/services/chats"
import { updateChatSchema } from "@/schemas/chats"
import { handleError } from "@/utils/api/errorHandler"

export const GET = async (req: Request, { params }: { params: { id: string} }) => {
    try {
        const chat = await getChat(params.id)
        return Response.json({ chat })
    } catch (error) {
        return handleError(error)
    }
}

export const PUT = async (req: Request, { params }: { params: { id: string} }) => {
    const body = await req.json()
    try {
        const validatedBody = updateChatSchema.parse(body)
        await updateChat(params.id, validatedBody)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}

export const DELETE = async (req: Request, { params }: { params: { id: string} }) => {
    try {
        await deleteChat(params.id)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}

