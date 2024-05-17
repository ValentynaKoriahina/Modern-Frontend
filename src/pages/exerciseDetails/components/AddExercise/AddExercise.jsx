import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { saveExercise } from '../../../app/actions/exercise';
import Button from 'components/Button/Button';

const EntityDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const entity = useSelector(state => state.exercises.exercises.find(e => e.id === parseInt(id, 10)));

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
      // Пустые поля для создания новой сущности
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
    // dispatch(saveExercise(updatedEntity));
  };

  if (id && !entity) {
    return <div>Сущность не найдена</div>;
  }

  return (
    <div>
      <h1>{id ? `Редактирование: ${entity.topic}` : 'Создание новой сущности'}</h1>
      <form>
        <div>
          <label>Тема:</label>
          <input name="topic" value={formData.topic} onChange={handleChange} />
        </div>
        <div>
          <label>Сложность:</label>
          <input name="difficultyRange" value={formData.difficultyRange} onChange={handleChange} />
        </div>
        <div>
          <label>Уровень студента:</label>
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
          <label>Стратегия решения:</label>
          <input name="solutionStrategy" value={formData.solutionStrategy} onChange={handleChange} />
        </div>
        <div>
          <label>PGN:</label>
          <input name="PGN" value={formData.PGN} onChange={handleChange} />
        </div>
        <div>
          <label>Целевые навыки:</label>
          <input name="targetSkills" value={formData.targetSkills} onChange={handleChange} />
        </div>
        <div>
          <label>Оценка:</label>
          <input name="rate" value={formData.rate} onChange={handleChange} />
        </div>
        <Button onClick={handleSave}>Сохранить</Button>
      </form>
    </div>
  );
};

export default EntityDetail;
