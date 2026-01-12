export const initialWorkouts = [
  {
    id: '1',
    name: 'Утренняя зарядка',
    description: 'Короткая тренировка для пробуждения и заряда энергии на весь день.',
    exercises: [
      {
        ...initialExercises[7], // Бег на месте
        targetTime: 60
      },
      {
        ...initialExercises[6], // Скручивания
        targetReps: 15
      },
      {
        ...initialExercises[9], // Ягодичный мостик
        targetReps: 12
      },
      {
        ...initialExercises[2], // Планка
        targetTime: 30
      }
    ],
    restTime: 30,
    createdAt: '2024-01-10T08:00:00Z'
  },
  {
    id: '2',
    name: 'Тренировка для начинающих',
    description: 'Базовая тренировка для тех, кто только начинает заниматься.',
    exercises: [
      {
        ...initialExercises[0], // Приседания
        targetReps: 10
      },
      {
        ...initialExercises[1], // Отжимания
        targetReps: 8
      },
      {
        ...initialExercises[3], // Выпады
        targetReps: 10
      },
      {
        ...initialExercises[6], // Скручивания
        targetReps: 12
      },
      {
        ...initialExercises[2], // Планка
        targetTime: 20
      }
    ],
    restTime: 45,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    name: 'Интенсивная кардио',
    description: 'Высокоинтенсивная тренировка для сжигания калорий.',
    exercises: [
      {
        ...initialExercises[4], // Берпи
        targetReps: 10
      },
      {
        ...initialExercises[12], // Прыжки на скакалке
        targetTime: 90
      },
      {
        ...initialExercises[7], // Бег на месте
        targetTime: 60
      },
      {
        ...initialExercises[11], // Велосипед
        targetTime: 45
      },
      {
        ...initialExercises[0], // Приседания
        targetReps: 15
      }
    ],
    restTime: 20,
    createdAt: '2024-01-20T18:00:00Z'
  },
  {
    id: '4',
    name: 'Силовая тренировка',
    description: 'Тренировка с акцентом на развитие силы.',
    exercises: [
      {
        ...initialExercises[0], // Приседания
        targetReps: 12,
        targetWeight: 20
      },
      {
        ...initialExercises[1], // Отжимания
        targetReps: 10
      },
      {
        ...initialExercises[13], // Тяга гантели
        targetReps: 8,
        targetWeight: 12
      },
      {
        ...initialExercises[8], // Махи гантелями
        targetReps: 12,
        targetWeight: 5
      },
      {
        ...initialExercises[9], // Ягодичный мостик
        targetReps: 15
      }
    ],
    restTime: 60,
    createdAt: '2024-01-25T19:00:00Z'
  }
]
