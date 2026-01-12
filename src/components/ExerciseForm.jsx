import React, { useState, useEffect } from 'react'

function ExerciseForm({ exercise, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructions: ['', '', ''],
    difficulty: 'medium',
    equipment: [],
    tags: [],
    defaultReps: '',
    defaultTime: '',
    defaultWeight: ''
  })

  const [newEquipment, setNewEquipment] = useState('')
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    if (exercise) {
      setFormData({
        name: exercise.name || '',
        description: exercise.description || '',
        instructions: exercise.instructions || ['', '', ''],
        difficulty: exercise.difficulty || 'medium',
        equipment: exercise.equipment || [],
        tags: exercise.tags || [],
        defaultReps: exercise.defaultReps || '',
        defaultTime: exercise.defaultTime || '',
        defaultWeight: exercise.defaultWeight || ''
      })
    }
  }, [exercise])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const processedData = {
      ...formData,
      defaultReps: formData.defaultReps ? parseInt(formData.defaultReps) : undefined,
      defaultTime: formData.defaultTime ? parseInt(formData.defaultTime) : undefined,
      defaultWeight: formData.defaultWeight ? parseFloat(formData.defaultWeight) : undefined,
      instructions: formData.instructions.filter(inst => inst.trim() !== '')
    }

    onSubmit(processedData)
  }

  const addEquipment = () => {
    if (newEquipment.trim() && !formData.equipment.includes(newEquipment.trim())) {
      setFormData({
        ...formData,
        equipment: [...formData.equipment, newEquipment.trim()]
      })
      setNewEquipment('')
    }
  }

  const removeEquipment = (item) => {
    setFormData({
      ...formData,
      equipment: formData.equipment.filter(e => e !== item)
    })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    })
  }

  return (
    <div className="exercise-form">
      <div className="form-header">
        <h2>{exercise ? 'Редактировать упражнение' : 'Новое упражнение'}</h2>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Название упражнения *</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Описание</label>
          <textarea
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Инструкция (шаги выполнения)</label>
          {formData.instructions.map((instruction, idx) => (
            <div key={idx} className="instruction-input">
              <label>Шаг {idx + 1}</label>
              <input
                type="text"
                className="form-control"
                value={instruction}
                onChange={(e) => {
                  const newInstructions = [...formData.instructions]
                  newInstructions[idx] = e.target.value
                  setFormData({...formData, instructions: newInstructions})
                }}
                placeholder={`Шаг ${idx + 1}`}
              />
            </div>
          ))}
          <button 
            type="button"
            className="btn btn-outline"
            onClick={() => setFormData({
              ...formData,
              instructions: [...formData.instructions, '']
            })}
          >
            <i className="fas fa-plus"></i> Добавить шаг
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Сложность</label>
          <div className="difficulty-options">
            {['easy', 'medium', 'hard'].map(level => (
              <label key={level} className="difficulty-option">
                <input
                  type="radio"
                  name="difficulty"
                  value={level}
                  checked={formData.difficulty === level}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                />
                <span className={`difficulty-label ${level}`}>
                  {level === 'easy' && 'Легкое'}
                  {level === 'medium' && 'Среднее'}
                  {level === 'hard' && 'Сложное'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Оборудование</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newEquipment}
              onChange={(e) => setNewEquipment(e.target.value)}
              placeholder="Введите оборудование"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipment())}
            />
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={addEquipment}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <div className="tags-list">
            {formData.equipment.map(item => (
              <span key={item} className="tag">
                {item}
                <button 
                  type="button"
                  className="tag-remove"
                  onClick={() => removeEquipment(item)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Теги</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Введите тег"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={addTag}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <div className="tags-list">
            {formData.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button 
                  type="button"
                  className="tag-remove"
                  onClick={() => removeTag(tag)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-row grid-3">
          <div className="form-group">
            <label className="form-label">Повторения (по умолчанию)</label>
            <input
              type="number"
              className="form-control"
              value={formData.defaultReps}
              onChange={(e) => setFormData({...formData, defaultReps: e.target.value})}
              placeholder="10"
              min="1"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Время (секунд)</label>
            <input
              type="number"
              className="form-control"
              value={formData.defaultTime}
              onChange={(e) => setFormData({...formData, defaultTime: e.target.value})}
              placeholder="30"
              min="1"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Вес (кг)</label>
            <input
              type="number"
              className="form-control"
              value={formData.defaultWeight}
              onChange={(e) => setFormData({...formData, defaultWeight: e.target.value})}
              placeholder="20"
              min="0"
              step="0.5"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {exercise ? 'Сохранить изменения' : 'Добавить упражнение'}
          </button>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}

export default ExerciseForm
