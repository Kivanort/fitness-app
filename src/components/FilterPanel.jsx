import React from 'react'

function FilterPanel({ filters, onChange, equipmentOptions = [], tagOptions = [] }) {
  const difficultyOptions = [
    { value: 'easy', label: 'Легкие' },
    { value: 'medium', label: 'Средние' },
    { value: 'hard', label: 'Сложные' }
  ]

  const toggleFilter = (type, value) => {
    const currentFilters = filters[type]
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value]
    
    onChange({
      ...filters,
      [type]: newFilters
    })
  }

  const clearFilters = () => {
    onChange({
      difficulty: [],
      equipment: [],
      tags: []
    })
  }

  const hasActiveFilters = 
    filters.difficulty.length > 0 ||
    filters.equipment.length > 0 ||
    filters.tags.length > 0

  return (
    <div className="filter-panel card">
      <div className="filter-header">
        <h3>Фильтры</h3>
        {hasActiveFilters && (
          <button className="btn btn-link" onClick={clearFilters}>
            Сбросить все
          </button>
        )}
      </div>

      <div className="filter-groups">
        <div className="filter-group">
          <h4>Сложность</h4>
          <div className="filter-options">
            {difficultyOptions.map(option => (
              <label key={option.value} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.difficulty.includes(option.value)}
                  onChange={() => toggleFilter('difficulty', option.value)}
                />
                <span className="checkmark"></span>
                <span className="filter-label">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {equipmentOptions.length > 0 && (
          <div className="filter-group">
            <h4>Оборудование</h4>
            <div className="filter-options">
              {equipmentOptions.slice(0, 10).map(option => (
                <label key={option} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.equipment.includes(option)}
                    onChange={() => toggleFilter('equipment', option)}
                  />
                  <span className="checkmark"></span>
                  <span className="filter-label">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {tagOptions.length > 0 && (
          <div className="filter-group">
            <h4>Теги</h4>
            <div className="filter-options">
              {tagOptions.slice(0, 15).map(option => (
                <label key={option} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(option)}
                    onChange={() => toggleFilter('tags', option)}
                  />
                  <span className="checkmark"></span>
                  <span className="filter-label">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <h4>Активные фильтры:</h4>
          <div className="filter-tags">
            {filters.difficulty.map(diff => (
              <span key={diff} className="tag active-tag">
                {diff === 'easy' && 'Легкие'}
                {diff === 'medium' && 'Средние'}
                {diff === 'hard' && 'Сложные'}
                <button 
                  onClick={() => toggleFilter('difficulty', diff)}
                  className="tag-remove"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
            {filters.equipment.map(eq => (
              <span key={eq} className="tag active-tag">
                {eq}
                <button 
                  onClick={() => toggleFilter('equipment', eq)}
                  className="tag-remove"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
            {filters.tags.map(tag => (
              <span key={tag} className="tag active-tag">
                {tag}
                <button 
                  onClick={() => toggleFilter('tags', tag)}
                  className="tag-remove"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPanel
