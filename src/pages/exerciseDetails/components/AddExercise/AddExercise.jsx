import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addExercise } from 'app/actions/exercise'; // CHANGES!!
import Button from 'components/Button/Button';

const EntityDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const entity = useSelector(state => state.exercises.exercises.find(e => e.id === parseInt(id, 10)));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: '',
    difficultyRange: '',
    studentLevel: '',
    mode: '',
    type: '',
    tags: '',
    solutionStrategy: '',
    PGN: '',
    targetSkills: '',
    rate: ''
  });

  useEffect(() => {
    if (entity) {
      setFormData({
        topic: entity.topic,
        difficultyRange: entity.difficultyRange,
        studentLevel: entity.studentLevel,
        mode: entity.mode,
        type: entity.type,
        tags: entity.tags.join(', '),
        solutionStrategy: entity.solutionStrategy,
        PGN: entity.PGN,
        targetSkills: entity.targetSkills,
        rate: entity.rate
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
        PGN: '',
        targetSkills: '',
        rate: ''
      });
    }
  }, [entity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const updatedEntity = {
      ...entity,
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    if (id) {
      // dispatch(saveExercise(updatedEntity)).then(() => navigate(-1));
    } else {
      dispatch(addExercise(updatedEntity));
    }
  };

  if (id && !entity) {
    return <div>Задачу не знайдено</div>;
  }

  return (
    <div>
      <h1>{id ? `Редагування: ${entity.topic}` : 'Створення нової задачі'}</h1>
      <form>
        <div>
          <label>Тема:</label>
          <input name="topic" value={formData.topic} onChange={handleChange} />
        </div>
        <div>
          <label>Складність:</label>
          <input name="difficultyRange" value={formData.difficultyRange} onChange={handleChange} />
        </div>
        <div>
          <label>Рівень студента:</label>
          <input name="studentLevel" value={formData.studentLevel} onChange={handleChange} />
        </div>
        <div>
          <label>Режим:</label>
          <input name="mode" value={formData.mode} onChange={handleChange} />
        </div>
        <div>
          <label>Тип:</label>
          <input name="type" value={formData.type} onChange={handleChange} />
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
          <input name="PGN" value={formData.PGN} onChange={handleChange} />
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
      </form>
    </div>

  );
};

export default EntityDetail;
