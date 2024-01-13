"use client"

import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing"
import "@uploadthing/react/styles.css"
import { useState } from "react"

interface AvatarUploadProps {
    currentAvatarUrl?: string
    // eslint-disable-next-line no-unused-vars
    onChange: (url: string) => void
    // eslint-disable-next-line no-unused-vars
    onError: (error: Error) => void
}

export const AvatarUpload = ({ currentAvatarUrl, onChange, onError }: AvatarUploadProps) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(currentAvatarUrl)

    return (
        <div className="relative mx-auto w-fit">
            {imageUrl ? (
                <div className="my-2 w-52 h-52 aspect-square overflow-hidden rounded-full outline outline-4 outline-primary outline-offset-4">
                    <Image
                        src={imageUrl}
                        alt="Avatar"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                    />
                    <button className="btn btn-error btn-xs btn-circle absolute top-0 right-0" onClick={() => setImageUrl("")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <UploadDropzone
                    endpoint="avatarImage"
                    onClientUploadComplete={(res: any) => {
                        setImageUrl(res[0].url)
                        onChange(res[0].url)
                    }}
                    onUploadError={(error: Error) => {
                        onError(error)
                    }}
                />
            )}  
        </div>
    )
}