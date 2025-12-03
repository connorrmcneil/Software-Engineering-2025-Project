import { Link } from 'react-router';
import { Anchor, Container, Group } from '@mantine/core';
import classes from '@/styles/FooterStyle.module.css';

const links = [
  { link: '/faq', label: 'FAQ' },
  { link: '/privacypolicy', label: 'Privacy' },
];

export function Footer() {
    return (
      <>
      <div>Mikwite'tmk+t Angie</div>
        {links.map((link) => (
          <Anchor
            component={Link}
            to={link.link}
            c="dimmed"
            key={link.label}
            size="s"
          >
            {link.label}
          </Anchor>
        ))}
  
        
      </>
    );
  }
