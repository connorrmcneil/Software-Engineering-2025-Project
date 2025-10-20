/**
 * Temporary home page, just used for quick links to other pages atm.
 * - Wenda
 */
import {Button, Text} from '@mantine/core'
import {Link} from 'react-router'

export function HomePage() {
  return <>

  <Text>Home Page!</Text>
  <Text>Quick links to our pages just for testing</Text>

      <Button component={Link} to="/admin/signin" radius="lg" size="lg">
        sign in
      </Button>

      <Button component={Link} to="/game1" radius="lg" size="lg">
        game1
      </Button>

      <Button component={Link} to="/game2" radius="lg" size="lg">
        game2
      </Button>

      <Button component={Link} to="/matching-game" radius="lg" size="lg">
        Word Match
      </Button>

      <Button component={Link} to="/dictionary" radius="lg" size="lg">
        Dictionary
      </Button>

      <Button component={Link} to="/admin" radius="lg" size="lg">
        Admin
      </Button>
    </>
  )
}
