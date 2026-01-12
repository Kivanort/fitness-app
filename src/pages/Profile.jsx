import React, { useState } from 'react'
import CharacterAvatar from '../components/CharacterAvatar'
import '../styles/components.css'

function Profile({ character, userData, setUserData, setCharacter }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState(userData)

  const achievements = [
    { id: 1, name: 'Первая тренировка', description: 'Завершите свою первую тренировку', icon: 'fas fa-star', unlocked: true },
    { id: 2, name: 'Спортсмен недели', description: 'Занимайтесь 5 дней подряд', icon: 'fas fa-trophy', unlocked: false },
    { id: 3, name: 'Силач', description: 'Выполните 1000 повторений', icon: 'fas fa-dumbbell', unlocked: true },
    { id: 4, name: 'Марафонец', description: 'Занимайтесь более 60 минут', icon: 'fas fa-running', unlocked: false },
  ]

  const customizationOptions = {
    bodyType: [
      { id: 'slim', name: 'Стройный', cost: 0 },
      { id: 'average', name: 'Средний', cost: 50 },
      { id: 'muscular', name: 'Мускулистый', cost: 100 }
    ],
    hairStyle: [
      { id: 'short', name: 'Короткая', cost: 30 },
      { id: 'medium', name: 'Средняя', cost: 50 },
      { id: 'long', name: 'Длинная', cost: 80 }
    ],
    outfit: [
      { id: 'basic', name: 'Базовая', cost: 0 },
      { id: 'sport', name: 'Спортивная', cost: 100 },
      { id: 'elite', name: 'Элитная', cost: 200 }
    ]
  }

  const handleProfileSave = () => {
    setUserData(profileForm)
    setEditingProfile(false)
  }

  const purchaseItem = (category, item) => {
    if (character.coins >= item.cost) {
      setCharacter(prev => ({
        ...prev,
        coins: prev.coins - item.cost,
        [category]: item.id
      }))
      alert(`Вы приобрели: ${item.name}`)
    } else {
      alert('Недостаточно монет!')
    }
  }

  const calculateBMI = () => {
    const heightInMeters = userData.height / 100
    return (userData.weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  const bmiCategory = () => {
    const bmi = calculateBMI()
    if (bmi < 18.5) return 'Недостаточный вес'
    if (bmi < 25) return 'Нормальный вес'
    if (bmi < 30) return 'Избыточный вес'
    return 'Ожирение'
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <h1>{userData.name}</h1>
          <div className="level-info">
            <div className="level-display">
              <span className="level-badge">Уровень {character.level}</span>
              <div className="xp-bar">
                <div 
                  className="xp-fill"
                  style={{ width: `${(character.xp % 1000) / 10}%` }}
                ></div>
              </div>
              <span className="xp-text">{character.xp % 1000}/1000 XP</span>
            </div>
            <div className="coins-display">
              <i className="fas fa-coins"></i>
              <span>{character.coins} монет</span>
            </div>
          </div>
        </div>
        
        <div className="character-display">
          <CharacterAvatar character={character} size="large" />
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="fas fa-user"></i> Профиль
        </button>
        <button 
          className={`tab-btn ${activeTab === 'customization' ? 'active' : ''}`}
          onClick={() => setActiveTab('customization')}
        >
          <i className="fas fa-paint-brush"></i> Кастомизация
        </button>
        <button 
          className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <i className="fas fa-trophy"></i> Достижения
        </button>
        <button 
          className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <i className="fas fa-chart-line"></i> Статистика
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' && (
          <div className="profile-form">
            <div className="form-section">
              <h3>Личная информация</h3>
              {editingProfile ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label className="form-label">Имя</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Возраст</label>
                    <input
                      type="number"
                      className="form-control"
                      value={profileForm.age}
                      onChange={(e) => setProfileForm({...profileForm, age: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Рост (см)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={profileForm.height}
                      onChange={(e) => setProfileForm({...profileForm, height: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Вес (кг)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={profileForm.weight}
                      onChange={(e) => setProfileForm({...profileForm, weight: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Уровень подготовки</label>
                    <select
                      className="select"
                      value={profileForm.fitnessLevel}
                      onChange={(e) => setProfileForm({...profileForm, fitnessLevel: e.target.value})}
                    >
                      <option value="beginner">Начинающий</option>
                      <option value="intermediate">Средний</option>
                      <option value="advanced">Продвинутый</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Цель</label>
                    <select
                      className="select"
                      value={profileForm.goal}
                      onChange={(e) => setProfileForm({...profileForm, goal: e.target.value})}
                    >
                      <option value="weight_loss">Похудение</option>
                      <option value="muscle_gain">Набор мышечной массы</option>
                      <option value="strength">Развитие силы</option>
                      <option value="endurance">Выносливость</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-primary" onClick={handleProfileSave}>
                      Сохранить
                    </button>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => {
                        setEditingProfile(false)
                        setProfileForm(userData)
                      }}
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <div className="profile-details">
                  <div className="detail-item">
                    <span className="detail-label">Возраст:</span>
                    <span className="detail-value">{userData.age} лет</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Рост:</span>
                    <span className="detail-value">{userData.height} см</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Вес:</span>
                    <span className="detail-value">{userData.weight} кг</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">ИМТ:</span>
                    <span className="detail-value">
                      {calculateBMI()} ({bmiCategory()})
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Уровень подготовки:</span>
                    <span className="detail-value">
                      {userData.fitnessLevel === 'beginner' && 'Начинающий'}
                      {userData.fitnessLevel === 'intermediate' && 'Средний'}
                      {userData.fitnessLevel === 'advanced' && 'Продвинутый'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Цель:</span>
                    <span className="detail-value">
                      {userData.goal === 'weight_loss' && 'Похудение'}
                      {userData.goal === 'muscle_gain' && 'Набор мышечной массы'}
                      {userData.goal === 'strength' && 'Развитие силы'}
                      {userData.goal === 'endurance' && 'Выносливость'}
                    </span>
                  </div>
                  <button 
                    className="btn btn-outline mt-3"
                    onClick={() => setEditingProfile(true)}
                  >
                    <i className="fas fa-edit"></i> Редактировать профиль
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'customization' && (
          <div className="customization-tab">
            <div className="customization-section">
              <h3>Тип тела</h3>
              <div className="options-grid">
                {customizationOptions.bodyType.map(option => (
                  <div 
                    key={option.id}
                    className={`option-card ${character.bodyType === option.id ? 'selected' : ''}`}
                    onClick={() => purchaseItem('bodyType', option)}
                  >
                    <div className="option-icon">
                      {option.id === 'slim' && <i className="fas fa-user"></i>}
                      {option.id === 'average' && <i className="fas fa-user-friends"></i>}
                      {option.id === 'muscular' && <i className="fas fa-user-shield"></i>}
                    </div>
                    <div className="option-info">
                      <h4>{option.name}</h4>
                      <p className="option-cost">
                        {option.cost === 0 ? 'Бесплатно' : `${option.cost} монет`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="customization-section">
              <h3>Прическа</h3>
              <div className="options-grid">
                {customizationOptions.hairStyle.map(option => (
                  <div 
                    key={option.id}
                    className={`option-card ${character.hairStyle === option.id ? 'selected' : ''}`}
                    onClick={() => purchaseItem('hairStyle', option)}
                  >
                    <div className="option-icon">
                      <i className="fas fa-cut"></i>
                    </div>
                    <div className="option-info">
                      <h4>{option.name}</h4>
                      <p className="option-cost">
                        {option.cost === 0 ? 'Бесплатно' : `${option.cost} монет`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="customization-section">
              <h3>Одежда</h3>
              <div className="options-grid">
                {customizationOptions.outfit.map(option => (
                  <div 
                    key={option.id}
                    className={`option-card ${character.outfit === option.id ? 'selected' : ''}`}
                    onClick={() => purchaseItem('outfit', option)}
                  >
                    <div className="option-icon">
                      <i className="fas fa-tshirt"></i>
                    </div>
                    <div className="option-info">
                      <h4>{option.name}</h4>
                      <p className="option-cost">
                        {option.cost === 0 ? 'Бесплатно' : `${option.cost} монет`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-tab">
            <h3>Достижения</h3>
            <div className="achievements-grid grid-3">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-icon">
                    <i className={achievement.icon}></i>
                  </div>
                  <div className="achievement-info">
                    <h4>{achievement.name}</h4>
                    <p>{achievement.description}</p>
                    <div className="achievement-status">
                      {achievement.unlocked ? (
                        <span className="status-unlocked">
                          <i className="fas fa-check"></i> Получено
                        </span>
                      ) : (
                        <span className="status-locked">
                          <i className="fas fa-lock"></i> Заблокировано
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-tab">
            <div className="stats-grid grid-2">
              <div className="stat-card">
                <h4>Общая статистика</h4>
                <div className="stat-list">
                  <div className="stat-item">
                    <span className="stat-label">Всего тренировок:</span>
                    <span className="stat-value">12</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Всего времени:</span>
                    <span className="stat-value">5ч 30м</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Потрачено калорий:</span>
                    <span className="stat-value">2,400</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Достижений:</span>
                    <span className="stat-value">2/8</span>
                  </div>
                </div>
              </div>
              <div className="stat-card">
                <h4>Прогресс целей</h4>
                <div className="goal-progress">
                  <div className="goal-item">
                    <div className="goal-header">
                      <span>Сила</span>
                      <span>65%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '65%'}}></div>
                    </div>
                  </div>
                  <div className="goal-item">
                    <div className="goal-header">
                      <span>Выносливость</span>
                      <span>40%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '40%'}}></div>
                    </div>
                  </div>
                  <div className="goal-item">
                    <div className="goal-header">
                      <span>Гибкость</span>
                      <span>30%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '30%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
