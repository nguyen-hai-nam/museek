import { createNextRouteHandler } from "uploadthing/next"

import { ourFileRouter, utapi } from "@/app/api/uploadthing/core"

export const { GET, POST } = createNextRouteHandler({
    router: ourFileRouter,
})

export async function DELETE(request: Request) {
    const body = await request.json()
    const fileName = body.fileUrl.substring(body.fileUrl.lastIndexOf('/') + 1)
    await utapi.deleteFiles(fileName)

    return Response.json({ success: true})
}