import {Anchor} from '@mantine/core'
import {Link} from 'react-router'

const links = [
  {link: '/faq', label: 'FAQ'},
  {link: '/privacypolicy', label: 'Privacy'}
]

export function Footer() {
  return (
    <>
      <div>Mikwite'tmk+t Angie</div>
      {links.map(link => (
        <Anchor component={Link} to={link.link} c="dimmed" key={link.label} size="s">
          {link.label}
        </Anchor>
      ))}
    </>
  )
}
