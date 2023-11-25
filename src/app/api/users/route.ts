import bcrypt from 'bcrypt'

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
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10
    try {
        const validatedBody = createUserSchema.parse(body)
        const hashedPassword = await bcrypt.hash(validatedBody.password, saltRounds)
        validatedBody.password = hashedPassword
        await createUser(validatedBody)
        return Response.json({ message: 'success' })
    } catch (error) {
        return handleError(error)
    }
}