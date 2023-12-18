import { getAllUsers, createUser } from '@/services/users'
import { createUserSchema } from '@/schemas/users'
import { handleError } from "@/utils/api/errorHandler"

export const GET = async () => {
    try {
        const users = await getAllUsers()
        return Response.json({ users })
    } catch (error) {
        return handleError(error)
    }
}

export const POST = async (req: Request) => {
    const body = await req.json()
    try {
        const validatedBody = createUserSchema.parse(body)
        await createUser(validatedBody)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}