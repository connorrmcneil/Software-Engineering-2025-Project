import { Anchor, Container, Group } from '@mantine/core';
import classes from '@/components/styles/FooterSimple.module.css';
import TerryBot from '@/assets/images/characters/TerryBot.jpg'
const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
];

export function FooterSimple() {
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
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}