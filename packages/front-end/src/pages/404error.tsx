import { Button, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

export function ErrorPage() {
  return (
    <>
      <Text>You've reached a part of the website that doesn't exist!</Text>
      <Text>Click this button to go back:</Text>

      <Button component={Link} to="/" color="blue" radius="lg" size="lg">
        Return Home
      </Button>
    </>
  )
}
