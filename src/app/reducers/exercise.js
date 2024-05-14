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

const initialState = {
  exercises: [],
  isLoading: false,
  error: null,
};

const exercisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EXERCISES:
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
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case REQUEST_DELETE_EXERCISE:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(exercise => exercise.id !== action.payload),
        isLoading: false,
        error: null,
      };
    case ERROR_DELETE_EXERCISE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default exercisesReducer;
