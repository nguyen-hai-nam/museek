import { countUsers } from '@/services/users'
import { handleError } from '@/utils/api/errorHandler'

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const params = new URLSearchParams(url.search)
        const isNew = params.get('new')
        
        if (isNew) {
            const date = new Date()
            date.setMonth(date.getMonth() - 1)
            const count = await countUsers({
                where: {
                    createdAt: {
                        gt: date
                    }
                }
            })
            return Response.json({ count })
        }

        const count = await countUsers()
        return Response.json({ count })
    } catch (error) {
        return handleError(error)
    }
}