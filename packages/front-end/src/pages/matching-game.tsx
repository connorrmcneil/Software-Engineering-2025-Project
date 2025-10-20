/**
 * Main Matching Game:
 *
 * Author(s):
 * - Last year's Authors
 * - Wenda Tan
 */

import type { WordInfo } from '@/components/matching-game-components/wordData'

import { Box, Center, Container, Stack, Text } from '@mantine/core'
import { useCallback, useEffect, useState } from 'react'

import GridImage from '@/assets/images/items/Grid.png'
import MatchingGameBackground from '@/assets/images/items/MatchingGameBackground.jpeg'
import { BeadDisplay, GameOverModal, MonthSelect, WordControls, WordGrid, WrongAnswerModal } from '@/components'
import { inactivePanel, MONTH_CONFIG, MONTHS, WORD_INFO } from '@/components/matching-game-components/wordData'


// Main game
export function WordMatchGame() {
  const [selectedMonth, setSelectedMonth] = useState('September')
  const [callCount, setCallCount] = useState(0)
  const [boxes, setBoxes] = useState<WordInfo[]>([])
  const [initWords, setInitWords] = useState<WordInfo[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [displayAudio, setDisplayAudio] = useState('')
  const [displayImage, setDisplayImage] = useState('')
  const [successCount, setSuccessCount] = useState(0)
  const [gameEnd, setGameEnd] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [showWrongModal, setShowWrongModal] = useState(false)
  const [showSecondModal, setShowSecondModal] = useState(false)

  const wordCount = MONTH_CONFIG[selectedMonth]

  // Grid generate: Randomizes after each selection
  const generateWordArray = useCallback(() => {
    if (!initWords || initWords.length === 0) return

    // Pick the next word that hasn’t been used yet
    const fixedWord = initWords[callCount] // callCount starts at 0 and increments each round

    let inactivePanelCount = 0
    if (wordCount === 3) inactivePanelCount = 6
    else if (wordCount === 6) inactivePanelCount = 3

    // Filter out the current word so it doesn’t appear twice in the grid
    const otherWords = initWords.filter(w => w.text !== fixedWord.text)

    // Fill the rest of the grid with other words and inactive panels
    const shuffledGrid = [
      ...otherWords,
      ...Array(inactivePanelCount).fill({
        text: 'none',
        image: inactivePanel,
        audio: ''
      })
    ]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)

    // Mix in the fixedWord
    const grid = [fixedWord, ...shuffledGrid].sort(() => Math.random() - 0.5)

    // Update state
    setBoxes(grid)
    setDisplayText(fixedWord.text)
    setDisplayImage(fixedWord.image)
    setDisplayAudio(fixedWord.audio)
  }, [callCount, initWords, wordCount])

  // Initialize words when month changes
  useEffect(() => {
    const words = WORD_INFO.slice(0, wordCount)
    const randomized = [...words].sort(() => Math.random() - 0.5)
    setCallCount(0)
    setSuccessCount(0)
    setInitWords(randomized)
    setIsInitialized(false)
    setGameEnd(false)
    setWrongAttempts(0)
  }, [selectedMonth, wordCount])

  // Generate the first round
  useEffect(() => {
    if (initWords.length > 0 && !isInitialized) {
      setIsInitialized(true)
      generateWordArray()
    }
  }, [initWords, isInitialized, generateWordArray])

  // Advance or end game
  useEffect(() => {
    if (callCount < wordCount && isInitialized && initWords.length > 0) {
      generateWordArray()
    } else if (callCount >= wordCount) {
      setGameEnd(true)
    }
  }, [callCount, generateWordArray, wordCount, isInitialized, initWords])

  // Main Logic: handle correct / incorrect selection
  const handleSelection = (selectedImage: string) => {
    const isCorrect = selectedImage === displayImage

    if (isCorrect) {
      if (displayAudio) new Audio(displayAudio).play()
      setSuccessCount(prev => prev + 1)
      setCallCount(prev => prev + 1)
      setWrongAttempts(0)
    } else {
      if (wrongAttempts === 0) {
        setShowWrongModal(true)
        setWrongAttempts(1)
      } else {
        setShowSecondModal(true)
      }
    }
  }

  const handleTryAgain = () => {
    setShowWrongModal(false)
  }

  const handleRestart = () => {
    setShowSecondModal(false)
    newGame()
  }

  const playAudio = () => {
    if (displayAudio) new Audio(displayAudio).play()
  }

  const newGame = () => {
    setCallCount(0)
    setSuccessCount(0)
    setWrongAttempts(0)
    const reshuffled = [...initWords].sort(() => Math.random() - 0.5)
    setInitWords(reshuffled)
    setIsInitialized(false)
    setGameEnd(false)
  }

  const roundDisplay = `${callCount}/${wordCount}`

  // Main game using all components and functions
  return (
    <>    
    <Box
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${MatchingGameBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Container
        size="xl"
        py="xl"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          borderRadius: '16px',
          padding: '2rem'
        }}
      >
        <Center>
          <Text size="2rem" pb="lg">
            Mikwite'tmk+t Angie
          </Text>
        </Center>
        <Center
          pb="lg">
          <Text size="1rem" pb="lg">
            Mi'kmaq Pictionary
          </Text>
        </Center>

        <GameOverModal isGameEnd={gameEnd} successCount={successCount} onNewGame={newGame} />

        <WrongAnswerModal
          opened={showWrongModal}
          firstAttempt={true}
          onTryAgain={handleTryAgain}
          onRestart={handleRestart}
        />

        <WrongAnswerModal
          opened={showSecondModal}
          firstAttempt={false}
          correctWord={initWords[callCount]?.text}
          translation={initWords[callCount]?.english}
          onTryAgain={handleTryAgain}
          onRestart={handleRestart}
        />

        <Stack gap="xl" align="center">
          <MonthSelect
            selectedMonth={selectedMonth}
            onChange={setSelectedMonth}
            monthConfig={MONTH_CONFIG}
            months={MONTHS}
          />

          {successCount > 0 && (
            <Box>
              <BeadDisplay successCount={successCount} />
            </Box>
          )}

          <WordControls displayText={displayText} roundDisplay={roundDisplay} playAudio={playAudio} />

          <WordGrid
            boxes={boxes}
            inactivePanel={inactivePanel}
            handleSelection={handleSelection}
            gridImage={GridImage}
          />
        </Stack>
      </Container>
    </Box>
    </>
  )
}
