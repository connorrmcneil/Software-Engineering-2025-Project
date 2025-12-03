/**
 * Pictionary game
 *
 * Author(s):
 * - Last year's Authors
 * - Wenda Tan
 */

import type { Month, Word } from '@/types'

import { BackgroundImage, Box, Paper, Select, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { useEffect, useReducer, useState } from 'react'
import { useLoaderData } from 'react-router'

import MatchingGameBackground from '@/assets/images/items/Forest-Background.png'
import { wordsLoader } from '@/router/words.loader'
import { toStorageUrl } from '@/utils'
import { GameOverModal } from './GameOverModal'
import { ScoreBeads } from './ScoreBeads'
import { WordControls } from './WordControls'
import { WordGrid } from './WordGrid'
import { WrongAnswerModal } from './WrongAnswerModal'

type GameState = {
  index: number
  initWords: Word[]
  boxes: Word[]
  displayText: string
  displayImage: string
  displayAudio: string
  successCount: number
  gameEnd: boolean
  wrongAttempts: number
  showWrongModal: boolean
  showSecondModal: boolean
  initialized: boolean
}

type GameAction =
  | { type: 'SET_INIT'; words: Word[] }
  | { type: 'GENERATE' }
  | { type: 'SELECT'; selectedImage: string }
  | { type: 'TRY_AGAIN' }
  | { type: 'RESTART' }
  | { type: 'NEW_GAME' }

const initialState: GameState = {
  index: 0,
  initWords: [],
  boxes: [],
  displayText: '',
  displayImage: '',
  displayAudio: '',
  successCount: 0,
  gameEnd: false,
  wrongAttempts: 0,
  showWrongModal: false,
  showSecondModal: false,
  initialized: false
}

export function WordMatchGame() {
  const { words } = useLoaderData<typeof wordsLoader>()
  const wordsByMonth = words.reduce(
    (acc, word) => {
      if (!acc[word.startMonth]) {
        acc[word.startMonth] = []
      }
      acc[word.startMonth].push(word)
      return acc
    },
    {} as Record<Month, Word[]>
  )

  const [selectedMonth, setSelectedMonth] = useState<Month>('September')

  const generateGrid = (initWords: Word[], index: number) => {
    if (!initWords || initWords.length === 0) return null

    const fixedWord = initWords[index]
    let inactivePanelCount = 0
    const wordCount = initWords.length
    if (wordCount === 3) inactivePanelCount = 6
    else if (wordCount === 6) inactivePanelCount = 3

    const otherWords = initWords.filter(w => w.mikmaq !== fixedWord.mikmaq)

    const shuffledGrid = [...otherWords, ...Array(inactivePanelCount).fill(null)]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)

    const grid = [fixedWord, ...shuffledGrid].sort(() => Math.random() - 0.5)

    return {
      boxes: grid,
      displayText: fixedWord.mikmaq,
      displayImage: fixedWord.imagePath,
      displayAudio: fixedWord.audioPath
    }
  }

  function reducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
      case 'SET_INIT': {
        return {
          ...state,
          initWords: action.words,
          index: 0,
          successCount: 0,
          wrongAttempts: 0,
          gameEnd: false,
          initialized: false,
          showWrongModal: false,
          showSecondModal: false
        }
      }
      case 'GENERATE': {
        const payload = generateGrid(state.initWords, state.index)
        if (!payload) return state
        return {
          ...state,
          boxes: payload.boxes,
          displayText: payload.displayText,
          displayImage: payload.displayImage,
          displayAudio: payload.displayAudio,
          initialized: true
        }
      }
      case 'SELECT': {
        const isCorrect = action.selectedImage === state.displayImage
        if (isCorrect) {
          const nextIndex = state.index + 1
          const gameEnd = nextIndex >= state.initWords.length
          return {
            ...state,
            index: nextIndex,
            successCount: state.successCount + 1,
            wrongAttempts: 0,
            gameEnd,
            initialized: false
          }
        }

        // incorrect
        if (state.wrongAttempts === 0) {
          return { ...state, showWrongModal: true, wrongAttempts: 1 }
        }

        return { ...state, showSecondModal: true }
      }
      case 'TRY_AGAIN':
        return { ...state, showWrongModal: false }
      case 'RESTART':
        return { ...state, showSecondModal: false, index: 0, successCount: 0, wrongAttempts: 0 }
      case 'NEW_GAME': {
        const reshuffled = [...state.initWords].sort(() => Math.random() - 0.5)
        return {
          ...state,
          initWords: reshuffled,
          index: 0,
          successCount: 0,
          wrongAttempts: 0,
          gameEnd: false,
          initialized: false,
          showWrongModal: false,
          showSecondModal: false
        }
      }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const wordCount = wordsByMonth[selectedMonth]?.length

  useEffect(() => {
    const monthWords = wordsByMonth[selectedMonth]?.slice(0, wordCount) || []
    const randomized = [...monthWords].sort(() => Math.random() - 0.5)
    dispatch({ type: 'SET_INIT', words: randomized })
  }, [selectedMonth, wordCount])

  useEffect(() => {
    if (state.initWords.length > 0 && !state.initialized && !state.gameEnd) {
      dispatch({ type: 'GENERATE' })
    }
  }, [state.initWords, state.initialized, state.gameEnd])

  useEffect(() => {
    if (state.index < state.initWords.length && !state.gameEnd) {
      if (!state.initialized) dispatch({ type: 'GENERATE' })
    } else if (state.index >= state.initWords.length && state.initWords.length > 0) {
    }
  }, [state.index, state.initWords.length, state.initialized, state.gameEnd])

  // Correct/Incorrect Selection
  const handleSelection = (selectedImage: string) => {
    const isCorrect = selectedImage === state.displayImage
    if (isCorrect && state.displayAudio) new Audio(toStorageUrl(state.displayAudio)).play()
    dispatch({ type: 'SELECT', selectedImage })
  }

  const handleTryAgain = () => dispatch({ type: 'TRY_AGAIN' })
  const handleRestart = () => {
    dispatch({ type: 'RESTART' })
    dispatch({ type: 'NEW_GAME' })
  }

  const playAudio = () => {
    if (state.displayAudio) new Audio(toStorageUrl(state.displayAudio)).play()
  }

  const newGame = () => dispatch({ type: 'NEW_GAME' })

  const roundDisplay = `${state.index}/${wordCount}`


  return (
    <BackgroundImage
      h="var(--app-height)"
      src={MatchingGameBackground}
      p={{ base: 'xs', sm: 'md', md: 'xl' }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Paper
        bg="rgba(255, 255, 255, 0.85)"
        // Responsive width: 100% on mobile, up to 900px on desktop
        w={{ base: '100%', md: 1200 }}
        maw="100%"
        p={{ base: 'md', md: 'xl' }}
        radius="xl"
        shadow="xl"
      >
        <Stack gap="sm" mb="lg">
          <Title order={2} ta="center" fw={900}>
            PLACEHOLDER NEED MI'KMAQ TRANSLATION
          </Title>
          <Text ta="center" c="dimmed" fs="italic">
            Mi'kmaq Word Match
          </Text>
        </Stack>

        <GameOverModal opened={state.gameEnd} score={state.successCount} onNewGame={newGame} />

        <WrongAnswerModal
          opened={state.showWrongModal}
          firstAttempt={true}
          onTryAgain={handleTryAgain}
          onRestart={handleRestart}
        />

        <WrongAnswerModal
          opened={state.showSecondModal}
          firstAttempt={false}
          correctWord={state.initWords[state.index]?.mikmaq}
          correctImage={state.initWords[state.index]?.imagePath}
          translation={state.initWords[state.index]?.english}
          onTryAgain={handleTryAgain}
          onRestart={handleRestart}
        />

        {/* Layout Grid will adapt for mobile and desktop sizes
          - Mobile: 1 column (stacked info and grid)
          - On Desktop:2 columns (info to left, grid to right)
        */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 'lg', md: 'xl' }}>

          {/* Left */}
          <Stack justify="flex-start" gap="lg">
            <Select
              label="Select month"
              value={selectedMonth}
              onChange={value => setSelectedMonth((value as Month) || 'September')}
              data={Object.entries(wordsByMonth).map(([month, words]) => ({
                value: month,
                label: `${month} (${words.length} words)`
              }))}
              w="100%"
            />

            <Box>
              {state.successCount > 0 && (
                <Stack align="center" gap="xs">
                  <Text size="sm" fw={500} c="dimmed">Score</Text>
                  <ScoreBeads score={state.successCount} />
                </Stack>
              )}
            </Box>

            {/* Use a Card look for the active word control */}
            <Paper withBorder p="md" radius="md" bg="white">
              <WordControls
                displayText={state.displayText}
                roundDisplay={roundDisplay}
                playAudio={playAudio}
              />
            </Paper>
          </Stack>

          {/* Grid */}
          <Box>
            <WordGrid words={state.boxes} handleSelection={handleSelection} />
          </Box>

        </SimpleGrid>
      </Paper>
    </BackgroundImage>
  )
}