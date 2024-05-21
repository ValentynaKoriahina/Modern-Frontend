import React, { createContext } from 'react';
import { useSelector } from 'react-redux';

export const ExercisesContext = createContext({});

const ExercisesProvider = ({ children }) => {
  const exercises = useSelector((state) => state.exercises.exercises);

  return (
    <ExercisesContext.Provider
      value={exercises}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesProvider;

