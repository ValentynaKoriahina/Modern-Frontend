import React from 'react';
import ExercisesList from 'pages/exercisesList';

import PageContainer from './components/PageContainer';

const Exercises = (props) => {
  return (
    <PageContainer>
      <ExercisesList {...props} />
    </PageContainer>
  );
};

export default Exercises;
