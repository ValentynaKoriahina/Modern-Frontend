import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EntityDetail = () => {
  const { id } = useParams();
  const entity = useSelector(state => state.exercises.exercises.find(e => e.id === parseInt(id, 10)));
  console.log(id)

  if (!entity) {
    return <div>Сущность не найдена</div>;
  }

  return (
    <div>
      <h1>{entity.topic}</h1>
      <p><strong>Сложность:</strong> {entity.difficultyRange}</p>
      <p><strong>Уровень студента:</strong> {entity.studentLevel}</p>
      <p><strong>Режим:</strong> {entity.mode}</p>
      <p><strong>Тип:</strong> {entity.type}</p>
      <p><strong>Теги:</strong> {entity.tags.join(', ')}</p>
      <p><strong>Стратегия решения:</strong> {entity.solutionStrategy}</p>
      <pre><strong>PGN:</strong> {entity.PGN}</pre>
      <p><strong>Целевые навыки:</strong> {entity.targetSkills}</p>
      <p><strong>Оценка:</strong> {entity.rate}</p>
    </div>
  );
};

export default EntityDetail;
