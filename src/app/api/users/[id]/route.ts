import { updateUserSchema } from "@/schemas/users"
import { getUser, updateUser, deleteUser } from "@/services/users"
import { handleError } from "@/utils/api/errorHandler"

export const GET = async (req: Request, { params }: { params: { id: string} }) => {
    const url = new URL(req.url)
    const queries = new URLSearchParams(url.search)
    const queryString = queries.get('query')
    const queryObject = queryString ? JSON.parse(queryString) : {}
    queryObject.where = { id: params.id }
    try {
        const user = await getUser(queryObject)
        return Response.json({ user })
    } catch (error) {
        return handleError(error)
    }
}

export const PUT = async (req: Request, { params }: { params: { id: string} }) => {
    const body = await req.json()
    try {
        const validatedBody = updateUserSchema.parse(body)
        await updateUser(params.id, validatedBody)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}

export const DELETE = async (req: Request, { params }: { params: { id: string} }) => {
    try {
        await deleteUser(params.id)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}

