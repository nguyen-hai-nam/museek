import ChatBubble from '@/components/ChatBubble'

const ChatBox = () => {
    return (
        <div className="h-full w-full overflow-visible">
            <div className='h-full px-4 flex flex-col-reverse overflow-y-scroll'>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "2", name: 'Kurt Cobain', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "2", name: 'Kurt Cobain', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "2", name: 'Kurt Cobain', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "2", name: 'Kurt Cobain', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "2", name: 'Kurt Cobain', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "2", name: 'Kurt Cobain', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "2", name: 'Kurt Cobain', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "2", name: 'Kurt Cobain', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "2", name: 'Kurt Cobain', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
                <ChatBubble sender={{ id: "1", name: 'Me', avatarUrl: './vervel.svg' }} message='You are the chosen one!' sentAt={ new Date }/>
            </div>
            <div className='mt-8 mx-4 flex gap-2'>
                <input type="text" placeholder="Aa" className="input input-bordered w-full focus:outline-2 focus:outline-offset-0" />
                <button className="btn">Send</button>
            </div>
        </div>
    )
}

export default ChatBox