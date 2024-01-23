import { createNextRouteHandler } from "uploadthing/next"

import { ourFileRouter } from "@/app/api/uploadthing/core"
import { utapi } from "@/lib/utapi"

export const { GET, POST } = createNextRouteHandler({
    router: ourFileRouter,
})

export async function DELETE(request: Request) {
    const body = await request.json()
    const fileName = body.fileUrl.substring(body.fileUrl.lastIndexOf('/') + 1)
    await utapi.deleteFiles(fileName)

    return Response.json({ success: true})
}
