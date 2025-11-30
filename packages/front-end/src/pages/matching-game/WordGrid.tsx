import type { Word } from '@/types'
import { BackgroundImage, Box, SimpleGrid, AspectRatio } from '@mantine/core'
import placeholderImage from '@/assets/images/characters/placeholder.png'
import gridImage from '@/assets/images/items/Grid.png'
import { toStorageUrl } from '@/utils'

interface WordGridProps {
  words: (Word | null)[]
  handleSelection: (selectedImage: string) => void
}

export function WordGrid({ words, handleSelection }: WordGridProps) {
  const panels = words.map((word, index) => {
    if (word) {
      return (
        <WordPanel
          key={index}
          word={word}
          onClick={() => handleSelection(word.imagePath)}
        />
      )
    } else {
      return <WordPanelPlaceholder key={index} />
    }
  })

  return (
    <Box w="100%" maw={550} mx="auto">
      <AspectRatio ratio={1}>
        <BackgroundImage
          src={gridImage}
          pos="relative"
          w="100%"
          h="100%"
          p={{ base: 20, xs: 30, md: 33 }} 
        >
          <Box
            w="100%"
            h="100%"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <SimpleGrid
              cols={3}
              w="100%"
              spacing={{ base: 'md', sm: 'xl', md: 30 }}
            >
              {panels}
            </SimpleGrid>
          </Box>
        </BackgroundImage>
      </AspectRatio>
    </Box>
  )
}
const panelStyle: React.CSSProperties = {
  width: '100%',
  aspectRatio: '1',
  objectFit: 'contain', 
  borderRadius: 12,    
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
}

function WordPanel({ word, onClick }: { word: Word; onClick: () => void }) {
  return (
    <Box
      component="img"
      src={toStorageUrl(word.imagePath)}
      alt={word.mikmaq}
      onClick={onClick}
      style={panelStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.5)')} 
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
    />
  )
}

function WordPanelPlaceholder() {
  return (
    <Box
      component="img"
      src={placeholderImage}
      alt="Placeholder"
      style={{ ...panelStyle, cursor: 'not-allowed', opacity: 0.6 }}
    />
  )
}