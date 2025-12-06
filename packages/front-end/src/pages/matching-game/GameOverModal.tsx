/**
 * Game Over {old, no longer used, replaced with GameEndPopup.tsx}
 *
 * A modal dialog displayed when the user completes a game session.
 * It shows the final score (visualized as beads) and provides a button to restart.
 *
 * Author:
 * - Wenda Tan
 */

import {Button, Group, Modal, Stack, Text} from '@mantine/core'

import {ScoreBeads} from './ScoreBeads'

type GameOverModalProps = {
  opened: boolean // Controls whether the modal is visible
  score: number // Final score to display
  onNewGame: () => void // Callback function to reset the game state and start over
}

/**
 * Component: GameOverModal
 */
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
      withCloseButton={false} // Hide the 'X' button to force the user to use the "Play Again" button
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
