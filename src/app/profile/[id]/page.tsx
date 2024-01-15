"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"

import { useStore } from "@/lib/zustand"
import { User } from "@/schemas/users"

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

    useEffect(() => {
        if (user?.id === params.id) {
            setProfile(user)
            return
        }
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`/api/users/${params.id}`)
                setProfile(res.data.user)
            } catch (error) {
                router.push('/')
            }
        }
        fetchUserProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

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
                        {user?.id === params.id ? (
                            <Link href="/profile/edit">
                                <button className="btn btn-sm">Edit profile</button>
                            </Link>
                        ) : (
                            <button className="btn btn-sm btn-primary" onClick={()=>(document.getElementById('collab_modal') as HTMLDialogElement)?.showModal()}>Collab</button>
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
