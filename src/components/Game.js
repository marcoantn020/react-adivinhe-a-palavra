import { useState, useRef } from 'react'
import './Game.css'

const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
  score}) => {

  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)
  
  const handleSubmit = (event) => {
      event.preventDefault()
      verifyLetter(letter)
      setLetter("")
      letterInputRef.current.focus()
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score} </span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica da palavra: <span> {pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>

      <div className="wordContainer">
        {letters.map((letter, index) => (
          guessedLetters.includes(letter) ? (
            <span key={index} className="letter">{letter}</span>
          ) : (
            <span key={index} className="blankSquare"></span>
          )
        ))}
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar a letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="letter" 
            maxLength={1}  
            required
            onChange={((e) => setLetter(e.target.value))}
            value={letter}
            ref={letterInputRef}
             />
          <button type="submit">Jogar</button>
        </form>
      </div>

      <div className="wrongLetterContainer">
        <p>Letras ja utilizadas:</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game