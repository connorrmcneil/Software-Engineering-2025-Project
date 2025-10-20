import {Burger, Container, Group} from '@mantine/core'
import {useDisclosure} from '@mantine/hooks'
import {useState} from 'react'
import {Link} from 'react-router-dom'

import TerryBot from '@/assets/images/characters/TerryBot.jpg'
import classes from '@/styles/HeaderSimple.module.css'

const links = [
  {link: '/', label: 'Home'},
  {link: '/game1', label: 'Game 1'},
  {link: '/game2', label: 'Game 2'},
  {link: '/matching-game', label: 'Word Match'},
  {link: '/dictionary', label: 'Dictionary'},
  {link: '/admin/signin', label: 'Admin'}
]

export function HeaderSimple() {
  const [opened, {toggle}] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)

  const items = links.map(link => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => setActive(link.link)}
    >
      {link.label}
    </Link>
  ))

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <img
          src={TerryBot}
          alt="centered-icon"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  )
}
