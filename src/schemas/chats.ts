import { z } from 'zod'

export type Chat = z.infer<typeof chatSchema>

export const createChatSchema = z.object({
    collaborationId: z.string(),
    senderId: z.string(),
    receiverId: z.string(),
    message: z.string(),
}).strict()

export const updateChatSchema = z.object({
    message: z.string().optional()
}).strict()

export const chatSchema = z.object({
    id: z.string(),
    collaborationId: z.string(),
    senderId: z.string(),
    receiverId: z.string(),
    message: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    sender: z.any(),
    receiver: z.any()
}).strict()