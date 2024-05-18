// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ExerciseDetails from '../components/ExerciseDetails'
// import AddExercise from '../components/AddExercise'


// const Exercise = () => {
//   const { id } = useParams();
//   const entity = useSelector(state => state.exercises.exercises.find(e => e.id === parseInt(id, 10)));
//   console.log(id)

//   if (!entity) {
//     return <div>Задачу не знайдено</div>;
//   }

//   return (
//     <div>
//       <ExerciseDetails />
//     </div>
//   );
// };

// export default Exercise;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ExerciseDetails from '../components/ExerciseDetails';
import AddExercise from '../components/AddExercise';

const Exercise = ({ action }) => {
  const { id } = useParams();

  const entity = useSelector(state => state.exercises.exercises.find(e => e.id === parseInt(id, 10)));

  if (action === 'add') {
    return <AddExercise />;
  } else if (action === 'edit') {
    return <ExerciseDetails action='edit' />;
  } 
 
  if (!entity) {
    return <div>Задачу не знайдена</div>;
  }

  return <ExerciseDetails />;
};

export default Exercise;

