import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Exercises from './pages/Exercises'
import WorkoutBuilder from './pages/WorkoutBuilder'
import WorkoutSession from './pages/WorkoutSession'
import Profile from './pages/Profile'
import { initialExercises } from './data/exercises'
import { initialWorkouts } from './data/workouts'

function App() {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('userData')
    return saved ? JSON.parse(saved) : {
      name: 'Вася',
      height: 175,
      weight: 75,
      age: 25,
      fitnessLevel: 'beginner',
      goal: 'muscle_gain'
    }
  })

  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem('exercises')
    return saved ? JSON.parse(saved) : initialExercises
  })

  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('workouts')
    return saved ? JSON.parse(saved) : initialWorkouts
  })

  const [character, setCharacter] = useState(() => {
    const saved = localStorage.getItem('character')
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
    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('exercises', JSON.stringify(exercises))
    localStorage.setItem('workouts', JSON.stringify(workouts))
    localStorage.setItem('character', JSON.stringify(character))
  }, [userData, exercises, workouts, character])

  const addExercise = (newExercise) => {
    setExercises([...exercises, {
      ...newExercise,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }])
  }

  const updateExercise = (id, updatedExercise) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, ...updatedExercise } : ex
    ))
  }

  const deleteExercise = (id) => {
    setExercises(exercises.filter(ex => ex.id !== id))
  }

  const addWorkout = (newWorkout) => {
    setWorkouts([...workouts, {
      ...newWorkout,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }])
  }

  const completeWorkout = (workoutId, stats) => {
    // Обновляем опыт персонажа
    const xpGained = stats.duration * 0.1 + stats.exercisesCompleted * 10
    const coinsGained = Math.floor(xpGained / 10)
    
    setCharacter(prev => ({
      ...prev,
      xp: prev.xp + xpGained,
      coins: prev.coins + coinsGained,
      level: prev.xp + xpGained >= prev.level * 1000 ? prev.level + 1 : prev.level
    }))
  }

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container">
            <Link to="/" className="logo">
              <i className="fas fa-dumbbell"></i>
              <span>FitGame</span>
            </Link>
            <nav className="nav">
              <Link to="/" className="nav-link">
                <i className="fas fa-home"></i> Главная
              </Link>
              <Link to="/exercises" className="nav-link">
                <i className="fas fa-list"></i> Упражнения
              </Link>
              <Link to="/workout-builder" className="nav-link">
                <i className="fas fa-plus-circle"></i> Конструктор
              </Link>
              <Link to="/profile" className="nav-link">
                <i className="fas fa-user"></i> Профиль
              </Link>
            </nav>
            <div className="user-info">
              <span className="level">Уровень {character.level}</span>
              <span className="coins">
                <i className="fas fa-coins"></i> {character.coins}
              </span>
            </div>
          </div>
        </header>

        <main className="main">
          <div className="container">
            <Routes>
              <Route path="/" element={
                <Home 
                  workouts={workouts}
                  character={character}
                  userData={userData}
                />
              } />
              <Route path="/exercises" element={
                <Exercises 
                  exercises={exercises}
                  onAddExercise={addExercise}
                  onUpdateExercise={updateExercise}
                  onDeleteExercise={deleteExercise}
                />
              } />
              <Route path="/workout-builder" element={
                <WorkoutBuilder 
                  exercises={exercises}
                  onAddWorkout={addWorkout}
                  userData={userData}
                />
              } />
              <Route path="/workout/:id" element={
                <WorkoutSession 
                  workouts={workouts}
                  onCompleteWorkout={completeWorkout}
                />
              } />
              <Route path="/profile" element={
                <Profile 
                  character={character}
                  userData={userData}
                  setUserData={setUserData}
                  setCharacter={setCharacter}
                />
              } />
            </Routes>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p>© 2024 FitGame - Фитнес приложение с элементами геймификации</p>
            <p>Создано для олимпиады по программированию</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
