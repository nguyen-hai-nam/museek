"use client"

import Image from 'next/image'

const ChatCard = (props: { id: string; userId: string; name: string; latestMessage: { content: string; fromId: string; sentAt: Date }, focus: boolean }) => {
    return (
        <div className={`h-20 w-min md:w-64 lg:w-80 xl:w-96 px-4 py-0 flex items-center gap-0 cursor-pointer hover:bg-slate-200 ${props.focus ? 'bg-slate-200' : 'bg-transparent'}`}>
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <Image height={64} width={64} src="/vercel.svg" alt={`Profile Picture ${props.id}`}/>
                </div>
            </div>
            <div className="hidden md:block card-body">
                <h2 className="font-semibold">{ props.name }</h2>
                <p className='text-sm line-clamp-1'><span>{ props.latestMessage.fromId === props.userId ? "You" : props.name }: </span>{ props.latestMessage.content }</p>
            </div>
        </div>
    )
}

export default ChatCard