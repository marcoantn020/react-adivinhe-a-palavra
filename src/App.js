// css 
import './App.css';

// react
import {useCallback, useEffect, useState} from 'react'

// data
import {wordList} from './data/word'

// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

const guessesQty = 3
const scoreQty = 0
        

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(scoreQty)

  const pickedWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return {word, category}
  },[words])

  // start the secret word game
  const startGame = useCallback(() => {
    clearLettersStates()
    const {word, category} = pickedWordAndCategory()
    
    let wordLetters = word.toLowerCase().split("")
    setLetters(wordLetters)
    setPickedCategory(category)
    setPickedWord(word)

    setGameStage(stages[1].name)
  },[pickedWordAndCategory])

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetter) => [...actualGuessedLetter, normalizedLetter])
    } else {
      setWrongLetters((actualWorngLetter) => [...actualWorngLetter, normalizedLetter])
    }

    setGuesses((actualGuesses) => actualGuesses - 1)
  }

  // restart
  const retry = () => {
    setGuesses(guessesQty)
    setScore(scoreQty)
    setGameStage(stages[0].name)
  }

  const clearLettersStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if(guesses <= 0 ){
      setGameStage(stages[2].name)
      clearLettersStates()
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      setScore((actualScore) => actualScore += 100)
      startGame()
    }

  }, [guessedLetters, letters, startGame, gameStage])

  return (
    <div className="Container">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && 
      <Game 
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
       />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
