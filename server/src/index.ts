import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import passp from './config/passport'
import { db } from './config/database'
import { join } from 'path'
import { Server } from 'socket.io'

import postRouter from './routes/post.router'
import commentRouter from './routes/comment.router'
import userRouter from './routes/user.router'
import chatRouter from './routes/chat.router'
import authRouter from './routes/auth.router'
import socket from './config/socket'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: 'http://localhost:5173'
  }
})

passp(app)
socket(io)

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  .use('/files', express.static(join(__dirname, '../', 'upload')))
  .use('/api/auth', authRouter)
  .use('/api/posts', postRouter)
  .use('/api/comments', commentRouter)
  .use('/api/users', userRouter)
  .use('/api/chats', chatRouter)

server.listen(4000, () => {
  console.log("Server started...")
  db()
})