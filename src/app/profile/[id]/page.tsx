import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { prisma } from "@/lib/prisma"
import ProfileImageCarousel from "@/components/ProfileImageCarousel"
import ProfileHeader from "@/components/ProfileHeader"


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

    const sentCollaboration = await prisma.collaboration.findFirst({
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
            <ProfileHeader userId={user.id} viewingProfile={viewingProfile} isCollaborationSent={!!sentCollaboration} doneCount={doneCount} />
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