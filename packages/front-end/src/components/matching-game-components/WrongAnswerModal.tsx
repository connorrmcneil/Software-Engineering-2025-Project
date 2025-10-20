/**
 * Allows for a second attempt at a word before revealing the answer and restarting the game.
 *
 * Author(s):
 * Wenda Tan
 * (Assisted with ChatGPT)
 */
import {Button, Modal, Stack, Text} from '@mantine/core'

interface WrongAnswerModalProps {
  opened: boolean
  firstAttempt: boolean
  correctWord?: string
  translation?: string
  onTryAgain: () => void
  onRestart: () => void
}

export function WrongAnswerModal({
  opened,
  firstAttempt,
  correctWord,
  translation,
  onTryAgain,
  onRestart
}: WrongAnswerModalProps) {
  return (
    <Modal opened={opened} onClose={firstAttempt ? onTryAgain : onRestart} centered radius="lg">
      <Stack align="center" gap="md">
        {firstAttempt ? (
          <>
            <Text size="lg" fw={500}>
              That’s not the right word!
            </Text>
            <Text size="sm" c="dimmed">
              Try again.
            </Text>
            <Button color="blue" onClick={onTryAgain}>
              Okay
            </Button>
          </>
        ) : (
          <>
            <Text size="lg" fw={500}>
              Incorrect again!
            </Text>
            <Text size="sm" ta="center">
              The correct word was <b>{correctWord}</b>
              <br />
              {translation || 'No translation available yet.'}
            </Text>
            <Button color="red" onClick={onRestart}>
              Start a new game
            </Button>
          </>
        )}
      </Stack>
    </Modal>
  )
}
