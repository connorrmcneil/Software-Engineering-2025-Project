import { Button, Container, Group, Image, List, Text, Title } from '@mantine/core';
import { useMemo } from 'react';
import { Link } from 'react-router';

import character1Dance from '@/assets/images/characters/character1-dance.png';
import character2Dance from '@/assets/images/characters/character2-dance.png';
import classes from './HeroBullets.module.css';

export function HeroBullets() {
  // Randomly selects character 1 or 2 to be shown on the landing page
  const randomCharacter = useMemo(() => {
    return Math.random() > 0.5 ? character1Dance : character2Dance;
  }, []);

  return (
    <Container size="xl">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Kekina’muek <span className={classes.highlight}>Miꞌkmawiꞌsimk</span>
          </Title>
          <Text c="dimmed" mt="md">
            Learning the Mi'kmaw language
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
          >
            <List.Item>
              <b>Matching</b> – learners match words to pictures
            </List.Item>
            <List.Item>
              <b>Conversational words and animals</b> – learn conversational words and animals
            </List.Item>
            <List.Item>
              <b>Teacher access</b> – teachers can add new words
            </List.Item>
          </List>

          <Group mt={30}>
            <Button component={Link} to="/matching-game" radius="xl" size="md" className={classes.control}>
              Play
            </Button>
            <Button component={Link} to="/dictionary" variant="default" radius="xl" size="md" className={classes.control}>
              Dictionary
            </Button>
          </Group>
        </div>
        <Image src={randomCharacter} className={classes.image} />
      </div>
    </Container>
  );
}