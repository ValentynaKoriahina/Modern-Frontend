import { useIntl } from 'react-intl';
import Typography from 'components/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExercises, deleteExercise } from '../../../app/actions/exercise';
import IconButton from 'components/IconButton/IconButton';
import TrashBinIcon from 'pages/exercisesList/components/icons/TrashBinIcon';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import NotificationSnackbar from '../components/NotificationSnackbar';
import { Link, useNavigate } from 'react-router-dom'; // CHANGES!!
import pages from 'constants/pagesURLs';
import Button from 'components/Button/Button'; // CHANGES!!

function ExercisesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // CHANGES!!
  const { exercises, isLoading, error } = useSelector((state) => state.exercises);
  const [hoveredExercise, setHoveredExercise] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
          setSnackbarMessage('Видалено успішно');
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

  const handleAddEntityClick = () => { // CHANGES!!
    navigate(`${pages.exercise}/new`); // CHANGES!!
  }; // CHANGES!!

  if (isLoading && showDeleteDialog !== true) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div>
      <Button onClick={handleAddEntityClick}>Додати сутність</Button> {/* CHANGES!! */}
      <ul>
        {exercises.map((exercise) => (
          <li
            key={exercise.id}
            onMouseEnter={() => setHoveredExercise(exercise)}
            onMouseLeave={() => setHoveredExercise(null)}
          >
            <Link to={`${pages.exercise}/${exercise.id}`}>
              {exercise.topic} (Рівень складності: {exercise.difficultyRange})
            </Link>
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
      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </div>
  );
}

export default ExercisesList;
