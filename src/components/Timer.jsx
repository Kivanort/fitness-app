import React, { useState, useEffect, useRef } from 'react'

function Timer({ duration, onComplete, showControls = false, onTimeChange, autoStart = false }) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(autoStart)
  const timerRef = useRef(null)

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            onComplete?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning, timeLeft, onComplete])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAddTime = (seconds) => {
    const newTime = timeLeft + seconds
    setTimeLeft(newTime)
    onTimeChange?.(newTime)
  }

  const handleSubtractTime = (seconds) => {
    const newTime = Math.max(10, timeLeft - seconds)
    setTimeLeft(newTime)
    onTimeChange?.(newTime)
  }

  return (
    <div className="timer-component">
      <div className="timer-display">
        <div className="timer-circle">
          <div className="timer-text">{formatTime(timeLeft)}</div>
          <div className="timer-progress">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="var(--primary-color)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="339.292"
                strokeDashoffset={339.292 * (1 - timeLeft / duration)}
                transform="rotate(-90 60 60)"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="timer-controls">
        {showControls && (
          <>
            <button 
              className="btn btn-outline"
              onClick={() => handleSubtractTime(10)}
              disabled={timeLeft <= 10}
            >
              <i className="fas fa-minus"></i> 10 сек
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => handleAddTime(10)}
            >
              <i className="fas fa-plus"></i> 10 сек
            </button>
          </>
        )}

        <button
          className={`btn ${isRunning ? 'btn-danger' : 'btn-primary'}`}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? (
            <>
              <i className="fas fa-pause"></i> Пауза
            </>
          ) : (
            <>
              <i className="fas fa-play"></i> Старт
            </>
          )}
        </button>

        {!showControls && (
          <button
            className="btn btn-outline"
            onClick={() => {
              setIsRunning(false)
              setTimeLeft(duration)
            }}
          >
            <i className="fas fa-redo"></i> Сброс
          </button>
        )}
      </div>

      <div className="timer-info">
        <p>{isRunning ? 'Идет отсчет...' : 'Таймер на паузе'}</p>
      </div>
    </div>
  )
}

export default Timer
