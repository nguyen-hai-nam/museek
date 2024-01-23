import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { prisma } from "@/lib/prisma"
import ProfileImageCarousel from "@/components/ProfileImageCarousel"


const Profile = async ({ params }: { params: { id: string } }) => {
    const user = await currentUser()
    if (!user) {
        redirect('/firstLogin')
    }

    const viewingProfile = await prisma.user.findUnique({
        where: {
            id: params.id
        },
        include: {
            roles: {
                include: {
                    role: true
                }
            },
            profileImages: true
        }
    })
    if (!viewingProfile) {
        return (
            <div className="mx-auto w-3/5 h-full flex justify-center items-center text-3xl font-bold">
                Cannot view this profile
            </div>
        )
    }

    const isCollaborationSent = await prisma.collaboration.findFirst({
        where: {
            userId1: user.id,
            userId2: params.id
        }
    })

    const doneCount = await prisma.collaboration.count({
        where: {
            OR: [
                {
                    userId2: params.id,
                    status: 'DONE'
                },
                {
                    userId1: params.id,
                    status: 'DONE'
                }
            ]
        }
    })

    return (
        <div className="mx-auto mt-12 w-3/5">
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
                        {user?.id === params.id && (
                            <Link href="/profile/edit">
                                <button className="btn btn-sm">Edit profile</button>
                            </Link>
                        )}
                        {user?.id !== params.id && isCollaborationSent && (
                            <button className="btn btn-sm btn-primary btn-disabled">Request sent</button>
                        )}
                        {user?.id !== params.id && !isCollaborationSent && (
                            <button className="btn btn-sm btn-primary">Request collaboration</button>
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
                    </div>
                </div>
            </section>              
            <div className="my-6 mx-auto h-0 w-full divider"></div>
            <section className="mx-auto w-2/3">
                <p className="text-center">{viewingProfile.bio}</p>
            </section>
            <div className="my-6 mx-auto h-0 w-full divider"></div>
            <section className="">
                <ProfileImageCarousel userId={user.id} viewingProfileId={viewingProfile.id} profileImages={viewingProfile.profileImages} />
            </section>
        </div>
    )
}

export default Profile