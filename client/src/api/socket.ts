import { io } from 'socket.io-client'
import { uri } from './index'
import { IMessage } from '../interfaces'

const socket = io(uri)

export const joinchat = (id: string) => socket.emit('join-chat', id)

export const sendmessage = (message: IMessage) => socket.emit('send-message', message)

export const getmessage = (cb: any) => socket.on('get-message', message => cb(message))
