"use client"

import Image from "next/image"
import { useState } from "react"
import ProfileImagePreview from "./ProfileImagePreview"
import { IoClose, IoRemove, IoAdd, IoTrash } from "react-icons/io5"
import { LuUpload } from "react-icons/lu"
import { deleteProfileImage, uploadProfileImage } from "@/actions/profile"

type ProfileImageCarouselProps = {
    userId: string,
    viewingProfileId: string,
    profileImages: any,
}

const ProfileImageCarousel = (props: ProfileImageCarouselProps) => {
    const [imagePreview, setImagePreview] = useState<any | null>(null)
    const [imagePreviewZoom, setImagePreviewZoom] = useState(0.9)

    if (!props.profileImages) {
        return (
            <div className="w-full text-center gap-4">
                No profile images
            </div>
        )
    }

    const openUploadModal = () => {
        const uploadModal = document.getElementById('uploadModal') as HTMLDialogElement
        uploadModal.showModal()
    }

    const closeUploadModal = () => {
        const uploadModal = document.getElementById('uploadModal') as HTMLDialogElement
        uploadModal.close()
    }

    const handleImageClick = (profileImage: any) => {
        setImagePreview(profileImage)
    }

    const closePreviewModal = () => {
        setTimeout(() => {
            setImagePreview(null)
            setImagePreviewZoom(0.9)
        }, 100)
    }

    return (
        <>
            <dialog id="uploadModal" className="modal">
                <form action={uploadProfileImage} className="modal-box">
                    <h2 className="mb-4 p-2 font-semibold">Upload your image</h2>
                    <input type="text" name="userId" value={props.userId} readOnly hidden />
                    <input type="file" name="file" className="my-2 file-input file-input-sm file-input-bordered file-input-secondary w-full" />
                    <textarea name="description" className="mt-2 textarea textarea-secondary w-full" placeholder="Description about the image ..."></textarea>
                    <div className="modal-action">
                        <button type="button" className="btn btn-sm" onClick={closeUploadModal}>Close</button>
                        <button type="submit" className="btn btn-sm btn-primary" onClick={closeUploadModal}>Upload</button>
                    </div>
                </form>
            </dialog>
            {imagePreview && (
                <div className="z-10 fixed top-0 left-0 w-screen h-screen bg-black/90 overflow-hidden">
                    <div>
                        <ProfileImagePreview url={imagePreview.url as string} zoom={imagePreviewZoom}/>
                        <div className="fixed top-0 right-0 flex items-center gap-4 font-bold text-6xl text-primary">
                            <form action={deleteProfileImage}>
                                <input type="text" name="data" value={JSON.stringify(imagePreview)} readOnly hidden />
                                <button type="submit" className="hover:bg-white/25 hover:rounded-full text-error" onClick={closePreviewModal}><IoTrash /></button>
                            </form>
                            <button type="button" className="hover:bg-white/25 hover:rounded-full" onClick={() => setImagePreviewZoom(prev => prev * 1.1)}><IoAdd /></button>
                            <button type="button" className="hover:bg-white/25 hover:rounded-full" onClick={() => setImagePreviewZoom(prev => prev / 1.1)}><IoRemove /></button>
                            <button  type="button" className="hover:bg-white/25 hover:rounded-full text-6xl" onClick={closePreviewModal}><IoClose /></button>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full">
                {props.userId === props.viewingProfileId && (
                    <div className="flex justify-center items-center gap-2">
                        <button type="submit" className="mb-6 mx-auto btn w-fit btn-primary" onClick={openUploadModal}>
                            <LuUpload className="text-xl" />Upload
                        </button>
                    </div>

                )}
                <div className="w-full grid grid-cols-3 overflow-x-auto gap-4">
                    {props.profileImages.map((profileImage: any, index: number) => (
                        <div key={index} data-tip="hello" className="tooltip tooltip-open tooltip-secondary w-full aspect-square flex justify-center items-center overflow-hidden bg-black" onClick={() => handleImageClick(profileImage)}>
                            <Image src={profileImage.url} alt="Profile Image" width={400} height={400}  className="transition-opacity hover:opacity-75"/>
                        </div>
                    ))}      
                </div>
            </div>
        </>
    )
}

export default ProfileImageCarousel