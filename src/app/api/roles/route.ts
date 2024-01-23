import { getRoles, createRole } from '@/services/roles'
import { createRoleSchema } from '@/schemas/roles'
import { handleError } from "@/utils/api/errorHandler"

export const GET = async (req: Request) => {
    const url = new URL(req.url)
    const queries = new URLSearchParams(url.search)
    const queryString = queries.get('query')
    const queryObject = queryString ? JSON.parse(queryString) : {}
    try {
        const roles = await getRoles(queryObject)
        return Response.json({ roles })
    } catch (error) {
        return handleError(error)
    }
}

export const POST = async (req: Request) => {
    const body = await req.json()
    try {
        const validatedBody = createRoleSchema.parse(body)
        await createRole(validatedBody)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}