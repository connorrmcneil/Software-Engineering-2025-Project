//clickable buttons with popups, search and audio

import {Button, Image, Modal, Paper, ScrollArea, SimpleGrid, Stack, Text, TextInput} from '@mantine/core'
import {useDisclosure} from '@mantine/hooks'
import {useState} from 'react'

// Replace with your own image and audio assets
import sampleAudio from '@/assets/audio/matching-game-audio/congratulatory.mp3'
import TerryBot from '@/assets/images/characters/TerryBot.jpg'

// 1. Define type for dictionary entry
type DictionaryItem = {
  id: number
  english: string
  mikmaq: string
  image: string
  audio: string
}

export function DictionaryModal() {
  // 2. Modal state for dictionary and word detail
  const [opened, {open, close}] = useDisclosure(false)
  const [detailOpened, {open: openDetail, close: closeDetail}] = useDisclosure(false)

  // 3. Selected word to show in detail modal
  const [selectedItem, setSelectedItem] = useState<DictionaryItem | null>(null)

  // 4. Search input state
  const [searchQuery, setSearchQuery] = useState('')

  // 5. Sample dataset (with audio)
  const items: DictionaryItem[] = Array.from({length: 100}, (_, index) => ({
    id: index,
    english: `Word ${index + 1}`,
    mikmaq: `Mi'kmaq ${index + 1}`,
    image: TerryBot,
    audio: sampleAudio
  }))

  // 6. Filter by search input
  const filteredItems = items.filter(item => item.english.toLowerCase().includes(searchQuery.toLowerCase()))

  // 7. Handle word click
  const handleWordClick = (item: DictionaryItem) => {
    setSelectedItem(item)
    openDetail()
  }

  return (
    <>
      {/* 8. Button to open the dictionary */}
      <Button variant="default" onClick={open}>
        Open Dictionary
      </Button>

      {/* 9. Main Dictionary Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="mi'kmaq Dictionary"
        size="80%"
        centered
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Stack>
          {/* 10. Search Bar */}
          <TextInput
            placeholder="Search English words..."
            value={searchQuery}
            onChange={event => setSearchQuery(event.currentTarget.value)}
            aria-label="Search dictionary"
          />

          {/* 11. Responsive Grid */}
          <SimpleGrid
            cols={4}
            spacing="lg"
            verticalSpacing="lg"
            breakpoints={[
              {maxWidth: 'md', cols: 3},
              {maxWidth: 'sm', cols: 2},
              {maxWidth: 'xs', cols: 1}
            ]}
          >
            {filteredItems.map(item => (
              <Button
                key={item.id}
                p={0}
                variant="light"
                onClick={() => handleWordClick(item)}
                style={{
                  padding: 0,
                  height: 'auto',
                  textAlign: 'left',
                  display: 'block'
                }}
              >
                <Paper withBorder shadow="sm" radius="md" style={{overflow: 'hidden'}}>
                  <Image src={item.image} alt={item.english} height={160} fit="cover" withPlaceholder />
                  <Stack spacing={4} p="sm">
                    <Text fw={600}>{item.english}</Text>
                  </Stack>
                </Paper>
              </Button>
            ))}
          </SimpleGrid>
        </Stack>
      </Modal>

      {/* 12. Word Detail Modal */}
      <Modal opened={detailOpened} onClose={closeDetail} title={selectedItem?.english} centered size="md">
        {selectedItem && (
          <Stack spacing="md">
            {/* 13. Word Image */}
            <Image src={selectedItem.image} alt={selectedItem.english} radius="md" w="100%" h="100%" fit="cover" />

            {/* 14. Word Info */}
            <Text fw={700} size="lg">
              English: {selectedItem.english}
            </Text>
            <Text fw={500} size="md" c="dimmed">
              Mi'kmaq: {selectedItem.mikmaq}
            </Text>

            {/* 15. Audio Player */}
            <Button
              onClick={() => {
                const audio = new Audio(selectedItem.audio)
                audio.play()
              }}
              variant="light"
              radius="md"
              fullWidth
            >
              🔊 Play Pronunciation
            </Button>
          </Stack>
        )}
      </Modal>
    </>
  )
}
