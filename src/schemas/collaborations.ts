import { z } from 'zod'

export type Collaboration = z.infer<typeof collaborationSchema>
export type CollaborationStatus = z.infer<typeof collaborationStatusSchema>

export const collaborationStatusSchema = z.enum(['WAITING', 'REJECTED', 'IN_PROGRESS', 'DONE'])

export const createCollaborationSchema = z.object({
    userId1: z.string(),
    userId2: z.string(),
    invitationMessage: z.string().optional()
}).strict()

export const updateCollaborationSchema = z.object({
    status: collaborationStatusSchema.optional(),
    invitationMessage: z.string().optional()
}).strict()

export const collaborationSchema = z.object({
    id: z.string(),
    userId1: z.string(),
    userId2: z.string(),
    status: collaborationStatusSchema,
    invitationMessage: z.union([z.string(), z.null()]),
    createdAt: z.string(),
    updatedAt: z.string(),
    user1: z.any(),
    user2: z.any()
}).strict()

export const getCollaborationsResponseSchema = z.array(collaborationSchema)