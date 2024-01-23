import { revalidatePath } from "next/cache"
import Image from "next/image"
import { CiMenuKebab } from "react-icons/ci"

import { prisma } from "@/lib/prisma"

type CurrentCollaborationListProps = {
    userId: string | null
    // eslint-disable-next-line no-unused-vars
    handleSelect: (collaborationId: string | null) => void
}

let searchString = ''
let focusId = ''

const CurrentCollaborationList = async (props: CurrentCollaborationListProps) => {
    const currentCollaborations = await prisma.collaboration.findMany({
        where: {
            OR: [
                {
                    userId1: props.userId as string,
                    status: 'IN_PROGRESS'
                },
                {
                    userId2: props.userId as string,
                    status: 'IN_PROGRESS'
                }
            ],
        },
        include: {
            user1: true,
            user2: true,
        }
    })

    if (props.userId === null) {
        return null
    }

    const handleSearchStringChange = async (formData: FormData) => {
        "use server"
        searchString = formData.get('searchString') as string
        revalidatePath('/chat')
    }

    const handleFocusChange = async (formData: FormData) => {
        "use server"
        focusId = formData.get('focusId') as string
        props.handleSelect(focusId)
        revalidatePath('/chat')
    }

    return (
        <div>
            <form action={handleSearchStringChange} className="my-4 mx-4">
                <input type="text" name="searchString" placeholder="Aa" className="input input-primary input-bordered input-sm w-full focus:outline-2 focus:outline-offset-0" />
            </form>
            {currentCollaborations.filter(collaboration => {
                const name = collaboration.user1.id === props.userId ? collaboration.user2.name : collaboration.user1.name
                return name.toLowerCase().includes(searchString.toLowerCase())
            }).map((collaboration, index) => (
                <div key={collaboration.id}>
                    <form action={handleFocusChange}>
                        <input type="text" name="focusId" value={collaboration.id} readOnly hidden />
                        <button id={`submit-button-${index}`} type="submit" hidden disabled={collaboration.id === focusId}/>
                        <label htmlFor={`submit-button-${index}`} className={`px-2 h-20 w-full flex items-center gap-4 cursor-pointer rounded-lg hover:bg-secondary/50 ${collaboration.id === focusId ? 'bg-secondary/25' : 'bg-transparent'}`} >
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
                            <div className="grow flex justify-start">
                                <h2 className="font-semibold">{collaboration.user1.id === props.userId ? collaboration.user2.name : collaboration.user1.name}</h2>
                            </div>
                            <CiMenuKebab />
                        </label>
                    </form>  
                </div>
            ))}
        </div>
    )
}

export default CurrentCollaborationList