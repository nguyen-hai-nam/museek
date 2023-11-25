import { ZodError } from "zod"

export const handleError = (error: any) => {
    if (error instanceof ZodError) {
        return Response.json({ message: 'error', error }, { status: 400 })
    }
    return Response.json({ message: 'error', error }, { status: 500 })
}