import { z } from 'zod'

export type User = {
    name: string
    email: string
    phoneNumber?: string
    gender?: string
    birthDate?: string
    location?: string
    bio?: string
    roles?: any[]
}

export const createUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    gender: z.string().optional(),
    birthDate: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().optional()
})

export const updateUserSchema = z.object({
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    password: z.string().min(8).optional(),
    gender: z.string().optional(),
    birthDate: z.date().optional(),
    location: z.string().optional(),
    bio: z.string().optional()
}).strict()