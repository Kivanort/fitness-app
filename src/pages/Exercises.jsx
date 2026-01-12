import React, { useState, useMemo } from 'react'
import ExerciseCard from '../components/ExerciseCard'
import ExerciseForm from '../components/ExerciseForm'
import FilterPanel from '../components/FilterPanel'
import '../styles/components.css'

function Exercises({ exercises, onAddExercise, onUpdateExercise, onDeleteExercise }) {
  const [filters, setFilters] = useState({
    difficulty: [],
    equipment: [],
    tags: []
  })
  const [showForm, setShowForm] = useState(false)
  const [editingExercise, setEditingExercise] = useState(null)

  const equipmentOptions = [...new Set(exercises.flatMap(ex => ex.equipment))]
  const tagOptions = [...new Set(exercises.flatMap(ex => ex.tags))]

  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      // Фильтр по сложности
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(exercise.difficulty)) {
        return false
      }
      
      // Фильтр по оборудованию
      if (filters.equipment.length > 0 && 
          !filters.equipment.some(eq => exercise.equipment.includes(eq))) {
        return false
      }
      
      // Фильтр по тегам
      if (filters.tags.length > 0 && 
          !filters.tags.some(tag => exercise.tags.includes(tag))) {
        return false
      }
      
      return true
    })
  }, [exercises, filters])

  const handleEdit = (exercise) => {
    setEditingExercise(exercise)
    setShowForm(true)
  }

  const handleSubmit = (exerciseData) => {
    if (editingExercise) {
      onUpdateExercise(editingExercise.id, exerciseData)
      setEditingExercise(null)
    } else {
      onAddExercise(exerciseData)
    }
    setShowForm(false)
  }

  return (
    <div className="exercises-page">
      <div className="page-header">
        <h1>Каталог упражнений</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingExercise(null)
            setShowForm(true)
          }}
        >
          <i className="fas fa-plus"></i> Добавить упражнение
        </button>
      </div>

      <FilterPanel
        filters={filters}
        onChange={setFilters}
        equipmentOptions={equipmentOptions}
        tagOptions={tagOptions}
      />

      <div className="exercises-grid grid-3">
        {filteredExercises.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onEdit={handleEdit}
            onDelete={onDeleteExercise}
          />
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <ExerciseForm
              exercise={editingExercise}
              onSubmit={handleSubmit}
              onClose={() => {
                setShowForm(false)
                setEditingExercise(null)
              }}
            />
          </div>
        </div>
      )}

      {filteredExercises.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-dumbbell"></i>
          <h3>Упражнения не найдены</h3>
          <p>Попробуйте изменить фильтры или добавьте новое упражнение</p>
        </div>
      )}
    </div>
  )
}

export default Exercises
