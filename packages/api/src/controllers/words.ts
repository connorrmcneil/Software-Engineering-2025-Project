import {Router} from 'express'

import {requireAuth} from '@/middleware/auth.middleware'
import {prisma} from '@/prisma'

export const words = Router()

words.get('/', async (_req, res) => {
  const words = await prisma.word.findMany()
  return res.json(words)
})

// this route requires an auth token to be present in the Authorization header
words.post('/', requireAuth, async (req, res) => {
  const {mikmaq, english} = req.body
  const newWord = await prisma.word.create({
    data: {mikmaq, english}
  })
  return res.status(201).json(newWord)
})
