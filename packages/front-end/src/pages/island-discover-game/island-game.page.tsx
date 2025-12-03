/**
 * Goat Island Eskasoni Animal Game
 *
 * Author: Wenda Tan
 */

import {Box, Button, Container, Group, Image, Modal, SimpleGrid, Stack, Text, Title} from '@mantine/core'
import {useMemo, useRef, useState} from 'react'

// Import Character Images
import boyImg from '@/assets/images/island_game/boy.png'
import girlImg from '@/assets/images/island_game/girl.png'
import {ANIMALS, FINISH_MAP, GAME_LEVELS} from './island-data'

type CharacterType = 'boy' | 'girl' | null
type GameState = 'select-char' | 'playing' | 'victory'

const STORAGE_KEY = 'island_game_character'

export function IslandGamePage() {
  // 1. LOAD FROM STORAGE: Check if character exists immediately
  const [character, setCharacter] = useState<CharacterType>(() => {
    return (localStorage.getItem(STORAGE_KEY) as CharacterType) || null
  })

  // 2. SET INITIAL STATE: If character exists, skip selection screen
  const [gameState, setGameState] = useState<GameState>(() => {
    return localStorage.getItem(STORAGE_KEY) ? 'playing' : 'select-char'
  })

  const [currentLevelIdx, setCurrentLevelIdx] = useState(0)

  // Quiz State
  const [quizOpen, setQuizOpen] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [showGameOver, setShowGameOver] = useState(false)

  const mapRef = useRef<HTMLDivElement>(null)

  const currentLevel = GAME_LEVELS[currentLevelIdx]
  const isFinalLevel = currentLevelIdx >= GAME_LEVELS.length

  const quizOptions = useMemo(() => {
    if (isFinalLevel) return []
    const correct = currentLevel.targetAnimal
    const others = ANIMALS.filter(a => a.id !== correct.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
    return [correct, ...others].sort(() => Math.random() - 0.5)
  }, [currentLevelIdx, isFinalLevel, currentLevel])

  const handleCharacterSelect = (char: 'boy' | 'girl') => {
    // SAVE TO STORAGE
    localStorage.setItem(STORAGE_KEY, char)
    setCharacter(char)
    setGameState('playing')
  }

  const handleChangeCharacter = () => {
    localStorage.removeItem(STORAGE_KEY)
    setCharacter(null)
    setGameState('select-char')
    setCurrentLevelIdx(0)
    setWrongAttempts(0)
    setShowGameOver(false)
    setQuizOpen(false)
  }

  const handleOptionClick = (selectedId: string) => {
    if (selectedId === currentLevel.targetAnimal.id) {
      setQuizOpen(false)
      setWrongAttempts(0)
      if (currentLevelIdx + 1 >= GAME_LEVELS.length) {
        setGameState('victory')
      } else {
        setCurrentLevelIdx(prev => prev + 1)
      }
    } else {
      if (wrongAttempts === 0) {
        setWrongAttempts(1)
      } else {
        setQuizOpen(false)
        setShowGameOver(true)
      }
    }
  }

  const restartGame = () => {
    setCurrentLevelIdx(0)
    setWrongAttempts(0)
    setShowGameOver(false)
    setQuizOpen(false)
    setGameState('playing')
  }

  const handleMapClick = (e: React.MouseEvent) => {
    if (!mapRef.current) return
    const rect = mapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const xPercent = Math.round((x / rect.width) * 100)
    const yPercent = Math.round((y / rect.height) * 100)

    console.log(`COORDINATES FOR LEVEL ${currentLevelIdx}:`)
    console.log(`top: '${yPercent}%', left: '${xPercent}%'`)
  }

  if (gameState === 'select-char') {
    return (
      <Container py="sm" size="sm" mih="70dvh" style={{display: 'flex', alignItems: 'center'}}>
        <Stack align="center" gap="xl" w="100%">
          <Title order={1} ta="center">
            Choose Your Character
          </Title>
          <Group gap="xl" justify="center" style={{flexDirection: 'row'}}>
            <Stack
              align="center"
              onClick={() => handleCharacterSelect('boy')}
              style={{cursor: 'pointer', transition: 'transform 0.2s'}}
            >
              <Image src={boyImg} w={{base: 120, md: 180}} />
              <Button size="lg" fullWidth>
                Boy
              </Button>
            </Stack>
            <Stack
              align="center"
              onClick={() => handleCharacterSelect('girl')}
              style={{cursor: 'pointer', transition: 'transform 0.2s'}}
            >
              <Image src={girlImg} w={{base: 120, md: 180}} />
              <Button size="lg" fullWidth>
                Girl
              </Button>
            </Stack>
          </Group>
        </Stack>
      </Container>
    )
  }

  return (
    <Container fluid p={{base: 'xs', md: 'lg'}} mih="100dvh">
      {/* Top Bar with Change Character Button */}
      <Group justify="space-between" mb="sm">
        <Title order={4} c="dimmed">
          Level {currentLevelIdx + 1}
        </Title>
        <Button variant="subtle" size="xs" color="gray" onClick={handleChangeCharacter}>
          Change Character
        </Button>
      </Group>

      {/* GAME OVER MODAL */}
      <Modal opened={showGameOver} onClose={() => {}} withCloseButton={false} centered title="Oh no!">
        <Stack align="center">
          <Text c="green" fw={700} size="xl">
            Incorrect!
          </Text>
          <Text ta="center">The correct answer was:</Text>
          <Image src={currentLevel?.targetAnimal.image} w={120} fit="contain" />
          <Text fw={900} size="lg">
            {currentLevel?.targetAnimal.mikmaq}
          </Text>
          <Button fullWidth onClick={restartGame} color="green">
            Try Again
          </Button>
        </Stack>
      </Modal>

      <Modal
        opened={quizOpen}
        onClose={() => !wrongAttempts && setQuizOpen(false)}
        title={`Where is the ${currentLevel?.targetAnimal.mikmaq}?`}
        size="lg"
        centered
        styles={{content: {overflow: 'hidden'}}}
      >
        <Stack>
          {wrongAttempts === 1 && (
            <Text c="purple" ta="center" fw={700}>
              That is not correct. Try again!
            </Text>
          )}
          <SimpleGrid cols={{base: 1, sm: 3}}>
            {quizOptions.map(animal => (
              <Stack
                key={animal.id}
                align="center"
                onClick={() => handleOptionClick(animal.id)}
                p="xs"
                style={{
                  cursor: 'pointer',
                  border: '2px solid #eee',
                  borderRadius: 8,
                  transition: 'background 0.2s'
                }}
              >
                <Image src={animal.image} h={120} w="auto" fit="contain" />
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Modal>

      {/* MAP AREA */}
      <Box maw={1300} mx="auto">
        <Box
          ref={mapRef}
          onClick={handleMapClick}
          pos="relative"
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '4px solid white',
            cursor: 'crosshair'
          }}
        >
          <Image
            src={gameState === 'victory' ? FINISH_MAP : currentLevel.mapImage}
            w="100%"
            style={{display: 'block'}}
          />

          {gameState === 'victory' && (
            <Stack
              align="center"
              justify="center"
              pos="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bg="rgba(255,255,255,0.6)"
            >
              <Title order={1} c="green" style={{textShadow: '2px 2px white', fontSize: '3rem'}}>
                Kisu'lkw!
              </Title>
              <Group mt="md">
                {/* Option 1: Play same character again */}
                <Button size="xl" onClick={restartGame}>
                  Play Again
                </Button>
                {/* Option 2: Pick new character */}
                <Button size="xl" variant="outline" onClick={handleChangeCharacter}>
                  Pick Character
                </Button>
              </Group>
            </Stack>
          )}

          {gameState !== 'victory' && (
            <Box
              onClick={e => {
                e.stopPropagation()
                setQuizOpen(true)
              }}
              style={{
                position: 'absolute',
                top: currentLevel.characterPos.top,
                left: currentLevel.characterPos.left,
                width: 'clamp(60px, 15%, 150px)',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                transition: 'top 0.5s, left 0.5s',
                zIndex: 10
              }}
            >
              <Box style={{animation: 'bounce 2s infinite'}}>
                <Image src={character === 'boy' ? boyImg : girlImg} />
                <Box
                  bg="white"
                  px="xs"
                  py={2}
                  style={{
                    position: 'absolute',
                    top: -35,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderRadius: 12,
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    border: '2px solid black'
                  }}
                >
                  Click Me!
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <style>{`
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-10px);}
            60% {transform: translateY(-5px);}
        }
      `}</style>
    </Container>
  )
}
