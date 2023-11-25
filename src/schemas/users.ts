import { z } from 'zod'

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    password: z.string().min(8),
    gender: z.string().optional(),
    birthdate: z.date().optional(),
    location: z.string().optional(),
    bio: z.string().optional()
})

export const updateUserSchema = z.object({
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    password: z.string().min(8).optional(),
    gender: z.string().optional(),
    birthdate: z.date().optional(),
    location: z.string().optional(),
    bio: z.string().optional()
}).strict()