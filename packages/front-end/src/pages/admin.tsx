import {Button} from '@mantine/core'
import {useLoaderData, useRevalidator} from 'react-router'

import {authLoader} from '@/router/auth.loader'

export function AdminPage() {
  const {user} = useLoaderData<typeof authLoader>()

  const {revalidate} = useRevalidator()

  const signOut = async () => {
    localStorage.removeItem('AuthToken')
    await revalidate()
  }

  return (
    <div>
      Hello, {user.firstName} {user.lastName}!
      <Button onClick={signOut} variant="default">
        Sign Out
      </Button>
    </div>
  )
}
