import ChatBox from '@/components/ChatBox'
import ChatCard from '@/components/ChatCard'

export default function Chat({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto pt-8 w-full h-[calc(100vh-180px)] flex justify-start items-start">
            <div className='w-20 md:w-64 lg:w-80 xl:w-96 h-full border-r-2'>
                <h1 className='text-2xl font-bold'>Chat</h1>
                <div className='mt-2 mb-4 mr-2 '>
                    <input type="text" placeholder="Find chat ..." className="input input-bordered w-full input-sm lg:input-md focus:outline-2 focus:outline-offset-0" />
                </div>
                <div className="grid grid-cols-1 h-full overflow-auto overflow-x-hidden">
                    <ChatCard id="1" name='Kurt Cobain' latestMessage={{ content: "Hi there", fromId: "1", sentAt: new Date() }}/>
                    <ChatCard id="1" name='Kurt Cobain' latestMessage={{ content: "Hi there", fromId: "1", sentAt: new Date() }}/>
                    <ChatCard id="1" name='Kurt Cobain' latestMessage={{ content: "Hi there", fromId: "1", sentAt: new Date() }}/>
                    <ChatCard id="1" name='Kurt Cobain' latestMessage={{ content: "Hi there", fromId: "1", sentAt: new Date() }}/>
                    <ChatCard id="1" name='Kurt Cobain' latestMessage={{ content: "Hi there", fromId: "1", sentAt: new Date() }}/>
                    <ChatCard id="1" name='Kurt Cobain' latestMessage={{ content: "Hi there", fromId: "1", sentAt: new Date() }}/>
                    <ChatCard id="1" name='Kurt Cobain' latestMessage={{ content: "Hi there", fromId: "1", sentAt: new Date() }}/>
                    <ChatCard id="1" name='Kurt Cobain' latestMessage={{ content: "Hi there", fromId: "1", sentAt: new Date() }}/>
                    <ChatCard id="1" name='Kurt Cobain' latestMessage={{ content: "Hi there", fromId: "1", sentAt: new Date() }}/>
                    <ChatCard id="1" name='Kurt Cobain' latestMessage={{ content: "Hi there", fromId: "1", sentAt: new Date() }}/>
                </div>
            </div>
            <div className='h-full grow'>
                <ChatBox />
            </div>
        </main>
    )
}