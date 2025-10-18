/**
 * When the game is over, show the number of beads and allow user to play again.
 * Temporary page, will reaplce with ConnorG's once it's completed
 * 
 * Author(s):
 * Wenda Tan
 * ChatGPT
 */

import { Button, Group, Modal, Stack, Text } from '@mantine/core'

import { BeadDisplay } from './BeadDisplay'

interface GameOverModalProps {
  isGameEnd: boolean
  successCount: number
  onNewGame: () => void
}

export function GameOverModal({ isGameEnd, successCount, onNewGame }: GameOverModalProps) {
  return (
    <Modal
      opened={isGameEnd}
      onClose={() => {}}
      title={
        <Text size="xl" fw={700} ta="center" w="100%">
          kelulktelatekn
        </Text>
      }
      centered
      withCloseButton={false}
    >
      <Stack gap="lg">
        <BeadDisplay successCount={successCount} />
        <Group justify="flex-end">
          <Button color="blue" onClick={onNewGame}>
            si'owa'si?
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
