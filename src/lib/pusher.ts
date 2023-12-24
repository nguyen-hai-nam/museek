import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY!,
    secret: process.env.PUSHER_SECRET_KEY!,
    cluster: 'ap1',
    useTLS: true,
})

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY!, {
    cluster: 'ap1'
})