import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addExercise } from 'app/actions/exercise';
import Button from 'components/Button/Button';
import './AddExercise.css';

const AddExercise = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const exercises = useSelector(state => state.exercises?.exercises || []); // Проверка наличия exercises
  const exercise = exercises.find(e => e.id === parseInt(id, 10));
  const navigate = useNavigate();

  const defaultValues = {
    topic: 'Мат одинокому королю',
    difficultyRange: '3',
    studentLevel: '2',
    mode: 'Standard',
    type: 'Mate in 3',
    tags: '',
    solutionStrategy: 'Fork',
    pgn: '[Event "Chess Exercise"]\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6',
    targetSkills: 'Calculation, Pattern recognition',
    rate: '4'
  };

  const [formData, setFormData] = useState(defaultValues);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (exercise) {
      setFormData({
        topic: exercise.topic || '',
        difficultyRange: exercise.difficultyRange || '',
        studentLevel: exercise.studentLevel || '',
        mode: exercise.mode || '',
        type: exercise.type || '',
        tags: (exercise.tags && exercise.tags.join(', ')) || '',
        solutionStrategy: exercise.solutionStrategy || '',
        pgn: exercise.pgn || '',
        targetSkills: exercise.targetSkills || '',
        rate: exercise.rate || ''
      });
    } else {
      setFormData(defaultValues);
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

  const handleSave = () => {
    if (!validate()) return;
  
    const updatedExercise = {
      ...exercise,
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };
  
    dispatch(addExercise(updatedExercise))
    .then(() => navigate(-1))
    .catch((error) => {
      let errorMsg = 'Помилка при створенні задачі.';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg = error.response.data;
        } else if (Array.isArray(error.response.data)) {
          errorMsg = error.response.data.join(', ');
        } else if (typeof error.response.data === 'object') {
          errorMsg = JSON.stringify(error.response.data);
        }
      }
      alert(errorMsg, { variant: 'error' });
      navigate('/exercises');
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (id && !exercise) {
    return <div>Задачу не знайдено</div>;
  }

  return (
    <div>
      <h1>{id ? `Редагування: ${exercise?.topic}` : 'Створення нової задачі'}</h1>
      <form>
        <div>
          <label>Тема:</label>
          <input 
            name="topic" 
            value={formData.topic} 
            onChange={handleChange} 
            className={errors.topic ? 'error' : ''} 
            placeholder="Мат одинокому королю" // Добавлен placeholder
          />
          {errors.topic && <span className="error-message">{errors.topic}</span>}
        </div>
        <div>
          <label>Складність:</label>
          <input 
            name="difficultyRange" 
            value={formData.difficultyRange} 
            onChange={handleChange} 
            className={errors.difficultyRange ? 'error' : ''} 
            placeholder="3" // Добавлен placeholder
          />
          {errors.difficultyRange && <span className="error-message">{errors.difficultyRange}</span>}
        </div>
        <div>
          <label>Рівень студента:</label>
          <input 
            name="studentLevel" 
            value={formData.studentLevel} 
            onChange={handleChange} 
            className={errors.studentLevel ? 'error' : ''} 
            placeholder="2" // Добавлен placeholder
          />
          {errors.studentLevel && <span className="error-message">{errors.studentLevel}</span>}
        </div>
        <div>
          <label>Режим:</label>
          <input 
            name="mode" 
            value={formData.mode} 
            onChange={handleChange} 
            className={errors.mode ? 'error' : ''} 
            placeholder="Standard" // Добавлен placeholder
          />
          {errors.mode && <span className="error-message">{errors.mode}</span>}
        </div>
        <div>
          <label>Тип:</label>
          <input 
            name="type" 
            value={formData.type} 
            onChange={handleChange} 
            className={errors.type ? 'error' : ''} 
            placeholder="Mate in 3" // Добавлен placeholder
          />
          {errors.type && <span className="error-message">{errors.type}</span>}
        </div>
        <div>
          <label>Теги:</label>
          <input 
            name="tags" 
            value={formData.tags} 
            onChange={handleChange} 
            placeholder="Тег1, Тег2" // Добавлен placeholder
          />
        </div>
        <div>
          <label>Стратегія розв'язання:</label>
          <input 
            name="solutionStrategy" 
            value={formData.solutionStrategy} 
            onChange={handleChange} 
            placeholder="Fork" // Добавлен placeholder
          />
        </div>
        <div>
          <label>PGN:</label>
          <input 
            name="pgn" 
            value={formData.pgn} 
            onChange={handleChange} 
            className={errors.pgn ? 'error' : ''} 
            placeholder='[Event "Chess Exercise"]\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6' // Добавлен placeholder
          />
          {errors.pgn && <span className="error-message">{errors.pgn}</span>}
        </div>
        <div>
          <label>Цільові навички:</label>
          <input 
            name="targetSkills" 
            value={formData.targetSkills} 
            onChange={handleChange} 
            placeholder="Calculation, Pattern recognition" // Добавлен placeholder
          />
        </div>
        <div>
          <label>Оцінка:</label>
          <input 
            name="rate" 
            value={formData.rate} 
            onChange={handleChange} 
            placeholder="4" // Добавлен placeholder
          />
        </div>
        <Button onClick={handleSave}>Зберегти</Button>
        <Button onClick={handleCancel} type="button">Скасувати</Button>
      </form>
    </div>
  );
};

export default AddExercise;
