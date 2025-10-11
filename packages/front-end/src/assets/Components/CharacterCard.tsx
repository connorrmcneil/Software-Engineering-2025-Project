import { Card, Image, Text, Button, Group, Center } from '@mantine/core';
import CharacterPlaceholder from '@/assets/Images/Characters/CharacterPlaceholder.png';

export function CharacterCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Center> 
          <Image
            src={CharacterPlaceholder}
            height="2in"
            width="auto"
            alt="Character"
          />
        </Center>
      </Card.Section>

      <Group mt="md" mb="xs">
        <Text fw={500}>Character #</Text>
      </Group>

      <Button color="blue" fullWidth mt="md" radius="md">
        Choose Character #
      </Button>
    </Card>
  );
}