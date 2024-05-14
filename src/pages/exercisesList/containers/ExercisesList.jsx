import { useIntl } from 'react-intl';
import Typography from 'components/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchExercises from '../../../app/actions/exercise';
import IconButton from 'components/IconButton/IconButton';
import TrashBinIcon from 'pages/exercisesList/components/icons/TrashBinIcon';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog/DeleteConfirmationDialog';


function ExercisesList() {
  const dispatch = useDispatch();
  const { exercises, isLoading, error } = useSelector((state) => state.exercises);
  const [hoveredExercise, setHoveredExercise] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const handleDeleteClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    // Логіка видалення сутності
    // Якщо видалення успішне:
    setShowDeleteDialog(false);
    // Показати повідомлення про успішне видалення
    // Якщо видалення не вдалося:
    // Показати повідомлення про помилку
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        {exercises.map((exercise) => (
          <li
            key={exercise.id}
            onMouseEnter={() => setHoveredExercise(exercise)}
            onMouseLeave={() => setHoveredExercise(null)}
          >
            {exercise.topic} (Рівень складності: {exercise.difficultyRange})
            {hoveredExercise === exercise && (
              <IconButton aria-label="delete" onClick={() => handleDeleteClick(exercise)}>
                <TrashBinIcon />
              </IconButton>
            )}
          </li>
        ))}
      </ul>
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default ExercisesList;

