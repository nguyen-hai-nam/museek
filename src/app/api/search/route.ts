import { searchUsers } from '@/services/search'
import { handleError } from "@/utils/api/errorHandler"

export const GET = async (req: Request) => {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search)
    const searchString = params.get('query')
    const page = params.get('page')

    let pageNumber = 1
    if (page) {
        pageNumber = parseInt(page)
    }

    try {
        const result = await searchUsers(searchString, pageNumber)
        return Response.json(result)
    } catch (error) {
        return handleError(error)
    }
}