import { auth } from "@clerk/nextjs"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UTApi } from "uploadthing/server"
 
const f = createUploadthing()
 
const handleAuth = () => {
    const user = auth()
    if (!user) throw new Error("Unauthorized")
    return user
}
 
export const ourFileRouter = {
    avatarImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    messageFile: f(["image", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}), 
} satisfies FileRouter
 
export type OurFileRouter = typeof ourFileRouter;

export const utapi = new UTApi({
    apiKey: process.env.UPLOADTHING_SECRET
})