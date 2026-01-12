import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/components.css'

function Home({ workouts, character, userData }) {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <h1>Добро пожаловать, {userData.name}!</h1>
          <p>Начни свой путь к идеальной форме с элементами игры</p>
          <div className="hero-stats">
            <div className="stat-card">
              <i className="fas fa-fire"></i>
              <h3>{workouts.length}</h3>
              <p>Тренировок</p>
            </div>
            <div className="stat-card">
              <i className="fas fa-trophy"></i>
              <h3>{character.level}</h3>
              <p>Уровень</p>
            </div>
            <div className="stat-card">
              <i className="fas fa-coins"></i>
              <h3>{character.coins}</h3>
              <p>Монет</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Твои тренировки</h2>
        <div className="workouts-grid">
          {workouts.slice(0, 3).map(workout => (
            <div key={workout.id} className="workout-card">
              <h3>{workout.name}</h3>
              <p>{workout.description}</p>
              <div className="workout-meta">
                <span>
                  <i className="fas fa-dumbbell"></i> {workout.exercises.length} упр.
                </span>
                <span>
                  <i className="fas fa-clock"></i> {Math.ceil(workout.exercises.length * 2)} мин
                </span>
              </div>
              <Link to={`/workout/${workout.id}`} className="btn btn-primary">
                Начать тренировку
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/workout-builder" className="btn btn-outline">
            <i className="fas fa-plus"></i> Создать новую тренировку
          </Link>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Быстрый старт</h2>
        <div className="quick-actions grid-2">
          <Link to="/exercises" className="quick-action-card">
            <i className="fas fa-list"></i>
            <h3>Каталог упражнений</h3>
            <p>Выбери из {workouts.reduce((acc, w) => acc + w.exercises.length, 0)} упражнений</p>
          </Link>
          <Link to="/profile" className="quick-action-card">
            <i className="fas fa-user"></i>
            <h3>Мой профиль</h3>
            <p>Настрой персонажа и отслеживай прогресс</p>
          </Link>
        </div>
      </div>

      <div className="motivation-section">
        <div className="motivation-card">
          <i className="fas fa-quote-left"></i>
          <p>Сила не в том, чтобы никогда не падать, а в том, чтобы подниматься каждый раз, когда падаешь.</p>
          <div className="motivation-author">- Конфуций</div>
        </div>
      </div>
    </div>
  )
}

export default Home
