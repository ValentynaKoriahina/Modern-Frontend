import axios from 'misc/requests';
import config from 'config';

import {
  ERROR_RECEIVE_EXERCISES,
  REQUEST_EXERCISES,
  RECEIVE_EXERCISES,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  REQUEST_DELETE_EXERCISE,
  ERROR_DELETE_EXERCISE,
  REQUEST_ADD_EXERCISE,
  ERROR_ADD_EXERCISE,
  EDIT_EXERCISE,
  REQUEST_EDIT_EXERCISE,
  ERROR_EDIT_EXERCISE,
} from '../constants/actionTypes';

// Дії отримання списку задач
const receiveExercises = (exercises) => ({
  type: RECEIVE_EXERCISES,
  payload: exercises,
});

const requestExercises = () => ({
  type: REQUEST_EXERCISES,
});

const errorExercises = (error) => ({
  type: ERROR_RECEIVE_EXERCISES,
  payload: error,
});


const MOCK_EXERCISES_RESPONSE = [
  {
    "id": 1,
    "topic": "Техніки прогону фігур суперника для отримання тактичної переваги.",
    "difficultyRange": 3,
    "studentLevel": 3,
    "mode": "classic",
    "type": "Проблемные задачи",
    "tags": [
      "#прогін",
      "#тактична_перевага"
    ],
    "solutionStrategy": "Прогін",
    "PGN": "[Event \"Тренування\"]\n[Site \"Клуб\"]\n[Date \"2024.04.17\"]\n[Round \"-\"]\n[White \"Учень21\"]\n[Black \"Учень22\"]\n[Result \"*\"]\n\n1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6",
    "targetSkills": "Тактична обізнаність, Планування нападу",
    "rate": 4,
    "attempts": [],
    "lessonId": 1
  },
  {
    "id": 2,
    "topic": "Стратегії і прийоми для створення та використання зв'язок між фігурами.",
    "difficultyRange": 4,
    "studentLevel": 4,
    "mode": "classic",
    "type": "Комбинационные задачи",
    "tags": [
      "#зв'язка",
      "#стратегія"
    ],
    "solutionStrategy": "Зв'язка",
    "PGN": "[Event \"Тренування\"]\n[Site \"Клуб\"]\n[Date \"2024.04.18\"]\n[Round \"-\"]\n[White \"Учень23\"]\n[Black \"Учень24\"]\n[Result \"*\"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Be2 O-O",
    "targetSkills": "Аналіз позиції, Вибір стратегії",
    "rate": 3,
    "attempts": [],
    "lessonId": 1
  },
  {
    "id": 3,
    "topic": "Основи подвійного удару для одночасної атаки на кілька фігур.",
    "difficultyRange": 3,
    "studentLevel": 3,
    "mode": "classic",
    "type": "Комбинационные задачи",
    "tags": [
      "#подвійний_удар",
      "#атака"
    ],
    "solutionStrategy": "Подвійний удар",
    "PGN": "[Event \"Тренування\"]\n[Site \"Клуб\"]\n[Date \"2024.04.19\"]\n[Round \"-\"]\n[White \"Учень25\"]\n[Black \"Учень26\"]\n[Result \"*\"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5",
    "targetSkills": "Тактична обізнаність, Планування нападу",
    "rate": 4,
    "attempts": [],
    "lessonId": 1
  },
  {
    "id": 4,
    "topic": "Застосування техніки відволікання для підвищення ефективності атаки.",
    "difficultyRange": 4,
    "studentLevel": 4,
    "mode": "classic",
    "type": "Атака на короля",
    "tags": [
      "#відволікання",
      "#ефективність_атаки"
    ],
    "solutionStrategy": "Відволікання",
    "PGN": "[Event \"Тренування\"]\n[Site \"Клуб\"]\n[Date \"2024.04.20\"]\n[Round \"-\"]\n[White \"Учень27\"]\n[Black \"Учень28\"]\n[Result \"*\"]\n\n1. e4 c6 2. d4 d5 3. e5 Bf5 4. Nc3 e6 5. g4 Bg6 6. Nge2",
    "targetSkills": "Планування нападу, Тактична обізнаність",
    "rate": 5,
    "attempts": [],
    "lessonId": 1
  },
  {
    "id": 5,
    "topic": "Ефективне використання рентгенівських ударів для атаки через інші фігури.",
    "difficultyRange": 5,
    "studentLevel": 5,
    "mode": "classic",
    "type": "Рентген",
    "tags": [
      "#рентген",
      "#атака_через_фігури"
    ],
    "solutionStrategy": "Рентген",
    "PGN": "[Event \"Тренування\"]\n[Site \"Клуб\"]\n[Date \"2024.05.04\"]\n[Round \"-\"]\n[White \"Учень55\"]\n[Black \"Учень56\"]\n[Result \"*\"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Bd2 Bxd2+ 8. Nbxd2 d5 9. exd5 Nxd5",
    "targetSkills": "Планування нападу, Вибір стратегії",
    "rate": 5,
    "attempts": [
      {
        "studentId": 21,
        "timeSpent": "00:25:00",
        "attemptsCount": 3,
        "solved": true
      },
      {
        "studentId": 22,
        "timeSpent": "00:40:00",
        "attemptsCount": 5,
        "solved": false
      }
    ],
    "lessonId": 2
  },
  {
    "id": 6,
    "topic": "Тактики прогону фігур для зайняття ключових позицій на дошці.",
    "difficultyRange": 3,
    "studentLevel": 3,
    "mode": "classic",
    "type": "Прогін",
    "tags": [
      "#прогін",
      "#зайняття_позицій"
    ],
    "solutionStrategy": "Прогнати",
    "PGN": "[Event \"Тренування\"]\n[Site \"Клуб\"]\n[Date \"2024.05.05\"]\n[Round \"-\"]\n[White \"Учень57\"]\n[Black \"Учень58\"]\n[Result \"*\"]\n\n1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 O-O 5. a3 Bxc3+ 6. Qxc3 Ne4 7. Qc2 f5",
    "targetSkills": "Тактична обізнаність, Планування нападу",
    "rate": 4,
    "attempts": [
      {
        "studentId": 23,
        "timeSpent": "00:15:00",
        "attemptsCount": 2,
        "solved": true
      },
      {
        "studentId": 24,
        "timeSpent": "00:30:00",
        "attemptsCount": 4,
        "solved": true
      }
    ],
    "lessonId": 2
  },
  {
    "id": 7,
    "topic": "Використання перекриття для захисту короля та інших важливих фігур.",
    "difficultyRange": 3,
    "studentLevel": 3,
    "mode": "classic",
    "type": "Защита короля",
    "tags": [
      "#перекриття",
      "#захист_короля"
    ],
    "solutionStrategy": "Перекриття",
    "PGN": "[Event \"Тренування\"]\n[Site \"Клуб\"]\n[Date \"2024.05.06\"]\n[Round \"-\"]\n[White \"Учень59\"]\n[Black \"Учень60\"]\n[Result \"*\"]\n\n1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5 7. Nb3 Be6 8. f3 Be7 9. Qd2 O-O",
    "targetSkills": "Захист і контратака, Аналіз позиції",
    "rate": 4,
    "attempts": [
      {
        "studentId": 25,
        "timeSpent": "00:20:00",
        "attemptsCount": 1,
        "solved": true
      },
      {
        "studentId": 26,
        "timeSpent": "00:45:00",
        "attemptsCount": 2,
        "solved": false
      }
    ],
    "lessonId": 2
  },
  {
    "id": 8,
    "topic": "Стратегії обміну фігур для спрощення позиції та підвищення шансів на перемогу.",
    "difficultyRange": 2,
    "studentLevel": 2,
    "mode": "classic",
    "type": "Обмін",
    "tags": [
      "#обмін",
      "#спрощення_позиції"
    ],
    "solutionStrategy": "Обмін",
    "PGN": "[Event \"Тренування\"]\n[Site \"Клуб\"]\n[Date \"2024.05.07\"]\n[Round \"-\"]\n[White \"Учень61\"]\n[Black \"Учень62\"]\n[Result \"*\"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c5 12. d5",
    "targetSkills": "Тактична обізнаність, Вибір стратегії",
    "rate": 3,
    "attempts": [
      {
        "studentId": 27,
        "timeSpent": "00:10:00",
        "attemptsCount": 1,
        "solved": true
      },
      {
        "studentId": 28,
        "timeSpent": "00:25:00",
        "attemptsCount": 3,
        "solved": true
      }
    ],
    "lessonId": 2
  },
  {
    "id": 9,
    "topic": "Побудова взаємодії між фігурами для створення непробивних позицій.",
    "difficultyRange": 5,
    "studentLevel": 5,
    "mode": "classic",
    "type": "Взаємодія",
    "tags": [
      "#взаємодія",
      "#непробивні_позиції"
    ],
    "solutionStrategy": "Взаємодія",
    "PGN": "[Event \"Тренування\"]\n[Site \"Клуб\"]\n[Date \"2024.05.08\"]\n[Round \"-\"]\n[White \"Учень63\"]\n[Black \"Учень64\"]\n[Result \"*\"]\n\n1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Ba6 5. b3 Bb4+ 6. Bd2 Be7 7. Bg2 c6 8. O-O d5 9. Ne5 O-O 10. Bc3 Ne4 11. Bb2 f6 12. Nd3 Nd7",
    "targetSkills": "Планування нападу, Захист і контратака",
    "rate": 5,
    "attempts": [
      {
        "studentId": 29,
        "timeSpent": "00:30:00",
        "attemptsCount": 2,
        "solved": true
      },
      {
        "studentId": 30,
        "timeSpent": "01:00:00",
        "attemptsCount": 5,
        "solved": false
      }
    ],
    "lessonId": 2
  },
  {
    "id": 10,
    "topic": "Стратегії для використання двойних ударів, щоб одночасно атакувати кілька цілей.",
    "difficultyRange": 3,
    "studentLevel": 3,
    "mode": "classic",
    "type": "Комбинационные задачи",
    "tags": [
      "#подвійний_удар",
      "#стратегія"
    ],
    "solutionStrategy": "Подвійний удар",
    "PGN": "[Event \"Тренування\"]\n[Site \"Клуб\"]\n[Date \"2024.04.27\"]\n[Round \"-\"]\n[White \"Учень41\"]\n[Black \"Учень42\"]\n[Result \"*\"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Qf6 5. d4 exd4",
    "targetSkills": "Тактична обізнаність, Планування нападу",
    "rate": 4,
    "attempts": [],
    "lessonId": 3
  },
  {
    "id": 11,
    "topic": "Використання техніки відволікання для зміни фокусу атаки противника.",
    "difficultyRange": 4,
    "studentLevel": 4,
    "mode": "classic",
    "type": "Відволікання",
    "tags": [
      "#відволікання",
      "#тактика"
    ],
    "solutionStrategy": "Відволікання",
    "PGN": "[Event \"Тренування\"]\n[Site \"Клуб\"]\n[Date \"2024.04.28\"]\n[Round \"-\"]\n[White \"Учень43\"]\n[Black \"Учень44\"]\n[Result \"*\"]\n1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 c5 7. d5 e6",
    "targetSkills": "Тактична обізнаність, Аналіз позиції",
    "rate": 3,
    "attempts": [],
    "lessonId": 3
  },
  {
    "id": 12,
    "topic": "Застосування зв'язок для контролю та домінування на дошці.",
    "difficultyRange": 4,
    "studentLevel": 4,
    "mode": "classic",
    "type": "Зв'язка",
    "tags": [
      "#зв'язка",
      "#домінування"
    ],
    "solutionStrategy": "Зв'язка",
    "PGN": "[Event \"Тренування\"][Site \"Клуб\"][Date \"2024.04.29\"][Round \"-\"][White \"Учень45\"][Black \"Учень46\"][Result \"*\"]\n1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be2 e5 7. Nb3 Be7 8. Be3 Be6",
    "targetSkills": "Планування нападу, Вибір стратегії",
    "rate": 5,
    "attempts": [],
    "lessonId": 3
  },
  {
    "id": 13,
    "topic": "Підготовка та реалізація стратегії відкритої атаки для максимального тиску.",
    "difficultyRange": 4,
    "studentLevel": 4,
    "mode": "classic",
    "type": "Відкрита атака",
    "tags": [
      "#відкрита_атака",
      "#тиск"
    ],
    "solutionStrategy": "Відкрита атака",
    "PGN": "[Event \"Тренування\"][Site \"Клуб\"][Date \"2024.04.30\"][Round \"-\"][White \"Учень47\"][Black \"Учень48\"][Result \"*\"]\n1. e4 e6 2. d3 d5 3. Nd2 Nf6 4. Ngf3 dxe4 5. dxe4 e5 6. Bc4 Bd6 7. O-O O-O",
    "targetSkills": "Аналіз позиції, Тактична обізнаність",
    "rate": 4,
    "attempts": [
      {
        "studentId": 13,
        "timeSpent": "00:22:00",
        "attemptsCount": 2,
        "solved": true
      },
      {
        "studentId": 14,
        "timeSpent": "00:40:00",
        "attemptsCount": 3,
        "solved": false
      }
    ],
    "lessonId": 3
  },
  {
    "id": 14,
    "topic": "Ефективне використання рентгенівських ударів для атаки через інші фігури.",
    "difficultyRange": 5,
    "studentLevel": 5,
    "mode": "classic",
    "type": "Рентген",
    "tags": [
      "#рентген",
      "#атака_через_фігури"
    ],
    "solutionStrategy": "Рентген",
    "PGN": "[Event \"Тренування\"][Site \"Клуб\"][Date \"2024.05.01\"][Round \"-\"][White \"Учень49\"][Black \"Учень50\"][Result \"*\"]\n1. e4 c6 2. d4 d5 3. e5 Bf5 4. Nf3 e6 5. Be2 c5 6. Be3 Qb6 7. Nbd2 Nc6 8. O-O cxd4 9. Nxd4 Nxd4 10. Bxd4 Qxd4",
    "targetSkills": "Планування нападу, Вибір стратегії",
    "rate": 5,
    "attempts": [
      {
        "studentId": 15,
        "timeSpent": "00:35:00",
        "attemptsCount": 1,
        "solved": true
      },
      {
        "studentId": 16,
        "timeSpent": "00:50:00",
        "attemptsCount": 4,
        "solved": false
      }
    ],
    "lessonId": 3
  },
  {
    "id": 15,
    "topic": "Тактики прогону фігур для зайняття ключових позицій на дошці.",
    "difficultyRange": 3,
    "studentLevel": 3,
    "mode": "classic",
    "type": "Прогін",
    "tags": [
      "#прогін",
      "#зайняття_позицій"
    ],
    "solutionStrategy": "Прогін",
    "PGN": "[Event \"Тренування\"][Site \"Клуб\"][Date \"2024.05.02\"][Round \"-\"][White \"Учень51\"][Black \"Учень52\"][Result \"*\"]\n1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 e5 7. Nge2 Nbd7 8. Qd2 a5 9. g4 c6 10. Ng3",
    "targetSkills": "Тактична обізнаність, Планування нападу",
    "rate": 4,
    "attempts": [
      {
        "studentId": 17,
        "timeSpent": "00:18:00",
        "attemptsCount": 2,
        "solved": true
      },
      {
        "studentId": 18,
        "timeSpent": "00:30:00",
        "attemptsCount": 3,
        "solved": true
      }
    ],
    "lessonId": 3
  },
  {
    "id": 16,
    "topic": "Використання перекриття для захисту короля та інших важливих фігур.",
    "difficultyRange": 3,
    "studentLevel": 3,
    "mode": "classic",
    "type": "Защита короля",
    "tags": [
      "#перекриття",
      "#захист_короля"
    ],
    "solutionStrategy": "Перекриття",
    "PGN": "[Event \"Тренування\"][Site \"Клуб\"][Date \"2024.05.03\"][Round \"-\"][White \"Учень53\"][Black \"Учень54\"][Result \"*\"]\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7",
    "targetSkills": "Захист і контратака, Аналіз позиції",
    "rate": 3,
    "attempts": [
      {
        "studentId": 19,
        "timeSpent": "00:20:00",
        "attemptsCount": 1,
        "solved": true
      },
      {
        "studentId": 20,
        "timeSpent": "00:45:00",
        "attemptsCount": 2,
        "solved": false
      }
    ],
    "lessonId": 3
  }
];


const fetchExercises = () => (dispatch) => {
  dispatch(requestExercises());

  return getExercises()
    .then(exercises => {
      dispatch(receiveExercises(exercises));
    })
    .catch(error => {
      console.error('Failed to fetch exercises:', error);
      dispatch(errorExercises('Failed to fetch exercises.'));
    });
};


const getExercises = () => {
  // return Promise.resolve(MOCK_EXERCISES_RESPONSE);
  const { EXERCISES_SERVICE } = config;

  return axios.get(`${EXERCISES_SERVICE}/api/chess_exercise/all`)
    .then(response => {
      console.log(response.data)
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return MOCK_EXERCISES_RESPONSE;
    });
};


// Дії для видалення задачі
const requestDeleteExercise = () => ({
  type: REQUEST_DELETE_EXERCISE,
});

const deleteExerciseSuccess = (exerciseId) => ({
  type: DELETE_EXERCISE,
  payload: exerciseId,
});

const errorDeleteExercise = (error) => ({
  type: ERROR_DELETE_EXERCISE,
  payload: error,
});


const deleteExercise = (exerciseId) => (dispatch) => {
  dispatch(requestDeleteExercise());

  return axios.delete(`${config.EXERCISES_SERVICE}/exercises/delete/${exerciseId}`)
    .then(response => {
      dispatch(deleteExerciseSuccess(exerciseId));
    })
    .catch(error => {
      return mockDeleteExercise(exerciseId)
        .then(() => {
          dispatch(deleteExerciseSuccess(exerciseId));
        })
        .catch(mockError => {
          console.error('Помилка видалення задачі:', error);
          dispatch(errorDeleteExercise('Помилка видалення задачі.'));
          throw error;
        });
        // console.error('Помилка видалення задачі:', error);
        // dispatch(errorDeleteExercise('Помилка видалення задачі.'));
        // throw error;
    });
};

// Мокова функція видалення задачі
const mockDeleteExercise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = true;

      if (isSuccess) {
        resolve();
      } else {
        reject(new Error('Помилка видалення задачі'));
      }
    }, 1000);
  });
};


// Дії додавання задачі
const requestAddExercise = () => ({
  type: REQUEST_ADD_EXERCISE,
});

const addExerciseSuccess = (exercise) => ({
  type: ADD_EXERCISE,
  payload: exercise,
});

const errorAddExercise = (error) => ({
  type: ERROR_ADD_EXERCISE,
  payload: error,
});


const addExercise = (exercise) => (dispatch) => {
  dispatch(requestAddExercise());

  console.log(exercise)

  return axios.post(`${config.EXERCISES_SERVICE}/exercises/add`, exercise)
    .then(response => dispatch(addExerciseSuccess(response.data)))
    .catch(error => {
      return mockAddExercise(exercise)
        .then(() => {
          alert('Задачу збережено')
          dispatch(addExerciseSuccess(exercise));
        })
        .catch(mockError => {
          console.error('Не вдалося додати задачу:', error);
          dispatch(errorAddExercise('Не вдалося додати задачу.'));
          throw error;
        });
        // console.error('Не вдалося додати задачу:', error);
        // dispatch(errorAddExercise('Не вдалося додати задачу.'));
        // throw error;
    });
};

// Мокова функція додавання задачі
const mockAddExercise = (exercise) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = true;

      if (isSuccess) {
        const newExercise = { ...exercise, id: Date.now() };
        resolve(newExercise);
      } else {
        reject(new Error('Помилка додавання задачі'));
      }
    }, 1000);
  });
};


// Дії для редагування задачі
const requestEditExercise = () => ({
  type: REQUEST_EDIT_EXERCISE,
});

const editExerciseSuccess = (exercise) => ({
  type: EDIT_EXERCISE,
  payload: exercise,
});

const errorEditExercise = (error) => ({
  type: ERROR_EDIT_EXERCISE,
  payload: error,
});

const editExercise = (exercise) => (dispatch) => {
  dispatch(requestEditExercise());

  return axios.put(`${config.EXERCISES_SERVICE}/exercises/edit/${exercise.id}`, exercise)
    .then(response => dispatch(editExerciseSuccess(response.data)))
    .catch(error => {
      return mockEditExercise(exercise)
        .then(() => {
          dispatch(editExerciseSuccess(exercise));
        })
        .catch(mockError => {
          console.error('Не вдалося редагувати задачу:', error);
          dispatch(errorEditExercise('Не вдалося редагувати задачу.'));
          throw error;
        });
        // console.error('Не вдалося редагувати задачу:', error);
        // dispatch(errorEditExercise('Не вдалося редагувати задачу.'));
        // throw error;
    });
};

// Моковая функція для редагування задачі
const mockEditExercise = (exercise) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = true;

      if (isSuccess) {
        resolve(exercise);
      } else {
        reject(new Error('Ошибка редагування задачі'));
      }
    }, 1000);
  });
};

export { fetchExercises, deleteExercise, addExercise, editExercise };

