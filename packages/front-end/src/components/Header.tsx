
import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/styles/HeaderStyle.module.css';
import { Link, useLocation } from 'react-router';
import { Dictionary } from './Dictionary';
const links = [
  { link: '/', label: 'Home' },
  { link: '/matching-game', label: 'Word Game' },
  { link: '/eskasoni-island-game', label: 'Goat Island Game' },
  { link: '/admin', label: 'Admin' },
];


export function Header() {
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={location.pathname === link.link || undefined}
    >
      {link.label}
    </Link>
  ));
  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        <Group gap={7} visibleFrom="xs">
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        <Dictionary />
      </Container>
    </header>
  );
}