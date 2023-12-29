import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

import { Collaboration, CollaborationStatus } from '@/schemas/collaborations'

interface CollaborationCardProps extends Collaboration {
    // eslint-disable-next-line no-unused-vars
    onStatusChange: (id: string, status: CollaborationStatus) => void;
}

const CollaborationCard = (props: CollaborationCardProps) => {
    const handleClick = async (status: CollaborationStatus) => {
        try {
            await axios.put(`api/collaborations/${props.id}`, { status })
            props.onStatusChange(props.id, status)
        } catch (error) {}
    }

    return (
        <div className="w-full grid grid-cols-[min-content_1fr_max-content] gap-x-4 shadow-sm">
            <div className="avatar">
                <div className="w-24 rounded">
                    <Image width={96} height={96} src="next.svg" alt='Avatar'/>
                </div>
            </div>
            <div>
                <h1 className='font-semibold'>{props.user1.name}</h1>
                <p className='text-sm line-clamp-3'>{props.invitationMessage}</p>
            </div>
            {props.status === 'WAITING' ? (
                <div className='flex justify-end items-center gap-2'>
                    <button className='btn btn-sm btn-primary' onClick={() => handleClick('IN_PROGRESS')}>Accept</button>
                    <button className='btn btn-sm btn-warning' onClick={() => handleClick('REJECTED')}>Reject</button>
                </div>
            ) : (
                <div className='flex justify-end items-center gap-2'>
                    <Link href={`/chat/${props.id}`}>
                        <button className='btn btn-sm btn-secondary'>Chat</button>
                    </Link>
                    <button className='btn btn-sm btn-accent' disabled={props.status === 'DONE'} onClick={() => handleClick('DONE')}>Done</button>
                </div>
            )
            }
        </div>
    )
}

export default CollaborationCard