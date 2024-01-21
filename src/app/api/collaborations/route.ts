import { getAllCollaborations, createCollaboration } from '@/services/collaborations'
import { createCollaborationSchema } from '@/schemas/collaborations'
import { handleError } from "@/utils/api/errorHandler"

export const GET = async (req: Request) => {
    const url = new URL(req.url)
    const queries = new URLSearchParams(url.search)
    const queryString = queries.get('query')
    const queryObject = queryString ? JSON.parse(queryString) : {}
    try {
        const collaborations = await getAllCollaborations(queryObject)
        return Response.json({ collaborations })
    } catch (error) {
        return handleError(error)
    }
}

export const POST = async (req: Request) => {
    const body = await req.json()
    try {
        const validatedBody = createCollaborationSchema.parse(body)
        await createCollaboration(validatedBody)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}