import { prisma } from '@/lib/prisma'
import ChatBubble from '@/components/chat/ChatBubble'
import MessageForm from './MessageForm'
import { pusherClient } from "@/lib/pusher"
import { revalidatePath } from "next/cache"

type ChatBoxProps = {
    userId: string
    collaborationId: string
}

const ChatBox = async (props: ChatBoxProps) => {
    // const [chats, setChats] = useState<Chat[]>([])
    // const [message, setMessage] = useState<string>("")
    // const chatBubbleContainerRef = useRef<HTMLDivElement | null>(null)
    // useEffect(() => {
    //     setChats([])
    //     const fetchChats = async () => {
    //         try {
    //             const res = await axios.get(`api/chats?where={"collaborationId":"${props.collaboration.id}"}&include={"sender":true}`)
    //             setChats(res.data.chats)
    //         } catch (error) {
    //             setChats([])
    //         }
    //     }
    //     fetchChats()
    // }, [props.collaborationId])

    // useEffect(() => {
    //     const channel = pusherClient.subscribe(props.collaboration.id)
    //     channel.bind("chat", (chat: Chat) => {
    //         if (chat.senderId !== props.userId) {
    //             setChats(chats => [...chats, chat])
    //         }
    //     })
    //     return () => {
    //         channel.unbind("chat")
    //         pusherClient.unsubscribe(props.collaboration.id)
    //     }
    // }, [props.collaboration.id, props.userId])

    // useEffect(() => {
    //     if (chatBubbleContainerRef.current) {
    //         chatBubbleContainerRef.current.scrollTop = chatBubbleContainerRef.current.scrollHeight
    //     }
    // }, [chats])

    // const handleSendMessage = (message: string) => {
    //     const senderId = props.userId
    //     const receiverId = props.collaboration.user1.id === props.userId ? props.collaboration.user2.id : props.collaboration.user1.id
    //     const sendMessage = async () => {
    //         setMessage("")
    //         try {
    //             const res = await axios.post(`api/chats`, {
    //                 collaborationId: props.collaboration.id,
    //                 senderId,
    //                 receiverId,
    //                 message
    //             })
    //             setChats(chats => [...chats, res.data.chat])
    //         } catch (error) {
    //             // eslint-disable-next-line no-console
    //             console.log(error)
    //         }
    //     }
    //     sendMessage()
    // }

    const chats = await prisma.chat.findMany({
        where: {
            collaborationId: props.collaborationId
        },
    })

    const currentCollaboration = await prisma.collaboration.findUnique({
        where: {
            id: props.collaborationId
        }
    })

    const channel = pusherClient.subscribe(props.collaborationId)
    channel.bind("chat", () => {
        revalidatePath('/chat')
    })

    return (
        <div className="h-full max-h-full flex flex-col gap-2">
            <div className='h-[860px] py-2 px-4 flex flex-col-reverse overflow-auto'>
                {chats.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(chat => (
                    <ChatBubble key={chat.id} chat={chat} userId={props.userId}/>
                ))}
            </div>
            <MessageForm collaborationId={props.collaborationId} senderId={props.userId} receiverId={currentCollaboration?.userId1 === props.userId ? currentCollaboration?.userId2 as string : currentCollaboration?.userId1 as string}/>
        </div>
    )
}

export default ChatBox