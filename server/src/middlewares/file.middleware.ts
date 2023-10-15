import multer from 'multer'
import { v4 as uuid } from 'uuid'
import { join, extname } from 'path'

const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, join(__dirname, '../', '../', 'uploaded')),
    filename: (_, file, cb) => cb(null, `f-${uuid()}${extname(file.originalname)}`)
})

export const localeUpload = multer({ storage })