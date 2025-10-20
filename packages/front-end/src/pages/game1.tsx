import {Button, Group} from '@mantine/core'
import {useState} from 'react'


import {CharacterCard} from '@/components'

export function Game1() {
  const [showSelection, setShowSelection] = useState(false)
  return (
    <>
      <div>Game1's page!</div>
      <Button mt="md" radius="md" onClick={() => setShowSelection(true)}>
        Play (invokes character selection)
      </Button>
      {showSelection && (
        <Group>
          <CharacterCard />
          <CharacterCard />
          <CharacterCard />
        </Group>
      )}
    </>
  )
}
