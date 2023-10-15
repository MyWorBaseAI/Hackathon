import { connect, set, ConnectOptions } from 'mongoose'
import { mongoUri } from './keys'

set('strictQuery', true)

export const db = async () => connect(mongoUri!, { usenewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
    .then(() => console.log('Database Connected...'))
    .catch((err) => console.log('Database Error', err))