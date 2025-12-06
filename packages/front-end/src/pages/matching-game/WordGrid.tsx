/**
 * Word Grid Display Component
 *
 * Description: Renders a 3x3 grid of interactive images within a specific
 * background container. This serves as the main game board where users
 * select images to match the current word.
 *
 * Author: Wenda Tan
 */

import type {Word} from '@/types'

import {AspectRatio, BackgroundImage, Box, SimpleGrid} from '@mantine/core'

import gridImage from '@/assets/images/items/Grid.png'
import placeholderImage from '@/assets/images/items/Random.jpg'
import {toStorageUrl} from '@/utils'

interface WordGridProps {
  /** Array of Word objects to display. Null entries represent empty slots. */
  words: (Word | null)[]
  /** Callback function when a valid image is clicked. Returns the image path. */
  handleSelection: (selectedImage: string) => void
}

/**
 * Component: WordGrid
 * The main container that layers the interactive items on top of the 'shelf' background.
 */
export function WordGrid({words, handleSelection}: WordGridProps) {
  // 1. Map Data to Components
  // Converts the data array into renderable Panels or Placeholders
  const panels = words.map((word, index) => {
    if (word) {
      return <WordPanel key={index} word={word} onClick={() => handleSelection(word.imagePath)} />
    } else {
      return <WordPanelPlaceholder key={index} />
    }
  })

  // 2. Render Layout
  return (
    <Box w="100%" maw={550} mx="auto">
      <AspectRatio ratio={1}>
        <BackgroundImage src={gridImage} pos="relative" w="100%" h="100%" p={{base: 20, xs: 30, md: 33}}>
          <Box w="100%" h="100%" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <SimpleGrid cols={3} w="100%" spacing={{base: 'md', sm: 'xl', md: 30}}>
              {panels}
            </SimpleGrid>
          </Box>
        </BackgroundImage>
      </AspectRatio>
    </Box>
  )
}

// --- Styles ---

/** * Shared styles for both active panels and placeholders
 * to ensure consistent alignment.
 */
const panelStyle: React.CSSProperties = {
  width: '100%',
  aspectRatio: '1',
  objectFit: 'contain',
  borderRadius: 12,
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out'
}

/**
 * Renders a clickable game piece (Animal/Item).
 * Handles the hover zoom effect.
 */
function WordPanel({word, onClick}: {word: Word; onClick: () => void}) {
  return (
    <Box
      component="img"
      src={toStorageUrl(word.imagePath)}
      alt={word.mikmaq}
      onClick={onClick}
      style={panelStyle}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.5)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.2)')}
    />
  )
}

/**
 * Renders a placeholder for empty slots or loading states.
 * Non-interactive.
 */
function WordPanelPlaceholder() {
  return (
    <Box
      component="img"
      src={placeholderImage}
      alt="Placeholder"
      style={{...panelStyle, cursor: 'not-allowed', opacity: 0.6}}
    />
  )
}
