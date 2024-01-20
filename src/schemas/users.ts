import { z } from 'zod'
import { roleSchema } from './roles'

export type User = {
    id: string
    avatarUrl?: string
    name: string
    email: string
    phoneNumber?: string
    gender?: string
    birthDate?: string
    location?: string
    bio?: string
    roles?: any[]
    profileImages?: any[]
}

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    gender: z.string().optional(),
    birthDate: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email(),
    location: z.string().optional(),
    bio: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const createUserSchema = z.object({
    id: z.string(),
    avatarUrl: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    gender: z.string().optional(),
    birthDate: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().optional()
})

export const updateUserSchema = z.object({
    avatarUrl: z.string().optional(),
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    password: z.string().min(8).optional(),
    gender: z.string().optional(),
    birthDate: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().optional(),
    roles: z.array(roleSchema).optional()
}).strict()