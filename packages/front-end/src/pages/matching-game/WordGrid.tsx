/**
 * Main game board
 *
 * Author(s):
 * Wenda Tan
 */
import type {Word} from '@/types'

import {BackgroundImage, Box, Grid} from '@mantine/core'

import placeholderImage from '@/assets/images/characters/placeholder.png'
import gridImage from '@/assets/images/items/Grid.png'
import {toStorageUrl} from '@/utils'

interface WordGridProps {
  words: (Word | null)[]
  handleSelection: (selectedImage: string) => void
}

export function WordGrid({words, handleSelection}: WordGridProps) {
  const panels = words.map((word, index) => {
    if (word) {
      return <WordPanel key={index} word={word} onClick={() => handleSelection(word.imagePath)} />
    } else {
      return <WordPanelPlaceholder key={index} />
    }
  })

  return (
    <BackgroundImage src={gridImage} pos="relative" w="100%">
      <Box p="xl">
        <Grid gutter="md" columns={3}>
          {panels}
        </Grid>
      </Box>
    </BackgroundImage>
  )
}

const panelStyle = {
  width: '100%',
  aspectRatio: '1',
  objectFit: 'cover',
  borderRadius: 8,
  cursor: 'pointer',
  transition: 'transform 0.2s'
} as React.CSSProperties

function WordPanel({word, onClick}: {word: Word; onClick: () => void}) {
  return (
    <Grid.Col span={1}>
      <Box
        component="img"
        src={toStorageUrl(word.imagePath)}
        alt={word.mikmaq}
        onClick={onClick}
        style={panelStyle}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      />
    </Grid.Col>
  )
}

function WordPanelPlaceholder() {
  return (
    <Grid.Col span={1}>
      <Box component="img" src={placeholderImage} alt="Placeholder" style={{...panelStyle, cursor: 'not-allowed'}} />
    </Grid.Col>
  )
}
