/**
 * Playing audio for word
 * 
 */
import { Button, Group, Text } from '@mantine/core'

interface WordControlsProps {
  displayText: string
  roundDisplay: string
  playAudio: () => void
}

export function WordControls({ displayText, roundDisplay, playAudio }: WordControlsProps) {
  return (
    <Group gap="lg" align="center">
      <Button
        onClick={playAudio}
        size="lg"
        color="blue"
      >
        Play Audio
      </Button>
      <Text size="xl" fw={700}>
        {displayText}
      </Text>
      <Text size="lg" fw={600}>
        {roundDisplay}
      </Text>
    </Group>
  )
}
