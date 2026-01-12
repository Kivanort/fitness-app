import React, { useState } from 'react'

function WorkoutExerciseEditor({ exercise, index, onChange, onRemove }) {
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    targetReps: exercise.targetReps || '',
    targetTime: exercise.targetTime || '',
    targetWeight: exercise.targetWeight || ''
  })

  const handleSave = () => {
    const updated = {
      ...exercise,
      targetReps: formData.targetReps ? parseInt(formData.targetReps) : undefined,
      targetTime: formData.targetTime ? parseInt(formData.targetTime) : undefined,
      targetWeight: formData.targetWeight ? parseFloat(formData.targetWeight) : undefined
    }
    onChange(updated)
    setEditing(false)
  }

  const showWarning = () => {
    if (formData.targetReps && parseInt(formData.targetReps) > 100) {
      return 'Слишком много повторений! Рекомендуется не более 100.'
    }
    if (formData.targetTime && parseInt(formData.targetTime) > 600) {
      return 'Слишком долгое выполнение! Рекомендуется не более 10 минут.'
    }
    if (formData.targetWeight && parseFloat(formData.targetWeight) > 200) {
      return 'Слишком большой вес! Будьте осторожны.'
    }
    return null
  }

  const warning = showWarning()

  return (
    <div className="workout-exercise-editor card">
      <div className="exercise-editor-header">
        <div className="exercise-info">
          <span className="exercise-number">{index + 1}.</span>
          <h4>{exercise.name}</h4>
          <div className="exercise-tags">
            {exercise.tags.slice(0, 2).map(tag => (
              <span key={tag} className="tag small">{tag}</span>
            ))}
          </div>
        </div>
        <div className="exercise-actions">
          {editing ? (
            <>
              <button className="btn btn-primary" onClick={handleSave}>
                Сохранить
              </button>
              <button className="btn btn-outline" onClick={() => setEditing(false)}>
                Отмена
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-outline" onClick={() => setEditing(true)}>
                <i className="fas fa-edit"></i> Настроить
              </button>
              <button className="btn btn-danger" onClick={onRemove}>
                <i className="fas fa-trash"></i>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="exercise-current-targets">
        {(exercise.targetReps || exercise.targetTime || exercise.targetWeight) && (
          <div className="current-values">
            <span>Текущие цели:</span>
            {exercise.targetReps && (
              <span className="value-badge">
                <i className="fas fa-redo"></i> {exercise.targetReps} повт.
              </span>
            )}
            {exercise.targetTime && (
              <span className="value-badge">
                <i className="fas fa-clock"></i> {exercise.targetTime} сек
              </span>
            )}
            {exercise.targetWeight && (
              <span className="value-badge">
                <i className="fas fa-weight-hanging"></i> {exercise.targetWeight} кг
              </span>
            )}
          </div>
        )}
      </div>

      {editing && (
        <div className="exercise-edit-form">
          <div className="form-row grid-3">
            <div className="form-group">
              <label className="form-label">Повторения</label>
              <input
                type="number"
                className="form-control"
                value={formData.targetReps}
                onChange={(e) => setFormData({...formData, targetReps: e.target.value})}
                placeholder={exercise.defaultReps || '10'}
                min="1"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Время (сек)</label>
              <input
                type="number"
                className="form-control"
                value={formData.targetTime}
                onChange={(e) => setFormData({...formData, targetTime: e.target.value})}
                placeholder={exercise.defaultTime || '30'}
                min="1"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Вес (кг)</label>
              <input
                type="number"
                className="form-control"
                value={formData.targetWeight}
                onChange={(e) => setFormData({...formData, targetWeight: e.target.value})}
                placeholder={exercise.defaultWeight || '0'}
                min="0"
                step="0.5"
              />
            </div>
          </div>

          {warning && (
            <div className="warning-message">
              <i className="fas fa-exclamation-triangle"></i>
              <span>{warning}</span>
            </div>
          )}

          <div className="exercise-description">
            <p>{exercise.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkoutExerciseEditor
