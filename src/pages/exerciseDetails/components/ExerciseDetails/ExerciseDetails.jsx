import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editExercise } from 'app/actions/exercise';
import Button from 'components/Button/Button';
import EditIcon from '../icons/EditIcon';
import NotificationSnackbar from '../NotificationSnackbar';

const ExerciseDetails = ({ action }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const exercise = useSelector(state => state.exercises.exercises.find(e => e.id === parseInt(id, 10)));
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(action === 'edit');
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    topic: '',
    difficultyRange: '',
    studentLevel: '',
    mode: '',
    type: '',
    tags: '',
    solutionStrategy: '',
    pgn: '',
    targetSkills: '',
    rate: ''
  });

  useEffect(() => {
    if (exercise) {
      setFormData({
        topic: exercise.topic,
        difficultyRange: exercise.difficultyRange,
        studentLevel: exercise.studentLevel,
        mode: exercise.mode,
        type: exercise.type,
        solutionStrategy: exercise.solutionStrategy,
        pgn: exercise.pgn,
        targetSkills: exercise.targetSkills,
        rate: exercise.rate
      });
    } else {
      setFormData({
        topic: '',
        difficultyRange: '',
        studentLevel: '',
        mode: '',
        type: '',
        tags: '',
        solutionStrategy: '',
        pgn: '',
        targetSkills: '',
        rate: ''
      });
    }
  }, [exercise]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.topic) formErrors.topic = 'Тема обов\'язкова';
    if (!formData.difficultyRange) formErrors.difficultyRange = 'Складність обов\'язкова';
    if (!formData.studentLevel) formErrors.studentLevel = 'Рівень студента обов\'язковий';
    if (!formData.mode) formErrors.mode = 'Режим обов\'язковий';
    if (!formData.type) formErrors.type = 'Тип обов\'язковий';
    if (!formData.pgn) formErrors.pgn = 'PGN обов\'язковий';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // const handleSave = () => {
  //   if (!validate()) return;

  //   const updatedExercise = {
  //     ...exercise,
  //     ...formData,
  //     tags: formData.tags.split(',').map(tag => tag.trim())
  //   };
  //   dispatch(editExercise(updatedExercise))
  //     .then(() => {
  //       setIsEditing(false);
  //       setNotification({ open: true, message: 'Зміни збережено', severity: 'success' });
  //     })
  //     .catch(error => {
  //       console.error('Failed to save exercise:', error);
  //       setNotification({ open: true, message: 'Помилка при збереженні', severity: 'error' });
  //     });
  // };

  const handleSave = () => {
    if (!validate()) return;
  
    let updatedTags = [];
    if (formData.tags) {
      updatedTags = formData.tags.split(',').map(tag => tag.trim());
    }
  
    const updatedExercise = {
      ...exercise,
      ...formData,
      tags: updatedTags
    };
  
    dispatch(editExercise(updatedExercise))
      .then(() => {
        setIsEditing(false);
        setNotification({ open: true, message: 'Зміни збережено', severity: 'success' });
      })
      .catch(error => {
        console.error('Failed to save exercise:', error);
        setNotification({ open: true, message: 'Помилка при збереженні', severity: 'error' });
      });
  };
  

  const handleCancel = () => {
    setIsEditing(false);
    if (exercise) {
      setFormData({
        topic: exercise.topic,
        difficultyRange: exercise.difficultyRange,
        studentLevel: exercise.studentLevel,
        mode: exercise.mode,
        type: exercise.type,
        tags: exercise.tags.join(', '),
        solutionStrategy: exercise.solutionStrategy,
        pgn: exercise.pgn,
        targetSkills: exercise.targetSkills,
        rate: exercise.rate
      });
    } else {
      setFormData({
        topic: '',
        difficultyRange: '',
        studentLevel: '',
        mode: '',
        type: '',
        tags: '',
        solutionStrategy: '',
        pgn: '',
        targetSkills: '',
        rate: ''
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (id && !exercise) {
    return <div>Задачу не знайдено</div>;
  }

  return (
    <div className="exercise-details">
      <div className="content-container" style={{ position: 'relative' }}>
        <Button onClick={handleBack}>Назад</Button>
        <div>
          {isEditing ? (
            <div>
              <h1>{id ? `Редагувати задачу` : 'Створити задачу'}</h1>
              <form>
                <div>
                  <label>Тема:</label>
                  <input name="topic" value={formData.topic} onChange={handleChange} className={errors.topic ? 'error' : ''} />
                  {errors.topic && <span className="error-message">{errors.topic}</span>}
                </div>
                <div>
                  <label>Складність:</label>
                  <input name="difficultyRange" value={formData.difficultyRange} onChange={handleChange} className={errors.difficultyRange ? 'error' : ''} />
                  {errors.difficultyRange && <span className="error-message">{errors.difficultyRange}</span>}
                </div>
                <div>
                  <label>Рівень студента:</label>
                  <input name="studentLevel" value={formData.studentLevel} onChange={handleChange} className={errors.studentLevel ? 'error' : ''} />
                  {errors.studentLevel && <span className="error-message">{errors.studentLevel}</span>}
                </div>
                <div>
                  <label>Режим:</label>
                  <input name="mode" value={formData.mode} onChange={handleChange} className={errors.mode ? 'error' : ''} />
                  {errors.mode && <span className="error-message">{errors.mode}</span>}
                </div>
                <div>
                  <label>Тип:</label>
                  <input name="type" value={formData.type} onChange={handleChange} className={errors.type ? 'error' : ''} />
                  {errors.type && <span className="error-message">{errors.type}</span>}
                </div>
                <div>
                  <label>Теги:</label>
                  <input name="tags" value={formData.tags} onChange={handleChange} />
                </div>
                <div>
                  <label>Стратегія розв'язання:</label>
                  <input name="solutionStrategy" value={formData.solutionStrategy} onChange={handleChange} />
                </div>
                <div>
                  <label>PGN:</label>
                  <input name="pgn" value={formData.pgn} onChange={handleChange} className={errors.pgn ? 'error' : ''} />
                  {errors.pgn && <span className="error-message">{errors.pgn}</span>}
                </div>
                <div>
                  <label>Цільові навички:</label>
                  <input name="targetSkills" value={formData.targetSkills} onChange={handleChange} />
                </div>
                <div>
                  <label>Оцінка:</label>
                  <input name="rate" value={formData.rate} onChange={handleChange} />
                </div>
                <Button onClick={handleSave}>Зберегти</Button>
                <Button onClick={handleCancel}>Скасувати</Button>
              </form>
            </div>
          ) : (
            <div>
              <button className="edit-button" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => setIsEditing(true)}>
                <EditIcon />
              </button>
              <h1>{exercise.topic}</h1>
              <p><strong>Складність:</strong> {exercise.difficultyRange}</p>
              <p><strong>Рівень студента:</strong> {exercise.studentLevel}</p>
              <p><strong>Режим:</strong> {exercise.mode}</p>
              <p><strong>Тип:</strong> {exercise.type}</p>
              <p><strong>Стратегія розв'язання:</strong> {exercise.solutionStrategy}</p>
              <pre><strong>PGN:</strong> {exercise.pgn}</pre>
              <p><strong>Цільові навички:</strong> {exercise.targetSkills}</p>
              <p><strong>Оцінка:</strong> {exercise.rate}</p>
            </div>
          )}
        </div>
      </div>
      <NotificationSnackbar
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </div>
  );
};

export default ExerciseDetails;
