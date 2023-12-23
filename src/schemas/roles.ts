import { z } from 'zod'

export const roleSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})

export const createRoleSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
})

export type CreateRoleSchema = z.infer<typeof createRoleSchema>

export const updateRoleSchema = z.object({
    name: z.string().optional(),
})

export type UpdateRoleSchema = z.infer<typeof updateRoleSchema>