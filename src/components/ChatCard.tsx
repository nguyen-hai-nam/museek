import Link from 'next/link'
import Image from 'next/image'

const ChatCard = ({ id, name, latestMessage }: { id: string; name: string; latestMessage: { content: string; fromId: string; sentAt: Date } }) => {
    return (
        <div className="h-24 w-min md:w-64 lg:w-80 xl:w-96 px-4 py-0 flex items-center gap-0 cursor-pointer hover:bg-gray-200">
            <Link href={`chat/${id}`}>
                <div className="avatar">
                    <div className="w-16 rounded-full">
                        <Image height={64} width={64} src="/vercel.svg" alt={`Profile Picture ${id}`}/>
                    </div>
                </div>
            </Link>
            <div className="hidden md:block card-body">
                <h2 className="text-lg font-semibold">{ name }</h2>
                <p className='text-md line-clamp-1'><span>{ latestMessage.fromId === "1" ? "You" : name }: </span>{ latestMessage.content }</p>
            </div>
        </div>
    )
}

export default ChatCard