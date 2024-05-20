// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { editExercise } from 'app/actions/exercise';
// // import Button from 'components/Button/Button';
// // import EditIcon from '../icons/EditIcon';


// // const ExerciseDetails = ({ action }) => {
// //   const { id } = useParams();
// //   const entity = useSelector(state => state.exercises.exercises.find(e => e.id === parseInt(id, 10)));
// //   const dispatch = useDispatch();
// //   const [isEditing, setIsEditing] = useState(action === 'edit');

// //   const [formData, setFormData] = useState({
// //     topic: '',
// //     difficultyRange: '',
// //     studentLevel: '',
// //     mode: '',
// //     type: '',
// //     tags: '',
// //     solutionStrategy: '',
// //     PGN: '',
// //     targetSkills: '',
// //     rate: ''
// //   });

// //   useEffect(() => {
// //     if (entity) {
// //       setFormData({
// //         topic: entity.topic,
// //         difficultyRange: entity.difficultyRange,
// //         studentLevel: entity.studentLevel,
// //         mode: entity.mode,
// //         type: entity.type,
// //         tags: entity.tags.join(', '),
// //         solutionStrategy: entity.solutionStrategy,
// //         PGN: entity.PGN,
// //         targetSkills: entity.targetSkills,
// //         rate: entity.rate
// //       });
// //     } else {
// //       setFormData({
// //         topic: '',
// //         difficultyRange: '',
// //         studentLevel: '',
// //         mode: '',
// //         type: '',
// //         tags: '',
// //         solutionStrategy: '',
// //         PGN: '',
// //         targetSkills: '',
// //         rate: ''
// //       });
// //     }
// //   }, [entity]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSave = () => {
// //     const updatedEntity = {
// //       ...entity,
// //       ...formData,
// //       tags: formData.tags.split(',').map(tag => tag.trim())
// //     };
// //     dispatch(editExercise(updatedEntity));
// //   };

// //   if (id && !entity) {
// //     return <div>Задачу не знайдено</div>;
// //   }

// //   return (
// //     <div className="exercise-details">
// //       <div className="content-container" style={{ position: 'relative' }}>
// //         <div>
// //           {isEditing ? (
// //             <div>
// //               <h1>{id ? `Редагувати задачу` : 'Створити задачу'}</h1>
// //               <form>
// //                 <div>
// //                   <label>Тема:</label>
// //                   <input name="topic" value={formData.topic} onChange={handleChange} />
// //                 </div>
// //                 <div>
// //                   <label>Сложность:</label>
// //                   <input name="difficultyRange" value={formData.difficultyRange} onChange={handleChange} />
// //                 </div>
// //                 <div>
// //                   <label>Уровень студента:</label>
// //                   <input name="studentLevel" value={formData.studentLevel} onChange={handleChange} />
// //                 </div>
// //                 <div>
// //                   <label>Режим:</label>
// //                   <input name="mode" value={formData.mode} onChange={handleChange} />
// //                 </div>
// //                 <div>
// //                   <label>Тип:</label>
// //                   <input name="type" value={formData.type} onChange={handleChange} />
// //                 </div>
// //                 <div>
// //                   <label>Теги:</label>
// //                   <input name="tags" value={formData.tags} onChange={handleChange} />
// //                 </div>
// //                 <div>
// //                   <label>Стратегия решения:</label>
// //                   <input name="solutionStrategy" value={formData.solutionStrategy} onChange={handleChange} />
// //                 </div>
// //                 <div>
// //                   <label>PGN:</label>
// //                   <input name="PGN" value={formData.PGN} onChange={handleChange} />
// //                 </div>
// //                 <div>
// //                   <label>Целевые навыки:</label>
// //                   <input name="targetSkills" value={formData.targetSkills} onChange={handleChange} />
// //                 </div>
// //                 <div>
// //                   <label>Оценка:</label>
// //                   <input name="rate" value={formData.rate} onChange={handleChange} />
// //                 </div>
// //                 <Button onClick={handleSave}>Сохранить</Button>
// //               </form>
// //             </div>
// //           ) : (
// //             <div>
// //               <button className="edit-button" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => setIsEditing(true)}>
// //                 <EditIcon />
// //               </button>
// //               <h1>{entity.topic}</h1>
// //               <p><strong>Сложность:</strong> {entity.difficultyRange}</p>
// //               <p><strong>Уровень студента:</strong> {entity.studentLevel}</p>
// //               <p><strong>Режим:</strong> {entity.mode}</p>
// //               <p><strong>Тип:</strong> {entity.type}</p>
// //               <p><strong>Теги:</strong> {entity.tags.join(', ')}</p>
// //               <p><strong>Стратегия решения:</strong> {entity.solutionStrategy}</p>
// //               <pre><strong>PGN:</strong> {entity.PGN}</pre>
// //               <p><strong>Целевые навыки:</strong> {entity.targetSkills}</p>
// //               <p><strong>Оценка:</strong> {entity.rate}</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ExerciseDetails;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { editExercise } from 'app/actions/exercise';
// import Button from 'components/Button/Button';
// import EditIcon from '../icons/EditIcon';

// const ExerciseDetails = ({ action }) => {
//   const { id } = useParams();
//   const entity = useSelector(state => state.exercises.exercises.find(e => e.id === parseInt(id, 10)));
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(action === 'edit');

//   const [formData, setFormData] = useState({
//     topic: '',
//     difficultyRange: '',
//     studentLevel: '',
//     mode: '',
//     type: '',
//     tags: '',
//     solutionStrategy: '',
//     PGN: '',
//     targetSkills: '',
//     rate: ''
//   });

//   useEffect(() => {
//     if (entity) {
//       setFormData({
//         topic: entity.topic,
//         difficultyRange: entity.difficultyRange,
//         studentLevel: entity.studentLevel,
//         mode: entity.mode,
//         type: entity.type,
//         tags: entity.tags.join(', '),
//         solutionStrategy: entity.solutionStrategy,
//         PGN: entity.PGN,
//         targetSkills: entity.targetSkills,
//         rate: entity.rate
//       });
//     } else {
//       setFormData({
//         topic: '',
//         difficultyRange: '',
//         studentLevel: '',
//         mode: '',
//         type: '',
//         tags: '',
//         solutionStrategy: '',
//         PGN: '',
//         targetSkills: '',
//         rate: ''
//       });
//     }
//   }, [entity]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = () => {
//     const updatedEntity = {
//       ...entity,
//       ...formData,
//       tags: formData.tags.split(',').map(tag => tag.trim())
//     };
//     dispatch(editExercise(updatedEntity))
//       .then(() => setIsEditing(false)) // CHANGES!!
//       .catch(error => console.error('Failed to save exercise:', error));
//   };

//   const handleCancel = () => { // CHANGES!!
//     setIsEditing(false);
//     if (entity) {
//       setFormData({
//         topic: entity.topic,
//         difficultyRange: entity.difficultyRange,
//         studentLevel: entity.studentLevel,
//         mode: entity.mode,
//         type: entity.type,
//         tags: entity.tags.join(', '),
//         solutionStrategy: entity.solutionStrategy,
//         PGN: entity.PGN,
//         targetSkills: entity.targetSkills,
//         rate: entity.rate
//       });
//     } else {
//       setFormData({
//         topic: '',
//         difficultyRange: '',
//         studentLevel: '',
//         mode: '',
//         type: '',
//         tags: '',
//         solutionStrategy: '',
//         PGN: '',
//         targetSkills: '',
//         rate: ''
//       });
//     }
//   };

//   if (id && !entity) {
//     return <div>Задачу не знайдено</div>;
//   }

//   return (
//     <div className="exercise-details">
//       <div className="content-container" style={{ position: 'relative' }}>
//         <div>
//           {isEditing ? (
//             <div>
//               <h1>{id ? `Редагувати задачу` : 'Створити задачу'}</h1>
//               <form>
//                 <div>
//                   <label>Тема:</label>
//                   <input name="topic" value={formData.topic} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Сложность:</label>
//                   <input name="difficultyRange" value={formData.difficultyRange} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Уровень студента:</label>
//                   <input name="studentLevel" value={formData.studentLevel} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Режим:</label>
//                   <input name="mode" value={formData.mode} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Тип:</label>
//                   <input name="type" value={formData.type} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Теги:</label>
//                   <input name="tags" value={formData.tags} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Стратегия решения:</label>
//                   <input name="solutionStrategy" value={formData.solutionStrategy} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>PGN:</label>
//                   <input name="PGN" value={formData.PGN} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Целевые навыки:</label>
//                   <input name="targetSkills" value={formData.targetSkills} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Оценка:</label>
//                   <input name="rate" value={formData.rate} onChange={handleChange} />
//                 </div>
//                 <Button onClick={handleSave}>Зберегти</Button>
//                 <Button onClick={handleCancel}>Скасувати</Button> {/* CHANGES!! */}
//               </form>
//             </div>
//           ) : (
//             <div>
//               <button className="edit-button" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => setIsEditing(true)}>
//                 <EditIcon />
//               </button>
//               <h1>{entity.topic}</h1>
//               <p><strong>Сложность:</strong> {entity.difficultyRange}</p>
//               <p><strong>Уровень студента:</strong> {entity.studentLevel}</p>
//               <p><strong>Режим:</strong> {entity.mode}</p>
//               <p><strong>Тип:</strong> {entity.type}</p>
//               <p><strong>Теги:</strong> {entity.tags.join(', ')}</p>
//               <p><strong>Стратегия решения:</strong> {entity.solutionStrategy}</p>
//               <pre><strong>PGN:</strong> {entity.PGN}</pre>
//               <p><strong>Целевые навыки:</strong> {entity.targetSkills}</p>
//               <p><strong>Оценка:</strong> {entity.rate}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExerciseDetails;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { editExercise } from 'app/actions/exercise';
// import Button from 'components/Button/Button';
// import EditIcon from '../icons/EditIcon';
// import NotificationSnackbar from '../NotificationSnackbar';

// const ExerciseDetails = ({ action }) => {
//   const { id } = useParams();
//   const entity = useSelector(state => state.exercises.exercises.find(e => e.id === parseInt(id, 10)));
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(action === 'edit');
//   const [notification, setNotification] = useState({ open: false, message: '', severity: '' }); // Добавляем состояние уведомлений

//   const [formData, setFormData] = useState({
//     topic: '',
//     difficultyRange: '',
//     studentLevel: '',
//     mode: '',
//     type: '',
//     tags: '',
//     solutionStrategy: '',
//     PGN: '',
//     targetSkills: '',
//     rate: ''
//   });

//   useEffect(() => {
//     if (entity) {
//       setFormData({
//         topic: entity.topic,
//         difficultyRange: entity.difficultyRange,
//         studentLevel: entity.studentLevel,
//         mode: entity.mode,
//         type: entity.type,
//         tags: entity.tags.join(', '),
//         solutionStrategy: entity.solutionStrategy,
//         PGN: entity.PGN,
//         targetSkills: entity.targetSkills,
//         rate: entity.rate
//       });
//     } else {
//       setFormData({
//         topic: '',
//         difficultyRange: '',
//         studentLevel: '',
//         mode: '',
//         type: '',
//         tags: '',
//         solutionStrategy: '',
//         PGN: '',
//         targetSkills: '',
//         rate: ''
//       });
//     }
//   }, [entity]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = () => {
//     const updatedEntity = {
//       ...entity,
//       ...formData,
//       tags: formData.tags.split(',').map(tag => tag.trim())
//     };
//     dispatch(editExercise(updatedEntity))
//       .then(() => {
//         setIsEditing(false);
//         setNotification({ open: true, message: 'Зміни збережено', severity: 'success' }); // Устанавливаем уведомление
//       })
//       .catch(error => {
//         console.error('Failed to save exercise:', error);
//         setNotification({ open: true, message: 'Помилка при збереженні', severity: 'error' }); // Устанавливаем уведомление об ошибке
//       });
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     if (entity) {
//       setFormData({
//         topic: entity.topic,
//         difficultyRange: entity.difficultyRange,
//         studentLevel: entity.studentLevel,
//         mode: entity.mode,
//         type: entity.type,
//         tags: entity.tags.join(', '),
//         solutionStrategy: entity.solutionStrategy,
//         PGN: entity.PGN,
//         targetSkills: entity.targetSkills,
//         rate: entity.rate
//       });
//     } else {
//       setFormData({
//         topic: '',
//         difficultyRange: '',
//         studentLevel: '',
//         mode: '',
//         type: '',
//         tags: '',
//         solutionStrategy: '',
//         PGN: '',
//         targetSkills: '',
//         rate: ''
//       });
//     }
//   };

//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false });
//   };

//   if (id && !entity) {
//     return <div>Задачу не знайдено</div>;
//   }

//   return (
//     <div className="exercise-details">
//       <div className="content-container" style={{ position: 'relative' }}>
//         <div>
//           {isEditing ? (
//             <div>
//               <h1>{id ? `Редагувати задачу` : 'Створити задачу'}</h1>
//               <form>
//                 <div>
//                   <label>Тема:</label>
//                   <input name="topic" value={formData.topic} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Сложность:</label>
//                   <input name="difficultyRange" value={formData.difficultyRange} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Уровень студента:</label>
//                   <input name="studentLevel" value={formData.studentLevel} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Режим:</label>
//                   <input name="mode" value={formData.mode} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Тип:</label>
//                   <input name="type" value={formData.type} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Теги:</label>
//                   <input name="tags" value={formData.tags} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Стратегия решения:</label>
//                   <input name="solutionStrategy" value={formData.solutionStrategy} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>PGN:</label>
//                   <input name="PGN" value={formData.PGN} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Целевые навыки:</label>
//                   <input name="targetSkills" value={formData.targetSkills} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <label>Оценка:</label>
//                   <input name="rate" value={formData.rate} onChange={handleChange} />
//                 </div>
//                 <Button onClick={handleSave}>Зберегти</Button>
//                 <Button onClick={handleCancel}>Скасувати</Button>
//               </form>
//             </div>
//           ) : (
//             <div>
//               <button className="edit-button" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => setIsEditing(true)}>
//                 <EditIcon />
//               </button>
//               <h1>{entity.topic}</h1>
//               <p><strong>Сложность:</strong> {entity.difficultyRange}</p>
//               <p><strong>Уровень студента:</strong> {entity.studentLevel}</p>
//               <p><strong>Режим:</strong> {entity.mode}</p>
//               <p><strong>Тип:</strong> {entity.type}</p>
//               <p><strong>Теги:</strong> {entity.tags.join(', ')}</p>
//               <p><strong>Стратегия решения:</strong> {entity.solutionStrategy}</p>
//               <pre><strong>PGN:</strong> {entity.PGN}</pre>
//               <p><strong>Целевые навыки:</strong> {entity.targetSkills}</p>
//               <p><strong>Оценка:</strong> {entity.rate}</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <NotificationSnackbar
//         open={notification.open}
//         message={notification.message}
//         severity={notification.severity}
//         onClose={handleCloseNotification}
//       />
//     </div>
//   );
// };

// export default ExerciseDetails;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // CHANGES!!
import { useDispatch, useSelector } from 'react-redux';
import { editExercise } from 'app/actions/exercise';
import Button from 'components/Button/Button';
import EditIcon from '../icons/EditIcon';
import NotificationSnackbar from '../NotificationSnackbar';

const ExerciseDetails = ({ action }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // CHANGES!!
  const entity = useSelector(state => state.exercises.exercises.find(e => e.id === parseInt(id, 10)));
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(action === 'edit');
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

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
    dispatch(editExercise(updatedEntity))
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
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleBack = () => { // CHANGES!!
    navigate(-1); // CHANGES!!
  };

  if (id && !entity) {
    return <div>Задачу не знайдено</div>;
  }

  return (
    <div className="exercise-details">
      <div className="content-container" style={{ position: 'relative' }}>
        <Button onClick={handleBack}>Назад</Button> {/* CHANGES!! */}
        <div>
          {isEditing ? (
            <div>
              <h1>{id ? `Редагувати задачу` : 'Створити задачу'}</h1>
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
                <Button onClick={handleSave}>Зберегти</Button>
                <Button onClick={handleCancel}>Скасувати</Button>
              </form>
            </div>
          ) : (
            <div>
              <button className="edit-button" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => setIsEditing(true)}>
                <EditIcon />
              </button>
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
