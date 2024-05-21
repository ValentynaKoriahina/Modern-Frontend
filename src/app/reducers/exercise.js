import {
  ERROR_RECEIVE_EXERCISES,
  REQUEST_EXERCISES,
  RECEIVE_EXERCISES,
  ADD_EXERCISE,
  REQUEST_ADD_EXERCISE,
  ERROR_ADD_EXERCISE,
  EDIT_EXERCISE,
  REQUEST_EDIT_EXERCISE,
  ERROR_EDIT_EXERCISE,
  DELETE_EXERCISE,
  REQUEST_DELETE_EXERCISE,
  ERROR_DELETE_EXERCISE,
} from '../constants/actionTypes';

const initialState = {
  exercises: [],
  isLoading: false,
  error: null,
};

const exercisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EXERCISES:
    case REQUEST_DELETE_EXERCISE:
    case REQUEST_ADD_EXERCISE:
    case REQUEST_EDIT_EXERCISE:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case RECEIVE_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
        isLoading: false,
        error: null,
      };
    case ERROR_RECEIVE_EXERCISES:
    case ERROR_DELETE_EXERCISE:
    case ERROR_ADD_EXERCISE:
    case ERROR_EDIT_EXERCISE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(exercise => exercise.id !== action.payload),
        isLoading: false,
        error: null,
      };
    case ADD_EXERCISE:
      console.log('State after ADD_EXERCISE:', [...state.exercises, action.payload]);

      return {
        ...state,
        exercises: [...state.exercises, action.payload],
        isLoading: false,
        error: null,
      };
    case EDIT_EXERCISE:
      const updatedExercises = state.exercises.map(exercise =>
        exercise.id === action.payload.id ? action.payload : exercise
      );

      console.log('Updated exercises:', updatedExercises);

      return {
        ...state,
        exercises: updatedExercises,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default exercisesReducer;
