import React from 'react';
import ExerciseDetails from 'pages/exerciseDetails';

import PageContainer from './components/PageContainer';

const Exercise = (props) => {
  return (
    <PageContainer>
      <ExerciseDetails {...props} />
    </PageContainer>
  );
};

export default Exercise;
