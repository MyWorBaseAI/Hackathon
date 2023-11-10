import { Socket } from 'socket.io'
import { v4 as uuid } from 'uuid'

export default (socket: Socket) => {
    const sessionId = uuid()

    // socket.on('message', (ms: any) => {
    //     switch(ms.id)
    // })
}