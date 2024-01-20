import { createProfileImageSchema } from "@/schemas/profileImage"
import { createProfileImage } from "@/services/profileImage"
import { utapi } from "@/app/api/uploadthing/core"
import { handleError } from "@/utils/api/errorHandler"

export const POST = async (req: Request) => {
    let fileKey: string | null = null
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File
        const uploadRes = await utapi.uploadFiles(file)
        if (uploadRes.error) {
            throw new Error("Fail to upload file")
        }
        fileKey = uploadRes.data.key
        const data = formData.get('data') as string
        const body = JSON.parse(data)
        body.url = uploadRes.data.url
        const validatedBody = createProfileImageSchema.parse(body)
        const res = await createProfileImage(validatedBody)
        return Response.json({ success: true, data: res })
    } catch (error) {
        if (fileKey) {
            await utapi.deleteFiles(fileKey)
        }
        return handleError(error)
    }
}