import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Встроенные данные для упражнений
const initialExercises = [
  {
    id: '1',
    name: 'Приседания',
    description: 'Базовое упражнение для развития мышц ног и ягодиц.',
    instructions: [
      'Встаньте прямо, ноги на ширине плеч',
      'Начните опускаться, отводя таз назад',
      'Опускайтесь до параллели бедер с полом',
      'Вернитесь в исходное положение'
    ],
    difficulty: 'medium',
    equipment: [],
    tags: ['ноги', 'ягодицы', 'силовое', 'базовое'],
    defaultReps: 15,
    caloriesPerMinute: 8
  },
  {
    id: '2',
    name: 'Отжимания',
    description: 'Эффективное упражнение для грудных мышц и трицепсов.',
    instructions: [
      'Примите упор лежа, руки на ширине плеч',
      'Опустите тело, сгибая локти',
      'Коснитесь грудью пола',
      'Вернитесь в исходное положение'
    ],
    difficulty: 'medium',
    equipment: [],
    tags: ['грудь', 'руки', 'силовое', 'верх тела'],
    defaultReps: 10,
    caloriesPerMinute: 7
  },
  {
    id: '3',
    name: 'Планка',
    description: 'Упражнение для укрепления мышц кора и всего тела.',
    instructions: [
      'Примите положение упора на предплечьях',
      'Держите тело прямо, как струна',
      'Напрягите пресс и ягодицы',
      'Держите положение'
    ],
    difficulty: 'medium',
    equipment: [],
    tags: ['пресс', 'кор', 'статическое', 'все тело'],
    defaultTime: 30,
    caloriesPerMinute: 5
  },
  {
    id: '4',
    name: 'Выпады',
    description: 'Упражнение для ног с акцентом на ягодицы.',
    instructions: [
      'Встаньте прямо, ноги вместе',
      'Сделайте шаг вперед',
      'Опуститесь до касания коленом пола',
      'Вернитесь в исходное положение'
    ],
    difficulty: 'medium',
    equipment: [],
    tags: ['ноги', 'ягодицы', 'баланс', 'силовое'],
    defaultReps: 12,
    caloriesPerMinute: 6
  },
  {
    id: '5',
    name: 'Берпи',
    description: 'Кардио-упражнение для всего тела.',
    instructions: [
      'Из положения стоя присядьте',
      'Поставьте руки на пол',
      'Отпрыгните ногами назад в планку',
      'Сделайте отжимание',
      'Верните ноги к рукам',
      'Выпрыгните вверх'
    ],
    difficulty: 'hard',
    equipment: [],
    tags: ['кардио', 'все тело', 'выносливость', 'продвинутое'],
    defaultReps: 8,
    caloriesPerMinute: 12
  },
  {
    id: '6',
    name: 'Подтягивания',
    description: 'Упражнение для развития мышц спины и рук.',
    instructions: [
      'Возьмитесь за перекладину прямым хватом',
      'Повисните на прямых руках',
      'Подтянитесь до касания подбородком перекладины',
      'Медленно опуститесь'
    ],
    difficulty: 'hard',
    equipment: ['турник'],
    tags: ['спина', 'руки', 'силовое', 'верх тела'],
    defaultReps: 5,
    caloriesPerMinute: 9
  },
  {
    id: '7',
    name: 'Скручивания',
    description: 'Упражнение для пресса.',
    instructions: [
      'Лягте на спину, согните ноги',
      'Руки за голову или скрестите на груди',
      'Поднимите верхнюю часть тела',
      'Напрягите пресс в верхней точке',
      'Медленно опуститесь'
    ],
    difficulty: 'easy',
    equipment: ['коврик'],
    tags: ['пресс', 'кор', 'легкое', 'изоляция'],
    defaultReps: 20,
    caloriesPerMinute: 4
  },
  {
    id: '8',
    name: 'Бег на месте',
    description: 'Кардио-упражнение для разминки.',
    instructions: [
      'Встаньте прямо',
      'Начните бежать на месте',
      'Поднимайте колени высоко',
      'Работайте руками'
    ],
    difficulty: 'easy',
    equipment: [],
    tags: ['кардио', 'разминка', 'легкое', 'ноги'],
    defaultTime: 60,
    caloriesPerMinute: 10
  },
  {
    id: '9',
    name: 'Махи гантелями',
    description: 'Упражнение для плеч.',
    instructions: [
      'Возьмите гантели, встаньте прямо',
      'Немного согните локти',
      'Поднимите гантели через стороны до уровня плеч',
      'Медленно опустите'
    ],
    difficulty: 'medium',
    equipment: ['гантели'],
    tags: ['плечи', 'руки', 'силовое', 'снаряд'],
    defaultReps: 12,
    defaultWeight: 5,
    caloriesPerMinute: 6
  },
  {
    id: '10',
    name: 'Ягодичный мостик',
    description: 'Упражнение для ягодиц и задней поверхности бедра.',
    instructions: [
      'Лягте на спину, согните ноги',
      'Руки вдоль тела',
      'Поднимите таз максимально высоко',
      'Напрягите ягодицы в верхней точке',
      'Медленно опуститесь'
    ],
    difficulty: 'easy',
    equipment: ['коврик'],
    tags: ['ягодицы', 'ноги', 'легкое', 'изоляция'],
    defaultReps: 15,
    caloriesPerMinute: 5
  }
]

// Встроенные данные для тренировок
const initialWorkouts = [
  {
    id: '1',
    name: 'Утренняя зарядка',
    description: 'Короткая тренировка для пробуждения и заряда энергии на весь день.',
    exercises: [
      { ...initialExercises[7], targetTime: 60 },
      { ...initialExercises[6], targetReps: 15 },
      { ...initialExercises[9], targetReps: 12 },
      { ...initialExercises[2], targetTime: 30 }
    ],
    restTime: 30,
    createdAt: '2024-01-10T08:00:00Z'
  },
  {
    id: '2',
    name: 'Тренировка для начинающих',
    description: 'Базовая тренировка для тех, кто только начинает заниматься.',
    exercises: [
      { ...initialExercises[0], targetReps: 10 },
      { ...initialExercises[1], targetReps: 8 },
      { ...initialExercises[3], targetReps: 10 },
      { ...initialExercises[6], targetReps: 12 },
      { ...initialExercises[2], targetTime: 20 }
    ],
    restTime: 45,
    createdAt: '2024-01-15T10:00:00Z'
  }
]

// Компонент домашней страницы
function Home() {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <h1>Добро пожаловать в FitGame!</h1>
          <p>Ваше фитнес-приложение с элементами геймификации</p>
          <div className="hero-stats">
            <div className="stat-card">
              <i className="fas fa-fire"></i>
              <h3>{initialWorkouts.length}</h3>
              <p>Тренировок</p>
            </div>
            <div className="stat-card">
              <i className="fas fa-dumbbell"></i>
              <h3>{initialExercises.length}</h3>
              <p>Упражнений</p>
            </div>
            <div className="stat-card">
              <i className="fas fa-user"></i>
              <h3>1</h3>
              <p>Активный пользователь</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Быстрый старт</h2>
        <div className="quick-actions grid-2">
          <Link to="/exercises" className="quick-action-card card">
            <i className="fas fa-list"></i>
            <h3>Каталог упражнений</h3>
            <p>Изучите {initialExercises.length} упражнений</p>
          </Link>
          <Link to="/workout-builder" className="quick-action-card card">
            <i className="fas fa-plus-circle"></i>
            <h3>Конструктор тренировок</h3>
            <p>Создайте свою первую тренировку</p>
          </Link>
        </div>
      </div>

      <div className="motivation-section">
        <div className="motivation-card card">
          <i className="fas fa-quote-left"></i>
          <p>Сила не в том, чтобы никогда не падать, а в том, чтобы подниматься каждый раз, когда падаешь.</p>
          <div className="motivation-author">- Конфуций</div>
        </div>
      </div>
    </div>
  )
}

// Компонент страницы упражнений
function Exercises() {
  const [exercises, setExercises] = useState(initialExercises)
  const [filters, setFilters] = useState({
    difficulty: [],
    equipment: [],
    tags: []
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50'
      case 'medium': return '#FF9800'
      case 'hard': return '#F44336'
      default: return '#666'
    }
  }

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Легкое'
      case 'medium': return 'Среднее'
      case 'hard': return 'Сложное'
      default: return difficulty
    }
  }

  return (
    <div className="exercises-page">
      <div className="page-header">
        <h1>Каталог упражнений</h1>
      </div>

      <div className="exercises-grid grid-3">
        {exercises.map(exercise => (
          <div key={exercise.id} className="exercise-card card">
            <div className="exercise-header">
              <h3>{exercise.name}</h3>
              <span 
                className="difficulty-badge"
                style={{ 
                  backgroundColor: getDifficultyColor(exercise.difficulty),
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem'
                }}
              >
                {getDifficultyText(exercise.difficulty)}
              </span>
            </div>

            <p className="exercise-description">{exercise.description}</p>

            <div className="exercise-instructions">
              <h4>Инструкция:</h4>
              <ol>
                {exercise.instructions.slice(0, 3).map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ol>
            </div>

            <div className="exercise-tags">
              {exercise.tags.slice(0, 5).map(tag => (
                <span key={tag} className="tag" style={{
                  background: '#f0f0f0',
                  color: '#555',
                  padding: '4px 10px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  display: 'inline-block',
                  margin: '2px'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="exercise-meta">
              {exercise.defaultReps && (
                <span className="meta-item">
                  <i className="fas fa-redo"></i> {exercise.defaultReps} повт.
                </span>
              )}
              {exercise.defaultTime && (
                <span className="meta-item">
                  <i className="fas fa-clock"></i> {exercise.defaultTime} сек
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Компонент конструктора тренировок
function WorkoutBuilder() {
  const [selectedExercises, setSelectedExercises] = useState([])
  const [workoutName, setWorkoutName] = useState('Моя тренировка')

  return (
    <div className="workout-builder">
      <h1>Конструктор тренировок</h1>

      <div className="workout-form card">
        <div className="form-group">
          <label className="form-label">Название тренировки</label>
          <input
            type="text"
            className="form-control"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
        </div>
      </div>

      <div className="builder-sections grid-2">
        <div className="available-exercises card">
          <h3>Доступные упражнения ({initialExercises.length})</h3>
          <div className="exercises-list">
            {initialExercises.map(exercise => (
              <div
                key={exercise.id}
                className="exercise-item"
                onClick={() => {
                  setSelectedExercises([...selectedExercises, {
                    ...exercise,
                    targetReps: exercise.defaultReps,
                    targetTime: exercise.defaultTime
                  }])
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}
              >
                <div className="exercise-item-content">
                  <h4>{exercise.name}</h4>
                  <div className="exercise-tags">
                    {exercise.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="tag small">{tag}</span>
                    ))}
                  </div>
                </div>
                <i className="fas fa-plus" style={{color: 'var(--primary-color)'}}></i>
              </div>
            ))}
          </div>
        </div>

        <div className="selected-exercises card">
          <h3>Выбранные упражнения ({selectedExercises.length})</h3>
          {selectedExercises.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-clipboard-list"></i>
              <p>Выберите упражнения из списка слева</p>
            </div>
          ) : (
            <div className="selected-list">
              {selectedExercises.map((exercise, index) => (
                <div key={index} className="workout-exercise card" style={{marginBottom: '1rem'}}>
                  <div className="exercise-info">
                    <h4>{exercise.name}</h4>
                    <p>{exercise.description}</p>
                    {exercise.targetReps && (
                      <p>Цель: {exercise.targetReps} повторений</p>
                    )}
                    {exercise.targetTime && (
                      <p>Цель: {exercise.targetTime} секунд</p>
                    )}
                  </div>
                  <button 
                    className="btn btn-danger"
                    onClick={() => {
                      setSelectedExercises(selectedExercises.filter((_, i) => i !== index))
                    }}
                  >
                    <i className="fas fa-trash"></i> Удалить
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="workout-actions" style={{marginTop: '2rem', textAlign: 'center'}}>
        <button className="btn btn-primary" onClick={() => {
          if (selectedExercises.length === 0) {
            alert('Добавьте хотя бы одно упражнение!')
            return
          }
          alert(`Тренировка "${workoutName}" сохранена!`)
          setSelectedExercises([])
          setWorkoutName('Моя тренировка')
        }}>
          <i className="fas fa-save"></i> Сохранить тренировку
        </button>
      </div>
    </div>
  )
}

// Компонент профиля
function Profile() {
  const [character, setCharacter] = useState({
    level: 1,
    xp: 0,
    coins: 100,
    bodyType: 'average',
    hairStyle: 'short',
    outfit: 'basic',
    achievements: []
  })

  const [userData, setUserData] = useState({
    name: 'Вася',
    height: 175,
    weight: 75,
    age: 25,
    fitnessLevel: 'beginner',
    goal: 'muscle_gain'
  })

  const achievements = [
    { id: 1, name: 'Первая тренировка', description: 'Завершите свою первую тренировку', icon: 'fas fa-star', unlocked: true },
    { id: 2, name: 'Спортсмен недели', description: 'Занимайтесь 5 дней подряд', icon: 'fas fa-trophy', unlocked: false },
    { id: 3, name: 'Силач', description: 'Выполните 1000 повторений', icon: 'fas fa-dumbbell', unlocked: true }
  ]

  return (
    <div className="profile-page">
      <div className="profile-header card">
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
      </div>

      <div className="profile-content grid-2">
        <div className="profile-section card">
          <h3>Личная информация</h3>
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
          </div>
        </div>

        <div className="achievements-section card">
          <h3>Достижения</h3>
          <div className="achievements-list">
            {achievements.map(achievement => (
              <div key={achievement.id} className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
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
      </div>
    </div>
  )
}

// Главный компонент приложения
function App() {
  const [character, setCharacter] = useState(() => {
    const saved = localStorage.getItem('fitgame_character')
    return saved ? JSON.parse(saved) : {
      level: 1,
      xp: 0,
      coins: 100,
      bodyType: 'average',
      hairStyle: 'short',
      outfit: 'basic',
      achievements: []
    }
  })

  useEffect(() => {
    localStorage.setItem('fitgame_character', JSON.stringify(character))
  }, [character])

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container">
            <Link to="/" className="logo">
              <i className="fas fa-dumbbell"></i>
              <span
