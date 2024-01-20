import { z } from 'zod'

export const profileImageSchema = z.object({
    id: z.string(),
    userId: z.string(),
    url: z.string(),
    description: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const createProfileImageSchema = z.object({
    userId: z.string(),
    url: z.string(),
    description: z.string().optional(),
})

export type CreateProfileImageSchema = z.infer<typeof createProfileImageSchema>