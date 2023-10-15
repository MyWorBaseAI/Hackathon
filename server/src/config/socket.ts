import { Server } from 'socket.io'
import chatModel from '../models/chat.model'

export default async (io: Server) => io.on('connection', (socket) => {
    // socket.on('join-room', (roomid: string, userid: string) => {
    //     socket.join(roomid)
    //     socket.broadcast.to(roomid).emit('user-connected', userid)
    //     socket.on('disconnect', () => socket.broadcast.to(roomid).emit('user-disconnected', userid))
    // })
    
    socket.on('join-chat', (userid: string) => {
        Object.assign(socket, { userid })
        chatModel.find({ users: { $in: userid } }).select('_id').then(data => {
            socket.join(data.map(d => d.id))
        })
    })

    socket.on('send-message', (message) => {
        io.to(message.chat).emit('get-message', message)
    })

    // socket.on('add-chat', (chat, userid) => {
    //     socket.join(chat.id)
    //     const connectionSockets = io.sockets.sockets
    //     const socketJoin = Array.from(connectionSockets.values()).find((s: any) => s.userid === userid);
    //     if(socketJoin) socketJoin.join(chat.id)
    //     io.to(chat.id).emit('get-chat', chat)
    // })

    // socket.on('edit-message', data => {
    //     io.to(data.chat_id).emit('edit-in-message', data)
    // })

    // socket.on('delete-message', data => {
    //     io.to(data.chat_id).emit('delete-in-message', data)
    // })

    // socket.on('remove-chat', chatid => {
    //     io.to(chatid).emit('remove-in-chat', chatid)
    // })
})