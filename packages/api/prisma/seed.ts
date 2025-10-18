import {hash} from 'bcrypt'

import {PrismaClient} from '../src/prisma/client'

const words = [
  {mikmaq: "Wela'lin", english: 'Thank you'},
  {mikmaq: "Kwe'", english: 'Hello'},
  {mikmaq: "Pjila'si", english: 'Welcome'},
  {mikmaq: 'Apiksik', english: 'Goodbye'},
  {mikmaq: 'Nmu', english: 'Yes'},
  {mikmaq: 'Wjit', english: 'No'}
]

const defaultUser = {
  username: 'admin',
  firstName: 'Jamieson',
  lastName: 'McNeil',
  password: await hash('NotSecurePassword123!', 10)
}

async function main() {
  const prisma = new PrismaClient()

  await prisma.word.deleteMany()
  await prisma.word.createMany({data: words})

  const newWords = await prisma.word.findMany()
  console.log('Added words into the database:')
  console.log(JSON.stringify(newWords, null, 2))

  await prisma.user.deleteMany()
  await prisma.user.create({data: defaultUser})

  const newUser = await prisma.user.findUnique({where: {username: 'admin'}})
  console.log('Added user into the database:')
  console.log(JSON.stringify(newUser, null, 2))
}

main()
