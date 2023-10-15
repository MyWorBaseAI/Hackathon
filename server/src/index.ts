import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import passp from './config/passport'
import { db } from './config/database'
import { join } from 'path'

import postRouter from './routes/post.router'
import commentRouter from './routes/comment.router'

const app = express()
const server = createServer(app)

passp(app)

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  .use('/files', express.static(join(__dirname, '../', 'upload')))
  .use('/posts', postRouter)
  .use('/comments', commentRouter)

server.listen(4000, () => {
  console.log("Server started...")
  db()
})