import {hash} from 'bcrypt'

import {PrismaClient} from '../src/prisma/client'

const defaultUser = {
  username: 'admin',
  name: 'Admin User',
  password: await hash('admin', 10)
}

async function main() {
  const prisma = new PrismaClient()

  await prisma.user.deleteMany()
  await prisma.user.create({data: defaultUser})

  const newUser = await prisma.user.findUnique({where: {username: 'admin'}})
  console.log('Added user into the database:')
  console.log(JSON.stringify(newUser, null, 2))
}

main()
