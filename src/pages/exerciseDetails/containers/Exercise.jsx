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
//     return <div>Сущность не найдена</div>;
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

const Exercise = ({ action }) => { // Получаем пропс action
  const { id } = useParams();

  const entity = useSelector(state => state.exercises.exercises.find(e => e.id === parseInt(id, 10)));

  // Проверяем значение пропса action для определения, какой компонент отобразить
  if (action === 'add') {
    
    return <AddExercise />;
  } else if (action === 'edit') {

  } 
 

  if (!entity) {
    return <div>Задача не знайдена</div>;
  }

  return <ExerciseDetails />;
};

export default Exercise;

