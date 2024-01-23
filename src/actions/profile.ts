"use server"

import { utapi } from "@/lib/utapi"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export const deleteProfileImage = async (formData: FormData) => {
    const profileImage = JSON.parse(formData.get('data') as string)
    const key = profileImage.url.split('/').pop()
    await utapi.deleteFiles(key as string)
    await prisma.profileImage.delete({
        where: {
            id: profileImage.id
        }
    })
    revalidatePath('/profile')
}

export const uploadProfileImage = async (formData: FormData) => {
    const userId = formData.get('userId') as string
    const description = formData.get('description') as string
    const profileImage = formData.get('file') as File
    const res = await utapi.uploadFiles(profileImage)
    if (res.error) {
        return
    }
    try {
        await prisma.profileImage.create({
            data: {
                userId: userId,
                url: res.data.url,
                description: description
            }
        })
    } catch (error) {
        await utapi.deleteFiles(res.data.key)
    }
    revalidatePath('/profile')
}