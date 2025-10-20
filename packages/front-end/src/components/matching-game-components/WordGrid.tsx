/**
 * Main game board
 *
 * Author(s):
 * Wenda Tan
 */
import {Box, Grid} from '@mantine/core'

interface WordInfo {
  text: string
  image: string
  audio: string
}

interface WordGridProps {
  boxes: WordInfo[]
  inactivePanel: string
  handleSelection: (selectedImage: string) => void
  gridImage: string
}

export function WordGrid({boxes, inactivePanel, handleSelection, gridImage}: WordGridProps) {
  return (
    <Box pos="relative" style={{maxWidth: 600, width: '100%'}}>
      {/* Grid Border Image */}
      <Box
        component="img"
        src={gridImage}
        alt="Grid Border"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
          objectFit: 'contain'
        }}
      />

      {/* Grid */}
      <Box p="xl">
        <Grid gutter="md" columns={3}>
          {boxes.map((box, index) => (
            <Grid.Col key={index} span={1}>
              <Box
                component="img"
                src={box.image}
                alt={box.text}
                onClick={() => {
                  if (box.image !== inactivePanel) handleSelection(box.image)
                }}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  objectFit: 'cover',
                  borderRadius: 8,
                  opacity: box.image === inactivePanel ? 0.5 : 1,
                  cursor: box.image === inactivePanel ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={e => {
                  if (box.image !== inactivePanel) e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
