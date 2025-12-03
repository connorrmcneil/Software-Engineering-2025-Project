/**
 * Allows for a second attempt at a word before revealing the answer a
 * nd restarting the game.
 *
 * Author(s):
 * Wenda Tan
 */
import {Button, Image, Modal, Stack, Text} from '@mantine/core'

import {toStorageUrl} from '@/utils'

interface WrongAnswerModalProps {
  opened: boolean
  firstAttempt: boolean
  correctWord?: string
  correctImage?: string
  translation?: string
  onTryAgain: () => void
  onRestart: () => void
}

export function WrongAnswerModal({
  opened,
  firstAttempt,
  correctWord,
  correctImage,
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
              That's not the right word!
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
            <Text size="lg" fw={500} c="green">
              Incorrect again!
            </Text>

            {correctImage && (
              <Image
                src={toStorageUrl(correctImage)}
                alt={correctWord}
                w={150}
                h={150}
                fit="contain"
                radius="md"
                style={{border: '1px solid #eee'}}
              />
            )}

            <Text size="sm" ta="center">
              The correct word was <b>{correctWord}</b>
              <br />
              <Text span c="dimmed" size="xs">
                {translation || 'No translation available yet.'}
              </Text>
            </Text>

            <Button color="green" fullWidth onClick={onRestart}>
              Start a new game
            </Button>
          </>
        )}
      </Stack>
    </Modal>
  )
}
