import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import ChatBox from "@/components/chat/ChatBox"
import CurrentCollaborationList from "@/components/chat/CurrentCollaborationList"
import IncomingCollaborationList from "@/components/chat/IncomingCollaborationList"

let tab: 'Current' | 'Incoming' = 'Current'
let selectedCollaborationId: string | null = null

const Chat = async () => {
    const { userId } = await auth()

    const handleTabChange = async (formData: FormData) => {
        "use server"
        const newTab = formData.get('tab') as 'Current' | 'Incoming'
        tab = newTab
        revalidatePath('/chat')
    }

    const setSelectedCollaboration = async (collaborationId: string | null) => {
        "use server"
        selectedCollaborationId = collaborationId
        revalidatePath('/chat')
    }

    return (
        <main className="h-full w-full grid grid-cols-[minmax(min-content,20%)_1fr] justify-start items-start overflow-hidden">
            <div className='px-2 h-full border-r-2'>
                <h1 className='mt-4 text-2xl font-bold'>Chat</h1>
                <div role="tablist" className="mt-4 tabs tabs-lifted">
                    <a role="tab" className={`tab font-bold ${tab === 'Current' ? 'tab-active text-secondary' : ''}`}>
                        <form action={handleTabChange}>
                            <input type="text" name="tab" value="Current" readOnly hidden/>
                            <button type="submit" disabled={tab === "Current"}>Current</button>
                        </form>
                    </a>
                    <a role="tab" className={`tab font-bold ${tab === 'Incoming' ? 'tab-active text-secondary' : ''}`}>
                        <form action={handleTabChange}>
                            <input type="text" name="tab" value="Incoming" readOnly hidden />
                            <button type="submit" disabled={tab === "Incoming"}>Incoming</button>
                        </form>
                    </a>
                </div>
                {tab === 'Current' && (
                    <CurrentCollaborationList userId={userId as string} handleSelect={setSelectedCollaboration} />
                )}
                {tab === 'Incoming' && (
                    <IncomingCollaborationList userId={userId as string} />
                )}
            </div>
            <div className='h-full'>
                {selectedCollaborationId ? (
                    <ChatBox userId={userId as string} collaborationId={selectedCollaborationId}/>
                ) : (
                    <div className='h-full flex items-center justify-center'>
                        <h1 className='text-2xl font-semibold text-center'>Select a conversation to start chatting</h1>
                    </div>
                
                )}
            </div>
        </main>
    )
}

export default Chat