import { Box, Group } from '@mantine/core'
import React from 'react'

interface BeadDisplayProps {
  successCount: number
}

export const BeadDisplay: React.FC<BeadDisplayProps> = ({ successCount }) => {
  return (
    <Group gap="xs" justify="center">
      {Array(successCount)
        .fill(null)
        .map((_, index) => (
          <Box
            key={index}
            style={{
              width: 28,
              height: 28,
              backgroundColor: '#b5651d', // warm bead-like brown tone
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(0,0,0,0.3) inset, 0 0 6px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}
          />
        ))}
    </Group>
  )
}
