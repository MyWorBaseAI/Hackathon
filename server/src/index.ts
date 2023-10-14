import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { PeerServer } from 'peer'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173', credentials: true },
})

PeerServer({ path: '/peerjs', port: 9000, })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

io.on('connection', socket => {
  socket.emit("me", socket.id);
  
  socket.on('call-user', (data) => {
    const { receiverId, senderId } = data;
    socket.to(receiverId).emit('incoming-call', { senderId });
  });

  socket.on('answer-call', (data) => {
    const { callerId, answer } = data;
    socket.to(callerId).emit('call-answered', { answer });
  });

  socket.on('toggle-audio', (data) => {
    const { userId, audioEnabled } = data;
    socket.to(userId).emit('audio-toggled', { audioEnabled });
  });

  socket.on('toggle-video', (data) => {
    const { userId, videoEnabled } = data;
    socket.to(userId).emit('video-toggled', { videoEnabled });
  });

  socket.on('end-call', (data) => {
    const { userId } = data;
    socket.to(userId).emit('call-ended');
  });
})

server.listen(4000, () => console.log("Server started..."))