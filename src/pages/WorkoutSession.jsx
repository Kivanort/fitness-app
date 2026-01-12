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
    const exercisesCompleted
