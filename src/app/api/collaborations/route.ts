import { getAllCollaborations, createCollaboration } from '@/services/collaborations'
import { createCollaborationSchema } from '@/schemas/collaborations'
import { handleError } from "@/utils/api/errorHandler"

export const GET = async (req: Request) => {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search)
    const includeString = params.get('include')
    const include = includeString ? JSON.parse(includeString) : null
    const whereString = params.get('where')
    const where = whereString ? JSON.parse(whereString) : null
    try {
        const collaborations = await getAllCollaborations(where, include)
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