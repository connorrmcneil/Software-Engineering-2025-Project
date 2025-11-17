/**
 * When the game is over, show the number of beads and allow user to play again.
 * Temporary page, will reaplce with ConnorG's once it's completed
 *
 * Author(s):
 * Wenda Tan
 * ChatGPT
 */

import {Button, Group, Modal, Stack, Text} from '@mantine/core'

import {ScoreBeads} from './ScoreBeads'

type GameOverModalProps = {
  opened: boolean
  score: number
  onNewGame: () => void
}

export function GameOverModal({opened, score, onNewGame}: GameOverModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={() => {}}
      title={
        <Text size="xl" fw={700} ta="center" w="100%">
          Kelulktelatekn
        </Text>
      }
      centered
      withCloseButton={false}
    >
      <Stack gap="lg">
        <ScoreBeads score={score} />
        <Group justify="flex-end">
          <Button color="blue" onClick={onNewGame}>
            Si'owa'si?
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
