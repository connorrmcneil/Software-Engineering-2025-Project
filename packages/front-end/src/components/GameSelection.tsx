/**
 * Letting user select between different games via a modal dialog.
 * 
 * Authors: Wenda Tan
 */

import { 
  Modal, 
  SimpleGrid, 
  Paper, 
  Stack, 
  ThemeIcon, 
  Text, 
  Button 
} from '@mantine/core'
import { Link } from 'react-router'
import wordmatchimg from '@/assets/images/items/MatchingGameDemo.png'
import islandimg from '@/assets/images/items/IslandGameDemo.png'

interface GameSelectionModalProps {
  opened: boolean
  onClose: () => void
}

export function GameSelectionModal({ opened, onClose }: GameSelectionModalProps) {
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={<Text fw={700} size="lg">Choose a Game</Text>}
      centered
      size="lg"
      radius="lg"
    >
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        
        {/* Word Matching Game */}
        <GameOptionCard 
          to="/matching-game" 
          title="PLACEHOLDER [WORD MATCH]" 
          description="Word Match"
          color="blue"
          icon={<img src={wordmatchimg} alt="Word Match Game" style={{ width: '70%', height: '70%' }} />}
        />

        {/* Island Game */}
        <GameOptionCard 
          to="/eskasoni-island-game" 
          title="PLACEHOLDER [GOAT ISLAND]" 
          description="Explore Goat Island"
          color="green"
          icon={<img src={islandimg} alt="Island Game" style={{ width: '70%', height: '70%' }} />}
        />

      </SimpleGrid>
    </Modal>
  )
}

// --- GAME CARD MOVEMENT: Made with Google Gemini ---
interface GameOptionCardProps {
  to: string
  title: string
  description: string
  color: string
  icon: React.ReactNode
}

function GameOptionCard({ to, title, description, color, icon }: GameOptionCardProps) {
  return (
    <Paper 
      component={Link} 
      to={to} 
      withBorder 
      p="xl" 
      radius="md" 
      style={{ 
        textDecoration: 'none', 
        color: 'inherit',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(5px)'
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'
        e.currentTarget.style.borderColor = `var(--mantine-color-${color}-5)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'var(--mantine-color-gray-3)'
      }}
    >
      <Stack align="center" gap="md">
        <ThemeIcon 
          size={60} 
          radius={60} 
          variant="light" 
          color={color}
        >
          {icon}
        </ThemeIcon>
        
        <Stack gap={2} align="center">
          <Text fw={700} size="lg">{title}</Text>
          <Text size="sm" c="dimmed" ta="center" lh={1.9}>
            {description}
          </Text>
        </Stack>

        <Button variant="light" color={color} fullWidth mt="sm">
          Start Game
        </Button>
      </Stack>
    </Paper>
  )
}