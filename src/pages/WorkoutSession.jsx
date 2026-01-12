import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Timer from '../components/Timer'
import '../styles/components.css'

function WorkoutSession({ workouts, onCompleteWorkout }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const workout = workouts.find(w => w.id === id)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [restTime, setRestTime] = useState(workout?.restTime || 60)
  const [completedExercises, setCompletedExercises] = useState([])
  const [workoutStarted, setWorkoutStarted] = useState(false)
  const [workoutFinished, setWorkoutFinished] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [stats, setStats] = useState({
    totalTime: 0,
    exercisesCompleted: 0,
    totalReps: 0,
    caloriesBurned: 0
  })

  useEffect(() => {
    if (!workout) {
      navigate('/')
    }
  }, [workout, navigate])

  const startWorkout = () => {
    setWorkoutStarted(true)
    setStartTime(new Date())
  }

  const handleExerciseComplete = useCallback((data) => {
    const completed = {
      ...workout.exercises[currentIndex],
      completed: true,
      completedAt: new Date(),
      ...data
    }

    setCompletedExercises(prev => [...prev, completed])

    if (currentIndex < workout.exercises.length - 1) {
      setIsResting(true)
    } else {
      finishWorkout()
    }
  }, [currentIndex, workout])

  const handleRestComplete = useCallback(() => {
    setIsResting(false)
    setCurrentIndex(prev => prev + 1)
  }, [])

  const handleSkipExercise = () => {
    const skipped = {
      ...workout.exercises[currentIndex],
      skipped: true,
      skippedAt: new Date()
    }

    setCompletedExercises(prev => [...prev, skipped])

    if (currentIndex < workout.exercises.length - 1) {
      setIsResting(true)
    } else {
      finishWorkout()
    }
  }

  const finishWorkout = () => {
    const end = new Date()
    setEndTime(end)
    setWorkoutFinished(true)

    const totalTime = Math.round((end - startTime) / 1000)
    const exercisesCompleted = completedExercises.filter(ex => !ex.skipped).length
    const totalReps = completedExercises.reduce((sum, ex) => sum + (ex.completedReps || 0), 0)
    const caloriesBurned = Math.round(totalTime / 60 * 7)

    const workoutStats = {
      totalTime,
      exercisesCompleted,
      totalReps,
      caloriesBurned,
      workoutId: workout.id
    }

    setStats(workoutStats)
    onCompleteWorkout(workout.id, workoutStats)
  }

  if (!workout) {
    return <div>Тренировка не найдена</div>
  }

  if (!workoutStarted) {
    return (
      <div className="workout-session">
        <div className="workout-intro">
          <h1>{workout.name}</h1>
          <p>{workout.description}</p>
          
          <div className="workout-preview">
            <h3>План тренировки:</h3>
            <ul>
              {workout.exercises.map((ex, idx) => (
                <li key={idx}>
                  <strong>{ex.name}</strong>
                  {ex.targetReps && ` - ${ex.targetReps} повторений`}
                  {ex.targetTime && ` - ${ex.targetTime} секунд`}
                </li>
              ))}
            </ul>
          </div>

          <div className="workout-meta">
            <div className="meta-item">
              <i className="fas fa-dumbbell"></i>
              <span>{workout.exercises.length} упражнений</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-clock"></i>
              <span>Отдых: {workout.restTime} сек</span>
            </div>
          </div>

          <button className="btn btn-primary btn-lg" onClick={startWorkout}>
            <i className="fas fa-play"></i> Начать тренировку
          </button>
        </div>
      </div>
    )
  }

  if (workoutFinished) {
    return (
      <div className="workout-session">
        <div className="workout-complete">
          <div className="success-icon">
            <i className="fas fa-trophy"></i>
          </div>
          <h1>Тренировка завершена!</h1>
          <p>Отличная работа! Вы закончили тренировку "{workout.name}"</p>

          <div className="stats-grid grid-2">
            <div className="stat-box">
              <i className="fas fa-clock"></i>
              <h3>{Math.floor(stats.totalTime / 60)}:{(stats.totalTime % 60).toString().padStart(2, '0')}</h3>
              <p>Общее время</p>
            </div>
            <div className="stat-box">
              <i className="fas fa-check-circle"></i>
              <h3>{stats.exercisesCompleted}/{workout.exercises.length}</h3>
              <p>Упражнений выполнено</p>
            </div>
            <div className="stat-box">
              <i className="fas fa-redo"></i>
              <h3>{stats.totalReps}</h3>
              <p>Всего повторений</p>
            </div>
            <div className="stat-box">
              <i className="fas fa-fire"></i>
              <h3>{stats.caloriesBurned}</h3>
              <p>Ккал сожжено</p>
            </div>
          </div>

          <div className="completion-actions">
            <button className="btn btn-outline" onClick={() => navigate('/')}>
              <i className="fas fa-home"></i> На главную
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/workout-builder')}>
              <i className="fas fa-plus"></i> Новая тренировка
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentExercise = workout.exercises[currentIndex]

  return (
    <div className="workout-session">
      <div className="workout-progress">
        <div className="progress-header">
          <h2>{workout.name}</h2>
          <div className="progress-indicator">
            Упражнение {currentIndex + 1} из {workout.exercises.length}
          </div>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / workout.exercises.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {isResting ? (
        <div className="rest-screen">
          <div className="rest-content">
            <h2>Отдых</h2>
            <p>Подготовьтесь к следующему упражнению</p>
            
            <Timer
              duration={restTime}
              onComplete={handleRestComplete}
              showControls={true}
              onTimeChange={setRestTime}
            />

            <div className="rest-actions">
              <button 
                className="btn btn-outline"
                onClick={() => setRestTime(prev => Math.max(10, prev - 10))}
              >
                <i className="fas fa-minus"></i> -10 сек
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => setRestTime(prev => prev + 10)}
              >
                <i className="fas fa-plus"></i> +10 сек
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleRestComplete}
              >
                Пропустить отдых <i className="fas fa-forward"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="exercise-screen">
          <div className="exercise-header">
            <h2>{currentExercise.name}</h2>
            <div className="exercise-difficulty">
              <span className={`difficulty-badge ${currentExercise.difficulty}`}>
                {currentExercise.difficulty === 'easy' && 'Легкое'}
                {currentExercise.difficulty === 'medium' && 'Среднее'}
                {currentExercise.difficulty === 'hard' && 'Сложное'}
              </span>
            </div>
          </div>

          <div className="exercise-content">
            <div className="exercise-instructions">
              <h3>Инструкция:</h3>
              <ul>
                {currentExercise.instructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ul>
            </div>

            <div className="exercise-target">
              {currentExercise.targetTime ? (
                <div className="time-exercise">
                  <h3>Выполняйте в течение:</h3>
                  <Timer
                    duration={currentExercise.targetTime}
                    onComplete={() => handleExerciseComplete({
                      completedTime: currentExercise.targetTime
                    })}
                    autoStart={true}
                  />
                </div>
              ) : (
                <div className="reps-exercise">
                  <h3>Цель: {currentExercise.targetReps} повторений</h3>
                  <p>Нажмите кнопку, когда выполните все повторения</p>
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => handleExerciseComplete({
                      completedReps: currentExercise.targetReps
                    })}
                  >
                    <i className="fas fa-check"></i> Завершить упражнение
                  </button>
                </div>
              )}
            </div>

            <div className="exercise-tags">
              {currentExercise.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
              {currentExercise.equipment.length > 0 && (
                <div className="equipment">
                  <i className="fas fa-tools"></i>
                  {currentExercise.equipment.join(', ')}
                </div>
              )}
            </div>
          </div>

          <div className="exercise-actions">
            <button className="btn btn-danger" onClick={handleSkipExercise}>
              <i className="fas fa-forward"></i> Пропустить упражнение
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkoutSession
