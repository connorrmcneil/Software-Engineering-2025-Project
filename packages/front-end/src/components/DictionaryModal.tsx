import {Button, Modal, SimpleGrid} from '@mantine/core'
import {useDisclosure} from '@mantine/hooks'

import TerryBot from '@/assets/images/characters/TerryBot.jpg'

export function DictionaryModal() {
  const [opened, {open, close}] = useDisclosure(false)

  const content = Array(100)
    .fill(0)
    .map((_, index) => (
      <p key={index}>
        <SimpleGrid cols={4} spacing="lg" verticalSpacing="lg">
          <Button
            variant="light"
            p={0}
            style={{
              width: 256,
              height: 256,
              minWidth: 256,
              minHeight: 256,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              src={TerryBot}
              alt="centered-icon"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4
              }}
            />
          </Button>
          <Button
            variant="light"
            p={0}
            style={{
              width: 256,
              height: 256,
              minWidth: 256,
              minHeight: 256,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              src={TerryBot}
              alt="centered-icon"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4
              }}
            />
          </Button>
          <Button
            variant="light"
            p={0}
            style={{
              width: 256,
              height: 256,
              minWidth: 256,
              minHeight: 256,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              src={TerryBot}
              alt="centered-icon"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4
              }}
            />
          </Button>
          <Button
            variant="light"
            p={0}
            style={{
              width: 256,
              height: 256,
              minWidth: 256,
              minHeight: 256,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              src={TerryBot}
              alt="centered-icon"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4
              }}
            />
          </Button>
        </SimpleGrid>
      </p>
    ))

  return (
    <>
      <Modal opened={opened} onClose={close} title="mi'kmaq Dictionary" size="80%">
        {content}
      </Modal>

      <Button variant="default" onClick={open}>
        Open Dictionary
      </Button>
    </>
  )
}
