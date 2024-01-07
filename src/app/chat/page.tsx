"use client"

import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"

import { Collaboration, getCollaborationsResponseSchema } from "@/schemas/collaborations"
import ChatCard from "@/components/ChatCard"
import ChatBox from "@/components/ChatBox"

export default function Chat() {
    const { user } = useUser()
    const [myCollaborations, setMyCollaborations] = useState<Collaboration[]>([])
    const [currentCollaboration, setCurrentCollaboration] = useState<Collaboration | null>(null)
    const [chatSearchString, setChatSearchString] = useState<string>("")

    useEffect(() => {
        if (!user) {
            return
        }
        const fetchCollaborations = async () => {
            try {
                const res = await axios.get(`api/collaborations?where={"userId2":"${user.id}"}&include={"user1":true,"chats":true}`)
                const validatedCollaborations = getCollaborationsResponseSchema.parse(res.data.collaborations)
                setMyCollaborations(validatedCollaborations)
            } catch (error) {
                setMyCollaborations([])
            }
        }
        fetchCollaborations()
    }, [user])

    const handleChatCardClick = (id: string) => {
        const res = myCollaborations.find(collaboration => collaboration.id === id)
        if (res) {
            setCurrentCollaboration(res)
        }
    }

    if (!user) {
        return (
            <main className="mx-auto w-3/5 flex justify-center items-center">
                <span className="my-64 loading loading-infinity loading-lg scale-[2]"></span>
            </main>
        )
    }

    return (
        <main className="pl-2 h-full w-full grid grid-cols-[20%_80%] justify-start items-start overflow-hidden">
            <div className='h-full border-r-2'>
                <h1 className='mt-4 text-2xl font-bold'>Chat</h1>
                <div className='mt-2 mb-4 mr-2 '>
                    <input
                        value={chatSearchString}
                        onChange={(e) => setChatSearchString(e.target.value)} 
                        type="text"
                        placeholder="Find chat ..."
                        className="input input-sm input-bordered w-full focus:outline-2 focus:outline-offset-0"
                    />
                </div>
                <div className="flex flex-col h-full overflow-auto overflow-x-hidden">
                    {myCollaborations.filter(collaboration => {
                        const name = collaboration.user1.id === user.id ? collaboration.user2.name : collaboration.user1.name
                        return name.toLowerCase().includes(chatSearchString.toLowerCase())
                    }).map(collaboration => (
                        <div key={collaboration.id} onClick={() => handleChatCardClick(collaboration.id)}>
                            <ChatCard
                                id={collaboration.id}
                                userId={user.id}
                                name={collaboration.user1.id === user.id ? collaboration.user2.name : collaboration.user1.name}
                                latestMessage={{
                                    content: collaboration.chats[0]?.message,
                                    fromId: collaboration.chats[0]?.senderId,
                                    sentAt: collaboration.chats[0]?.createdAt
                                }}
                                focus={collaboration.id === currentCollaboration?.id}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className='h-full grow overflow-auto'>
                {currentCollaboration && (
                    <ChatBox collaboration={currentCollaboration} userId={user.id}/>
                )}
            </div>
        </main>
    )
}