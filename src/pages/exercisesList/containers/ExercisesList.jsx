

// export default ExercisesList;
import { useIntl } from 'react-intl';
import Typography from 'components/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExercises, deleteExercise } from '../../../app/actions/exercise';
import IconButton from 'components/IconButton/IconButton';
import TrashBinIcon from 'pages/exercisesList/components/icons/TrashBinIcon';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog/DeleteConfirmationDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ExercisesList() {
  const dispatch = useDispatch();
  const { exercises, isLoading, error } = useSelector((state) => state.exercises);
  const [hoveredExercise, setHoveredExercise] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Добавлено состояние для сообщения об ошибке

  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const handleDeleteClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setErrorMessage('');
  };


  const handleConfirmDelete = () => {
    if (selectedExercise) {
      setLoading(true);
      dispatch(deleteExercise(selectedExercise.id))
        .then(() => {
          setShowDeleteDialog(false);
          setSnackbarMessage('Видлено успішно');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        })
        .catch((error) => {
          setErrorMessage('Вибачте, сталася помилка');
        })
        .finally(() => {
          setLoading(false);
          
        });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (isLoading && showDeleteDialog !== true) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

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
        loading={loading}
        errorMessage={errorMessage}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Змінено на 3 секунди
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Відцентровка повідомлення
      >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default ExercisesList;
