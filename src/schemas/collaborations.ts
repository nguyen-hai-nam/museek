import { z } from 'zod'

export const createCollaborationSchema = z.object({
    userId1: z.string(),
    userId2: z.string(),
    invitationMessage: z.string().optional()
}).strict()

export const updateCollaborationSchema = z.object({
    status: z.string().optional(),
    invitationMessage: z.string().optional()
}).strict()