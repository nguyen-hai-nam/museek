"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useEffect, useState } from 'react'

import CollaborationCard from '@/components/CollaborationCard'
import { Collaboration, CollaborationStatus, getCollaborationsResponseSchema } from '@/schemas/collaborations'

export default function Collaboration() {
    const { user } = useUser()
    const [incomingCollaborations, setIncomingCollaborations] = useState<Collaboration[]>([])
    const [myCollaborations, setMyCollaborations] = useState<Collaboration[]>([])
    useEffect(() => {
        if (!user) {
            return
        }
        const fetchCollaborations = async () => {
            try {
                const res = await axios.get(`api/collaborations?where={"userId2":"${user.id}"}&include={"user1":true}`)
                const validatedCollaborations = getCollaborationsResponseSchema.parse(res.data.collaborations)
                setIncomingCollaborations(validatedCollaborations.filter((collaboration) => collaboration.status === 'WAITING'))
                setMyCollaborations(validatedCollaborations.filter((collaboration) => collaboration.status !== 'WAITING'))
            } catch (error) {
                setIncomingCollaborations([])
                setMyCollaborations([])
            }
        }
        fetchCollaborations()
    }, [user])

    const handleStatusChange = (id: string, status: CollaborationStatus) => {
        if (status === 'DONE') {
            setMyCollaborations(myCollaborations.map(collaboration =>
                collaboration.id === id ? { ...collaboration, status } : collaboration
            ))
        } else if (status === 'IN_PROGRESS') {
            const collaborationInProgress = incomingCollaborations.find(collaboration => collaboration.id === id)
            if (collaborationInProgress) {
                setIncomingCollaborations(incomingCollaborations.filter(collaboration => collaboration.id !== id))
                setMyCollaborations(myCollaborations.concat({ ...collaborationInProgress, status }))
            }
        } else if (status === 'REJECTED') {
            setIncomingCollaborations(incomingCollaborations.filter(collaboration => collaboration.id !== id))
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
        <div className='my-4 mx-auto w-3/5'>
            <div className='my-4'>
                <h1 className='font-semibold text-center'>Incoming Collaboration</h1>
                <div className='my-4'>
                    {incomingCollaborations.length > 0 ? incomingCollaborations.map((collaboration) => {
                        return (
                            <CollaborationCard key={collaboration.id} {...collaboration} onStatusChange={handleStatusChange}/>
                        )
                    }) : (
                        <p className='text-sm text-center'>No imcoming collaboration</p>
                    )}
                </div>
            </div>
            <div className='my-4'>
                <h1 className='font-semibold text-center'>Current Collaboration</h1>
                <div className='my-4'>
                    {myCollaborations.length > 0 ? myCollaborations.map((collaboration) => {
                        return (
                            <CollaborationCard key={collaboration.id} {...collaboration} onStatusChange={handleStatusChange}/>
                        )
                    }) : (
                        <p className='text-sm text-center'>You have not made any collaborations</p>
                    )}
                </div>
            </div>
        </div>
    )
}