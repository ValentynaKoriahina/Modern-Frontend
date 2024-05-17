// import React, { useMemo } from 'react';
// import IntlProvider from 'misc/providers/IntlProvider';
// import useLocationSearch from 'misc/hooks/useLocationSearch';

// import getMessages from './intl';
// import Exercise from './containers/Exercise';


// function Index(props) {
//   const { lang } = useLocationSearch();
//   const messages = useMemo(() => getMessages(lang), [lang]);

//   return (
//     <IntlProvider messages={messages}>
//       <Exercise {...props} />
//     </IntlProvider>
//   );
// }

// export default Index;

import React, { useMemo } from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';

import getMessages from './intl';
import Exercise from './containers/Exercise';

function Index(props) {
  const { lang } = useLocationSearch();
  const messages = useMemo(() => getMessages(lang), [lang]);

  // Определение, какой компонент нужно отобразить на основе URL-адреса
  let action = 'show'; // По умолчанию показываем упражнение

  const path = window.location.pathname;

  if (path.includes('/exercise/new')) {
    action = 'add'; // Если URL-адрес содержит '/exercise/new', значит это добавление упражнения
  } else if (path.includes('/exercise/edit')) {
    action = 'edit'; // Если URL-адрес содержит '/exercise/edit', значит это редактирование упражнения
  }

  return (
    <IntlProvider messages={messages}>
      <Exercise {...props} action={action} />
    </IntlProvider>
  );
}

export default Index;



