"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { LuUpload } from "react-icons/lu"
import { IoClose, IoAdd, IoRemove, IoTrash } from "react-icons/io5"

import { useStore } from "@/lib/zustand"
import { User } from "@/schemas/users"
import ProfileImageCarousel from "@/components/ProfileImageCarousel"
import ProfileImagePreview from "@/components/ProfileImagePreview"

export default function Profile({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [toast, setToast] = useState<{
        show: boolean,
        message: string,
        type: 'error' | 'success'
    }>({
        show: false,
        message: '',
        type: 'success'
    })
    const { user } = useStore()
    const [profile, setProfile] = useState<User | null>(null)
    const [invitationMessage, setInvitationMessage] = useState("")
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const [imageDescription, setImageDescription] = useState("")
    const [imagePreview, setImagePreview] = useState<any | null>(null)
    const [imagePreviewZoom, setImagePreviewZoom] = useState(0.9)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isCollaborationSent, setIsCollaborationSent] = useState(false)
    
    useEffect(() => {
        if (user?.id === params.id) {
            setProfile(user)
            return
        }
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`/api/users/${params.id}?query={"include":{"profileImages":true}}`)
                setProfile(res.data.user)
            } catch (error) {
                router.push('/')
            }
        }
        const fetchCollaboration = async () => {
            try {
                const res = await axios.get(`/api/collaborations?query={"where":{"userId1":"${user?.id}","userId2":"${params.id}"}}`)
                if (res.data.collaborations.length > 0) {
                    setIsCollaborationSent(true)
                }
            } catch (error) {
                setIsCollaborationSent(false)
            }
        }
        fetchUserProfile()
        fetchCollaboration()
    }, [params.id, router, user])

    if (!user || !profile) {
        return (
            <main className="mx-auto w-3/5 flex justify-center items-center">
                <span className="my-64 loading loading-infinity loading-lg scale-[2]"></span>
            </main>
        )
    }

    const sendCollaboration = async () => {
        try {
            await axios.post("/api/collaborations", {
                userId1: user?.id,
                userId2: params.id,
                invitationMessage
            })
            setToast({
                show: true,
                message: 'Invitation sent',
                type: 'success'
            })
            setIsCollaborationSent(true)
        } catch (error: any) {
            setToast({
                show: true,
                message: error.response.data.message || 'Something went wrong',
                type: 'error'
            })
        } finally {
            setTimeout(() => {
                setToast(p => ({ ...p, show: false }))
            }, 3000)
        }
    }

    const uploadProfileImage = async () => {
        try {
            const formData = new FormData()
            formData.append("file", uploadedImage as File)
            const data = {
                userId: user.id,
                description: imageDescription
            }
            formData.append("data", JSON.stringify(data))
            const res = await axios.post("/api/profileImages", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (res.data.success) {
                setProfile((oldProfile) => { 
                    if (!oldProfile) return null
                    return { ...oldProfile, profileImages: [...(oldProfile.profileImages || []), res.data.data]}
                })
                setToast({
                    show: true,
                    message: 'Image uploaded',
                    type: 'success'
                })
            }
        } catch (error: any) {
            setToast({
                show: true,
                message: error.response.data.message || 'Something went wrong',
                type: 'error'
            })
        } finally {
            setUploadedImage(null)
            setImageDescription("")
            setTimeout(() => {
                setToast(p => ({ ...p, show: false }))
            }, 3000)
        }
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            if (file) {
                setUploadedImage(file)
            } else {
                setUploadedImage(null)
            }
        }
    }

    const handleImageDelete = async () => {
        setIsDeleting(true)
        await axios.delete(`/api/profileImages/${imagePreview.id}`)
        setProfile((oldProfile) => { 
            if (!oldProfile) return null
            return { ...oldProfile, profileImages: oldProfile.profileImages?.filter((image: any) => image.id !== imagePreview.id)}
        })
        setIsDeleting(false)
        setImagePreview(null)
        setImagePreviewZoom(0.9)
    }

    const handleUploadModalClose = () => {
        setUploadedImage(null)
        setImageDescription("")
    }

    const handlePreviewModalOpen = (profileImage: string) => {
        setImagePreview(profileImage)
        setImagePreviewZoom(0.9)
    }
    
    const handlePreviewModalClose = () => {
        setImagePreview(null)
        setImagePreviewZoom(0.9)
    }

    return (
        <main className="mx-auto pt-8 w-3/5">
            <dialog id="collab_modal" className="modal">
                <div className="modal-box">
                    <h2 className="p-2 font-semibold">Invitation message</h2>
                    <p className="p-2 text-sm text-gray-400">A kind message helps in creating a positive and collaborative environment.</p>
                    <textarea  value={invitationMessage} onChange={(e) => setInvitationMessage(e.target.value)} className="mt-6 textarea textarea-primary w-full" placeholder="Your invitation message goes here ..."></textarea>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="mx-2 btn">Close</button>
                            <button className="btn btn-primary" onClick={sendCollaboration}>Send</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="upload_modal" className="modal">
                <div className="modal-box">
                    <h2 className="p-2 font-semibold">Upload your images</h2>
                    <input type="file" onChange={handleImageUpload} className="my-4 file-input file-input-bordered file-input-primary w-full" />
                    <textarea value={imageDescription} onChange={(e) => setImageDescription(e.target.value)} className="my-4 textarea textarea-secondary w-full" placeholder="Description about the image ..."></textarea>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="mx-2 btn" onClick={handleUploadModalClose}>Close</button>
                            <button className="btn btn-primary" onClick={uploadProfileImage}>Upload</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {imagePreview && (
                <div className="z-10 fixed top-0 left-0 w-screen h-screen bg-black/90 overflow-hidden">
                    <div>
                        <ProfileImagePreview url={imagePreview.url as string} zoom={imagePreviewZoom}/>
                        <div className="fixed top-0 right-0 flex items-center gap-4 font-bold text-6xl text-primary">
                            {isDeleting ? (
                                <span className="loading loading-spinner loading-lg text-secondary"></span>
                            ) : (
                                <button className="hover:bg-white/25 hover:rounded-full text-secondary" onClick={handleImageDelete}><IoTrash /></button>
                            )}
                            <button className="hover:bg-white/25 hover:rounded-full" onClick={() => setImagePreviewZoom(prev => prev * 1.1)}><IoAdd /></button>
                            <button className="hover:bg-white/25 hover:rounded-full" onClick={() => setImagePreviewZoom(prev => prev / 1.1)}><IoRemove /></button>
                            <button className="hover:bg-white/25 hover:rounded-full text-6xl" onClick={handlePreviewModalClose}><IoClose /></button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-between gap-12">
                <div className="min-w-max avatar cursor-pointer rounded-full overflow-hidden outline outline-4 outline-offset-8 outline-primary">
                    <div className="w-12 md:w-24 lg:w-36 xl:w-48 rounded-full">
                        <Image
                            src={profile.avatarUrl ? profile.avatarUrl : "/vercel.svg"}
                            width={192}
                            height={192}
                            alt="Profile Picture"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div className="w-3/4 max-w-full">
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold">{profile.name}</span>
                        {user?.id === params.id && (
                            <Link href="/profile/edit">
                                <button className="btn btn-sm">Edit profile</button>
                            </Link>
                        )}
                        {user?.id !== params.id && isCollaborationSent && (
                            <button className="btn btn-sm btn-primary btn-disabled">Request sent</button>
                        )}
                        {user?.id !== params.id && !isCollaborationSent && (
                            <button className="btn btn-sm btn-primary" onClick={()=>(document.getElementById('collab_modal') as HTMLDialogElement)?.showModal()}>Request collaboration</button>
                        )}
                    </div>
                    <div className="mt-4 xl:w-4/5 grid grid-cols-2">
                        <p className="font-semibold">Phone: {profile.phoneNumber}</p>
                        <p className="font-semibold">Email: {profile.email}</p>
                        <p className="font-semibold">Location: {profile.location}</p>
                        <p className="font-semibold">Gender: {profile.gender}</p>
                        <p className="font-semibold">Birthday: {(new Date(profile.birthDate as string)).toLocaleDateString("vi-VN")}</p>
                    </div>
                    <div className="mt-4 xl:w-4/5 flex flex-wrap gap-2">
                        {profile.roles?.map((role, index) => (
                            <div key={index} className='badge badge-outline font-semibold border-2'>{role.role.name}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-12 mx-auto h-0 w-3/5 divider"></div>
            <div className="mx-auto w-2/3">
                <p className="text-center">{profile.bio}</p>
            </div>
            <div className="mx-auto h-0 w-3/5 divider"></div>
            {user?.id === params.id && (
                <div className="mx-auto w-fit">
                    <button className="btn w-32 btn-primary" onClick={() => (document.getElementById('upload_modal') as HTMLDialogElement)?.showModal()}>
                        <LuUpload className="text-xl"/>
                    </button>
                </div>
            )}
            <div className="mt-4">
                <ProfileImageCarousel profileImages={profile.profileImages} handleImageClick={handlePreviewModalOpen}/>
            </div>
            {toast.show && (
                <div className="toast toast-end">
                    <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </main>
    )
}
