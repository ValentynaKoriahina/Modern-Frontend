import React, { useMemo } from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';

import getMessages from './intl';
import Exercise from './containers/Exercise';

function Index(props) {
  const { lang } = useLocationSearch();
  const messages = useMemo(() => getMessages(lang), [lang]);

  let action = 'show'; // За замовчуванням показуємо задачу

  const path = window.location.pathname;

  if (path.includes('/exercise/new')) {
    action = 'add';
  } else if (path.includes('/exercise/edit')) {
    action = 'edit';
  }

  return (
    <IntlProvider messages={messages}>
      <Exercise {...props} action={action} />
    </IntlProvider>
  );
}

export default Index;



