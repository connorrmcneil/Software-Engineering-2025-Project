import { Anchor, Container, Group } from '@mantine/core';
import classes from '@/styles/FooterStyle.module.css';
const links = [
  {link: '/faq', label: 'FAQ'},
  {link: '/privacypolicy', label: 'Privacy'}
]

export function Footer() {
    const items = links.map((link) => (
      <Anchor<'a'>
        c="dimmed"
        key={link.label}
        href={link.link}
        onClick={(event) => event.preventDefault()}
        size="sm"
      >
        {link.label}
      </Anchor>
    ));
  
    return (
      <div className={classes.footer}>
        <Container className={classes.inner}>
            <Group className={classes.angie}>
                <span>Mikwite'tmk+t Angie</span>
            </Group>
            <Group className={classes.links}>{items}</Group>
        </Container>
      </div>
    );
  }
