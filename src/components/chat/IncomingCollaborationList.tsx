import Image from "next/image"
import { revalidatePath } from "next/cache"
import { FaCheck, FaTimes } from "react-icons/fa"

import { prisma } from "@/lib/prisma"

type IncomingCollaborationListProps = {
    userId: string | null
}

let searchString = ''

const IncomingCollaborationList = async (props: IncomingCollaborationListProps) => {
    const incomingCollaborations = await prisma.collaboration.findMany({
        where: {
            userId2: props.userId as string,
            status: 'WAITING'
        },
        include: {
            user1: true,
            user2: true,
        }
    })

    const handleSearchStringChange = async (formData: FormData) => {
        "use server"
        searchString = formData.get('searchString') as string
        revalidatePath('/chat')
    }

    const handleAccept = async (formData: FormData) => {
        "use server"
        await prisma.collaboration.update({
            where: {
                id: formData.get('id') as string
            },
            data: {
                status: 'IN_PROGRESS'
            }
        })
        revalidatePath('/chat')
    }

    const handleReject = async (formData: FormData) => {
        "use server"
        await prisma.collaboration.update({
            where: {
                id: formData.get('id') as string
            },
            data: {
                status: 'REJECTED'
            }
        })
        revalidatePath('/chat')
    }

    return (
        <div>
            <form action={handleSearchStringChange} className="my-4 mx-4">
                <input type="text" name="searchString" placeholder="Aa" className="input input-primary input-bordered input-sm w-full focus:outline-2 focus:outline-offset-0" />
            </form>
            {incomingCollaborations.filter(collaboration => {
                const name = collaboration.user1.id === props.userId ? collaboration.user2.name : collaboration.user1.name
                return name.toLowerCase().includes(searchString.toLowerCase())
            }).map(collaboration => (
                <div key={collaboration.id} className={`px-2 h-20 w-full flex items-center gap-4 cursor-pointer rounded-lg hover:bg-secondary/25`}>
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <Image
                                height={64}
                                width={64}
                                src={collaboration.user1.id === props.userId ? (collaboration.user2.avatarUrl || './next.svg') : (collaboration.user1.avatarUrl || './next.svg')}
                                alt={`Profile Picture ${collaboration.id}`}
                            />
                        </div>
                    </div>
                    <div className="grow justify-start">
                        <h2 className="font-semibold">{collaboration.user1.id === props.userId ? collaboration.user2.name : collaboration.user1.name}</h2>
                    </div>
                    <form action={handleAccept} className="flex items-center gap-2">
                        <input type="text" name="id" value={collaboration.id} readOnly hidden/>
                        <button type="submit" className="btn btn-primary btn-sm"><FaCheck /></button>
                        <button formAction={handleReject} className="btn btn-warning btn-sm"><FaTimes /></button>
                    </form>
                </div>
            ))}
        </div>
    )
}

export default IncomingCollaborationList