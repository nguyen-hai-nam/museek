import { countCollaborations } from '@/services/collaborations'
import { handleError } from '@/utils/api/errorHandler'

export const GET = async () => {
    try {
        const count = await countCollaborations()
        return Response.json({ count })
    } catch (error) {
        return handleError(error)
    }
}