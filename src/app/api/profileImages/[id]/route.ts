import { getProfileImage, deleteProfileImage } from "@/services/profileImage"
import { utapi } from "@/lib/utapi"
import { handleError } from "@/utils/api/errorHandler"

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const profileImage = await getProfileImage(params.id)
        if (!profileImage) {
            throw new Error("Bad request")
        }
        const fileName = profileImage.url.substring(profileImage.url.lastIndexOf('/') + 1)
        await deleteProfileImage(params.id)
        await utapi.deleteFiles(fileName)
        return Response.json({ success: true })
    } catch (error) {
        return handleError(error)
    }
}

