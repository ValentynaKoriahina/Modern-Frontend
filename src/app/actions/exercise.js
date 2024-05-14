import axios from 'misc/requests';
import config from 'config';

import {
  ERROR_RECEIVE_EXERCISES,
  REQUEST_EXERCISES,
  RECEIVE_EXERCISES,
  ADD_EXERCISE,
  EDIT_EXERCISE,
  DELETE_EXERCISE,
  REQUEST_DELETE_EXERCISE,
  ERROR_DELETE_EXERCISE,
} from '../constants/actionTypes';

// Действия для получения списка уроков
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

// Функция для получения списка уроков с сервера
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
    "attempts": []
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
    "attempts": []
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
    "attempts": []
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
    "attempts": []
  }
];

const fetchExercises = () => (dispatch) => {
  dispatch(requestExercises()); // Диспатч действия о начале запроса

  return getExercises()
    .then(exercises => {
      dispatch(receiveExercises(exercises)); // Диспатч действия о получении упражнений
    })
    .catch(error => {
      console.error('Failed to fetch exercises:', error);
      dispatch(errorExercises('Failed to fetch exercises.'));
    });
};


const getExercises = () => {
  const { EXERCISES_SERVICE } = config;
  return axios.get(`${EXERCISES_SERVICE}/exercises/get`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      // Возвращаем моковый ответ в локальном обработчике ошибок
      return MOCK_EXERCISES_RESPONSE;
    });
};


// Дії для видалення вправи
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


// Асинхронное действие для удаления упражнения
const deleteExercise = (exerciseId) => (dispatch) => {
  dispatch(requestDeleteExercise()); // Диспатч действия о начале удаления

  return axios.delete(`${config.EXERCISES_SERVICE}/exercises/delete/${exerciseId}`)
    .then(response => {
      dispatch(deleteExerciseSuccess(exerciseId));
    })
    .catch(error => {
      console.error('Failed to delete exercise:', error);
      return mockDeleteExercise(exerciseId)
        .then(() => {
          dispatch(deleteExerciseSuccess(exerciseId));
        })
        .catch(mockError => {
          console.error('Failed to delete exercise:', error);
          dispatch(errorDeleteExercise('Failed to delete exercise.'));
          throw error;
        });
      // console.error('Failed to delete exercise:', error);
      // dispatch(errorDeleteExercise('Failed to delete exercise.'));
      // throw error;
    });
};

// Моковая функция для удаления упражнения
const mockDeleteExercise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = false;

      if (isSuccess) {
        resolve();
      } else {
        reject(new Error('Ошибка удаления сущности'));
      }
    }, 1000);
  });
};


export { fetchExercises, deleteExercise };
