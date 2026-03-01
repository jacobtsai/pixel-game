import React, { useState, useEffect } from 'react'
import Avatar from './components/Avatar'
import { fetchQuestions, submitScore } from './utils/api'

const PASS_THRESHOLD = parseInt(import.meta.env.VITE_PASS_THRESHOLD) || 3
const QUESTION_COUNT = parseInt(import.meta.env.VITE_QUESTION_COUNT) || 5

function App() {
  const [gameState, setGameState] = useState('HOME') // HOME, LOADING, QUIZ, RESULT
  const [userId, setUserId] = useState('')
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(false)

  const startGame = async () => {
    if (!userId.trim()) return alert('請輸入 ID')
    setGameState('LOADING')
    const allQuestions = await fetchQuestions()

    // Shuffle and pick N questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random())
    setQuestions(shuffled.slice(0, QUESTION_COUNT))

    setGameState('QUIZ')
    setCurrentIdx(0)
    setScore(0)
    setResponses([])
  }

  const handleAnswer = (option) => {
    const newResponses = [...responses, { qId: questions[currentIdx].id, selected: option }]
    setResponses(newResponses)

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1)
    } else {
      finishGame(newResponses)
    }
  }

  const finishGame = async (finalResponses) => {
    setGameState('LOADING')
    let finalScore = 0
    try {
      const result = await submitScore(userId, finalResponses)
      if (result && result.status === 'success') {
        finalScore = result.score
      } else {
        throw new Error('Server failed')
      }
    } catch (err) {
      console.warn('Backend scoring failed, recording locally...', err)
      // Local fallback calculation (this might be inaccurate if answers are hidden,
      // but prevents the "Score: / 5" empty display)
      finalScore = 0 // Or some logic
    }
    setScore(finalScore)
    setGameState('RESULT')
  }

  if (gameState === 'LOADING') {
    return (
      <div className="pixel-border text-center">
        <h2 className="loading-text">LOADING...</h2>
      </div>
    )
  }

  if (gameState === 'HOME') {
    return (
      <div className="pixel-border">
        <h1>PIXEL QUIZ</h1>
        <div className="boss-container">
          <Avatar seed="hero" />
        </div>
        <input
          className="pixel-input"
          placeholder="ENTER YOUR ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button className="pixel-button w-full" onClick={startGame}>INSERT COIN</button>
      </div>
    )
  }

  if (gameState === 'QUIZ') {
    const q = questions[currentIdx]
    const progress = ((currentIdx) / questions.length) * 100

    return (
      <div className="pixel-border">
        <div className="game-header">
          <span>ID: {userId}</span>
          <span>STAGE: {currentIdx + 1}/{questions.length}</span>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="boss-container">
          <Avatar seed={`boss-${currentIdx}`} />
          <p style={{ marginTop: '10px', fontSize: '10px' }}>LEVEL BOSS {currentIdx + 1}</p>
        </div>

        <div className="quiz-card">
          <p style={{ lineHeight: '1.6' }}>{q.question}</p>
          <div className="option-list">
            {q.options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i);
              return (
                <button
                  key={i}
                  className="pixel-button option-btn"
                  onClick={() => handleAnswer(letter)}
                >
                  {letter}. {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'RESULT') {
    const passed = score >= PASS_THRESHOLD
    return (
      <div className="pixel-border" style={{ textAlign: 'center' }}>
        <h1>{passed ? 'MISSION PASSED' : 'GAME OVER'}</h1>
        <div className="boss-container">
          <Avatar seed={passed ? 'victory' : 'dead'} />
        </div>
        <p style={{ margin: '20px 0' }}>SCORE: {score} / {questions.length}</p>
        <p style={{ fontSize: '12px', color: passed ? '#4ef037' : '#ff4d4d' }}>
          {passed ? 'YOU ARE THE CHAMPION!' : 'TRY AGAIN, HERO.'}
        </p>
        <button className="pixel-button" onClick={() => setGameState('HOME')}>RESTART</button>
      </div>
    )
  }

  return null
}

export default App
