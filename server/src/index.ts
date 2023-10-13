import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { PeerServer } from 'peer'

const app = express()
const server = createServer(app)
const peer = PeerServer({ path: '/myapp', port: 9000,  })

const io = new Server(server, {
    cors: { origin: 'http://localhost:5173', credentials: true },
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

io.on('connection', socket => {
    socket.on('offer', (offer, targetId) => {
        socket.to(targetId).emit('offer', offer, socket.id)
    })

    socket.on('answer', (answer, targetId) => {
        socket.to(targetId).emit('answer', answer)
    })

    socket.on('ice-candidate', (candidate, targetId) => {
        socket.to(targetId).emit('ice-candidate', candidate)
    })
})

server.listen(4000, () => console.log("Server started..."))