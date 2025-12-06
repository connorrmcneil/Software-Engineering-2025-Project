/**
 * Visual Score Counter (Beads)
 *
 * Renders the player's current score as a string of physical-looking
 * wooden beads. This provides a visual, non-numeric representation of progress,
 * fitting the cultural/island theme.
 *
 * Author: Wenda Tan
 */
import {Group} from '@mantine/core'

/** * CSS object to create a realistic "Wooden Bead" look. (It's kind of just a brown dot at the moment.)
 * - Uses 50% border-radius for a perfect circle.
 * - Uses inset box-shadow to create depth/curvature (3D effect).
 * - '#b5651d' is a Light Brown / Golden Rod color.
 */
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
  // 1. Generate Bead Elements
  // Create an array of length 'score', fill it with nulls (to make it iterable),
  // and map each entry to a bead div.
  const beads = Array(score)
    .fill(null)
    .map((_, index) => <div key={index} style={beadStyle} />)

  return (
    <Group gap="xs" justify="center">
      {beads}
    </Group>
  )
}
