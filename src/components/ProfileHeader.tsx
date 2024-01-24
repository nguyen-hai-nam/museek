"use client"

import { ChangeEvent, useState } from "react"
import { Prisma } from "@prisma/client"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { FaPenToSquare } from "react-icons/fa6"

type ProfileHeaderProps = {
    viewingProfile: Prisma.UserGetPayload<{
        include: {
            roles: {
                include: { role: true }
            } 
        }
    }>
    doneCount: number
    isCollaborationSent: boolean
    userId: string

}

const ProfileHeader = ({ viewingProfile, doneCount, isCollaborationSent, userId }: ProfileHeaderProps) => {
    const [message, setMessage] = useState("")
    const [isSent, setIsSent] = useState(isCollaborationSent)

    const openRequestCollaborationModal = () => {
        (document.getElementById('requestCollaborationModal') as HTMLDialogElement).showModal()
    }

    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const sendRequest = async () => {
        try {
            await axios.post("/api/collaborations", {
                userId1: userId,
                userId2: viewingProfile.id,
                invitationMessage: message
            })
            setIsSent(true)
        } catch (error) {
            setIsSent(false)
        }
    }

    return (
        <>
            <dialog id="requestCollaborationModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Request Collaboration</h3>
                    <p className="py-4 text-sm">Press ESC key or click the button below to close</p>
                    <textarea name="invitationMessage" value={message} onChange={handleMessageChange} rows={5} placeholder="Your message ..." className="mt-2 w-full textarea textarea-sm textarea-secondary"/>
                    <div className="modal-action">
                        <form method="dialog" className="flex justify-center items-center gap-2">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-warning">Close</button>
                            <button className="btn btn-success" onClick={sendRequest}>Send</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <section className="flex items-start gap-12">
                <div className="min-w-max avatar cursor-pointer rounded-full overflow-hidden outline outline-4 outline-offset-0 outline-secondary">
                    <div className="w-12 md:w-24 lg:w-36 xl:w-48 rounded-full">
                        <Image
                            src={viewingProfile.avatarUrl || "./next.svg"}
                            width={192}
                            height={192}
                            alt="Profile Picture"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div className="grow flex flex-col justify-start gap-4">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold">{viewingProfile.name}</h1>
                        {userId === viewingProfile.id && (
                            <Link href="/profile/edit">
                                <button className="btn btn-sm">Edit profile</button>
                            </Link>
                        )}
                        {userId !== viewingProfile.id && isSent && (
                            <button className="btn btn-sm btn-primary btn-disabled">Request sent</button>
                        )}
                        {userId !== viewingProfile.id && !isSent && (
                            <button className="btn btn-sm btn-primary" onClick={openRequestCollaborationModal}>Request collaboration</button>
                        )}
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-1">
                        <p className="font-semibold text-primary-content/75">Gender</p>
                        <p className="font-semibold text-primary-content/75">Birth date</p>
                        <p className="font-semibold text-primary-content/75">Location</p>
                        <p className="font-semibold text-primary-content/75">Done</p>
                        <p className="font-semibold text-sm text-primary-content">{viewingProfile.phoneNumber || "Not provided"}</p>
                        <p className="font-semibold text-sm text-primary-content">{viewingProfile.birthDate?.toDateString() || "Not provided"}</p>
                        <p className="font-semibold text-sm text-primary-content">{viewingProfile.location || "Not provided"}</p>
                        <p className="font-semibold text-sm text-primary-content">{doneCount ? doneCount : "Not provided"}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {viewingProfile.roles.length > 0 ? viewingProfile.roles?.map((role, index) => (
                            <div key={index} className="badge badge-lg badge-outline badge-neutral text-sm font-semibold border-2">{role.role.name}</div>
                        )) : (
                            <div className="badge badge-lg badge-outline badge-neutral text-sm font-semibold border-2">No roles</div>
                        )}
                        <Link href={'/profile/edit/roles'}><FaPenToSquare className="text-xl" /></Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProfileHeader