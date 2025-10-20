import fs from 'fs'
import path from 'path'
import {Router} from 'express'
import multer from 'multer'
import {nanoid} from 'nanoid'

import {requireAuth} from '@/middleware/auth.middleware'
import {prisma} from '@/prisma'

export const words = Router()

words.get('/', async (_req, res) => {
  const words = await prisma.word.findMany()
  return res.json({words})
})

// Ensure the upload directory exists
fs.mkdirSync('public', {recursive: true})

// Configure multer to store everything in /public
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'public'),
  filename: (_req, file, cb) => cb(null, `${nanoid()}${path.extname(file.originalname)}`)
})

const upload = multer({storage}).fields([
  {name: 'image', maxCount: 1},
  {name: 'audio', maxCount: 1}
])

type Uploaded = {
  image?: Express.Multer.File[]
  audio?: Express.Multer.File[]
}

// this route requires an auth token to be present in the Authorization header
words.post('/', requireAuth, upload, async (req, res) => {
  const {mikmaq, english, startMonth} = req.body

  const files = req.files as Uploaded | undefined
  if (!files?.audio || !files?.image) {
    return res.status(400).json({error: 'Missing required uploaded files'})
  }

  const imagePath = files.image[0]?.filename || ''
  const audioPath = files.audio[0]?.filename || ''

  const newWord = await prisma.word.create({
    data: {mikmaq, english, startMonth, imagePath, audioPath, userId: req.user!}
  })
  return res.status(201).json(newWord)
})
