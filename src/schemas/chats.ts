import { z } from 'zod'

export const createChatSchema = z.object({
    collaborationId: z.string(),
    senderId: z.string(),
    receiverId: z.string(),
    message: z.string(),
}).strict()

export const updateChatSchema = z.object({
    message: z.string().optional()
}).strict()