/**
 * Pictionary game
 *
 * Author(s):
 * - Last year's Authors
 * - Wenda Tan
 */

import type {Month, Word} from '@/types'

import {BackgroundImage, Paper, Select, Stack, Text} from '@mantine/core'
import {useEffect, useReducer, useState} from 'react'
import {useLoaderData} from 'react-router'

import MatchingGameBackground from '@/assets/images/items/MatchingGameBackground.jpeg'
import {wordsLoader} from '@/router/words.loader'
import {toStorageUrl} from '@/utils'
import {GameOverModal} from './GameOverModal'
import {ScoreBeads} from './ScoreBeads'
import {WordControls} from './WordControls'
import {WordGrid} from './WordGrid'
import {WrongAnswerModal} from './WrongAnswerModal'

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
  | {type: 'SET_INIT'; words: Word[]}
  | {type: 'GENERATE'}
  | {type: 'SELECT'; selectedImage: string}
  | {type: 'TRY_AGAIN'}
  | {type: 'RESTART'}
  | {type: 'NEW_GAME'}

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
  const {words} = useLoaderData<typeof wordsLoader>()
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
            initialized: !gameEnd
          }
        }

        // incorrect
        if (state.wrongAttempts === 0) {
          return {...state, showWrongModal: true, wrongAttempts: 1}
        }

        return {...state, showSecondModal: true}
      }
      case 'TRY_AGAIN':
        return {...state, showWrongModal: false}
      case 'RESTART':
        return {...state, showSecondModal: false, index: 0, successCount: 0, wrongAttempts: 0}
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

  // Initialize words when month changes
  useEffect(() => {
    const monthWords = wordsByMonth[selectedMonth]?.slice(0, wordCount) || []
    const randomized = [...monthWords].sort(() => Math.random() - 0.5)
    dispatch({type: 'SET_INIT', words: randomized})
  }, [selectedMonth, wordCount])

  // Generate the first round when initWords are available
  useEffect(() => {
    if (state.initWords.length > 0 && !state.initialized && !state.gameEnd) {
      dispatch({type: 'GENERATE'})
    }
  }, [state.initWords, state.initialized, state.gameEnd])

  // When index advances, either generate next round or end the game
  useEffect(() => {
    if (state.index < state.initWords.length && !state.gameEnd) {
      if (!state.initialized) dispatch({type: 'GENERATE'})
    } else if (state.index >= state.initWords.length && state.initWords.length > 0) {
      // End state handled in reducer
    }
  }, [state.index, state.initWords.length, state.initialized, state.gameEnd])

  // Main Logic: handle correct / incorrect selection
  const handleSelection = (selectedImage: string) => {
    const isCorrect = selectedImage === state.displayImage
    if (isCorrect && state.displayAudio) new Audio(toStorageUrl(state.displayAudio)).play()
    dispatch({type: 'SELECT', selectedImage})
  }

  const handleTryAgain = () => dispatch({type: 'TRY_AGAIN'})
  const handleRestart = () => {
    dispatch({type: 'RESTART'})
    dispatch({type: 'NEW_GAME'})
  }

  const playAudio = () => {
    if (state.displayAudio) new Audio(toStorageUrl(state.displayAudio)).play()
  }

  const newGame = () => dispatch({type: 'NEW_GAME'})

  const roundDisplay = `${state.index}/${wordCount}`

  // Main game using all components and functions
  return (
    <BackgroundImage h="var(--app-height)" p="xl" src={MatchingGameBackground}>
      <Paper bg="rgba(255, 255, 255, 0.75)" maw={500} mx="auto" p="lg" bdrs="xl">
        <Text ta="center" size="xl" fw="bolder">
          Mikwite'tmk+t Angie
        </Text>
        <Text ta="center" mb="lg" c="dimmed" fs="italic">
          Mi'kmaq Pictionary
        </Text>

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
          translation={state.initWords[state.index]?.english}
          onTryAgain={handleTryAgain}
          onRestart={handleRestart}
        />

        <Stack gap="xl" align="center">
          <Select
            label="Select month"
            value={selectedMonth}
            onChange={value => setSelectedMonth((value as Month) || 'September')}
            data={Object.entries(wordsByMonth).map(([month, words]) => ({
              value: month,
              label: `${month} (${words.length} words)`
            }))}
            style={{width: '300px'}}
          />

          {state.successCount > 0 && <ScoreBeads score={state.successCount} />}

          <WordControls displayText={state.displayText} roundDisplay={roundDisplay} playAudio={playAudio} />

          <WordGrid words={state.boxes} handleSelection={handleSelection} />
        </Stack>
      </Paper>
    </BackgroundImage>
  )
}
