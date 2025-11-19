import {Group} from '@mantine/core'

const beadStyle = {
  width: 28,
  height: 28,
  backgroundColor: '#b5651d',
  borderRadius: '50%',
  boxShadow: '0 0 4px rgba(0,0,0,0.3) inset, 0 0 6px rgba(0,0,0,0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 'bold'
}

export function ScoreBeads({score}: {score: number}) {
  const beads = Array(score)
    .fill(null)
    .map((_, index) => <div key={index} style={beadStyle} />)

  return (
    <Group gap="xs" justify="center">
      {beads}
    </Group>
  )
}
