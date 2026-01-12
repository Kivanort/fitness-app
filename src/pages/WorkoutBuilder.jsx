import React, { useState } from 'react'
import WorkoutExerciseEditor from '../components/WorkoutExerciseEditor'
import '../styles/components.css'

function WorkoutBuilder({ exercises, onAddWorkout, userData }) {
  const [workoutName, setWorkoutName] = useState('Новая тренировка')
  const [workoutDesc, setWorkoutDesc] = useState('')
  const [selectedExercises, setSelectedExercises] = useState([])
  const [autoTags, setAutoTags] = useState('')
  const [restTime, setRestTime] = useState(60)

  const calculateTarget = (exercise) => {
    let base
    if (exercise.defaultReps) {
      base = exercise.defaultReps
    } else if (exercise.defaultTime) {
      base = exercise.defaultTime
    } else {
      base = 10
    }

    const levelModifier = {
      beginner: 0.8,
      intermediate: 1,
      advanced: 1.2
    }[userData.fitnessLevel]

    const goalModifier = {
      strength: 0.9,
      endurance: 1.1,
      weight_loss: 1,
      muscle_gain: 1
    }[userData.goal]

    return Math.round(base * levelModifier * goalModifier)
  }

  const autoSelectExercises = () => {
    if (!autoTags.trim()) return
    
    const tags = autoTags.split(',').map(t => t.trim().toLowerCase())
    const filtered = exercises.filter(exercise =>
      tags.some(tag => 
        exercise.tags.some(t => t.toLowerCase().includes(tag)) ||
        exercise.name.toLowerCase().includes(tag)
      )
    ).slice(0, 5)

    const withTargets = filtered.map(exercise => {
      const target = calculateTarget(exercise)
      return {
        ...exercise,
        targetReps: exercise.defaultReps ? target : undefined,
        targetTime: exercise.defaultTime ? target : undefined,
        targetWeight: exercise.defaultWeight
      }
    })

    setSelectedExercises(withTargets)
  }

  const validateWorkout = () => {
    const warnings = []
    
    selectedExercises.forEach(exercise => {
      if (exercise.targetReps && exercise.targetReps > 100) {
        warnings.push(`${exercise.name}: слишком много повторений (>100)!`)
      }
      if (exercise.targetTime && exercise.targetTime > 600) {
        warnings.push(`${exercise.name}: слишком долгое выполнение (>10 минут)!`)
      }
      if (exercise.targetWeight && exercise.targetWeight > 200) {
        warnings.push(`${exercise.name}: слишком большой вес (>200кг)!`)
      }
    })

    if (selectedExercises.length === 0) {
      warnings.push('Добавьте хотя бы одно упражнение')
    }

    return warnings
  }

  const handleSave = () => {
    const warnings = validateWorkout()
    if (warnings.length > 0) {
      alert(warnings.join('\n'))
      return
    }

    const workout = {
      name: workoutName,
      description: workoutDesc,
      exercises: selectedExercises,
      restTime: restTime
    }

    onAddWorkout(workout)
    alert('Тренировка сохранена!')
    
    // Сброс формы
    setWorkoutName('Новая тренировка')
    setWorkoutDesc('')
    setSelectedExercises([])
    setAutoTags('')
  }

  return (
    <div className="workout-builder">
      <h1>Конструктор тренировок</h1>

      <div className="workout-form">
        <div className="form-group">
          <label className="form-label">Название тренировки</label>
          <input
            type="text"
            className="form-control"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Описание</label>
          <textarea
            className="form-control"
            rows="3"
            value={workoutDesc}
            onChange={(e) => setWorkoutDesc(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Время отдыха между упражнениями</label>
          <div className="range-input">
            <input
              type="range"
              min="10"
              max="180"
              step="10"
              value={restTime}
              onChange={(e) => setRestTime(parseInt(e.target.value))}
            />
            <span>{restTime} секунд</span>
          </div>
        </div>
      </div>

      <div className="auto-select-section">
        <div className="form-group">
          <label className="form-label">Автоподбор по тегам</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="например: ноги, кардио, пресс"
              value={autoTags}
              onChange={(e) => setAutoTags(e.target.value)}
            />
            <button className="btn btn-secondary" onClick={autoSelectExercises}>
              <i className="fas fa-magic"></i> Автоподбор
            </button>
          </div>
          <small className="text-muted">Введите теги через запятую</small>
        </div>
      </div>

      <div className="builder-sections grid-2">
        <div className="available-exercises">
          <h3>Доступные упражнения ({exercises.length})</h3>
          <div className="exercises-list">
            {exercises.map(exercise => (
              <div
                key={exercise.id}
                className="exercise-item"
                onClick={() => {
                  const target = calculateTarget(exercise)
                  const newExercise = {
                    ...exercise,
                    targetReps: exercise.defaultReps ? target : undefined,
                    targetTime: exercise.defaultTime ? target : undefined
                  }
                  setSelectedExercises([...selectedExercises, newExercise])
                }}
              >
                <div className="exercise-item-content">
                  <h4>{exercise.name}</h4>
                  <div className="exercise-tags">
                    {exercise.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <i className="fas fa-plus"></i>
              </div>
            ))}
          </div>
        </div>

        <div className="selected-exercises">
          <h3>Выбранные упражнения ({selectedExercises.length})</h3>
          {selectedExercises.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-clipboard-list"></i>
              <p>Выберите упражнения из списка слева</p>
            </div>
          ) : (
            <div className="selected-list">
              {selectedExercises.map((exercise, index) => (
                <WorkoutExerciseEditor
                  key={index}
                  exercise={exercise}
                  index={index}
                  onChange={(updated) => {
                    const newExercises = [...selectedExercises]
                    newExercises[index] = updated
                    setSelectedExercises(newExercises)
                  }}
                  onRemove={() => {
                    setSelectedExercises(selectedExercises.filter((_, i) => i !== index))
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="workout-actions">
        <button className="btn btn-danger" onClick={() => setSelectedExercises([])}>
          <i className="fas fa-trash"></i> Очистить
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          <i className="fas fa-save"></i> Сохранить тренировку
        </button>
      </div>
    </div>
  )
}

export default WorkoutBuilder
