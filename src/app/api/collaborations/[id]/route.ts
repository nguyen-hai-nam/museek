import { getCollaboration, updateCollaboration, deleteCollaboration } from "@/services/collaborations"
import { updateCollaborationSchema } from "@/schemas/collaborations"
import { handleError } from "@/utils/api/errorHandler"

export const GET = async (req: Request, { params }: { params: { id: string} }) => {
    try {
        const user = await getCollaboration(params.id)
        return Response.json({ user })
    } catch (error) {
        return handleError(error)
    }
}

export const PUT = async (req: Request, { params }: { params: { id: string} }) => {
    const body = await req.json()
    try {
        const validatedBody = updateCollaborationSchema.parse(body)
        await updateCollaboration(params.id, validatedBody)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}

export const DELETE = async (req: Request, { params }: { params: { id: string} }) => {
    try {
        await deleteCollaboration(params.id)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}

