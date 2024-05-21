import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { addAxiosInterceptors } from 'misc/requests';
import * as pages from 'constants/pages';
import AuthoritiesProvider from 'misc/providers/AuthoritiesProvider';
import DefaultPage from 'pageProviders/Default';
import Loading from 'components/Loading';
import LoginPage from 'pageProviders/Login';
import PageContainer from 'pageProviders/components/PageContainer';
import pageURLs from 'constants/pagesURLs';
import SecretPage from 'pageProviders/Secret';
import Exercises from 'pageProviders/ExercisesList';
import ExerciseDetails from 'pageProviders/ExerciseDetails';
import ThemeProvider from 'misc/providers/ThemeProvider';
import UserProvider from 'misc/providers/UserProvider';
import actionsUser from '../actions/user';
import Header from '../components/Header';
import IntlProvider from '../components/IntlProvider';
import MissedPage from '../components/MissedPage';

function App() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    componentDidMount: false,
  });

  const {
    errors,
    isFailedSignIn,
    isFailedSignUp,
    isFetchingSignIn,
    isFetchingSignUp,
    isFetchingUser,
  } = useSelector(({ user }) => user);

  useEffect(() => {
    addAxiosInterceptors({
      onSignOut: () => dispatch(actionsUser.fetchSignOut()),
    });
    dispatch(actionsUser.fetchUser());
    setState({
      ...state,
      componentDidMount: true,
    });
  }, []);

  return (
    <UserProvider>
      <AuthoritiesProvider>
        <ThemeProvider>
          <BrowserRouter>
            <IntlProvider>
              <Header onLogout={() => dispatch(actionsUser.fetchSignOut())} />
              {isFetchingUser && (
                <PageContainer>
                  <Loading />
                </PageContainer>
              )}
              {!isFetchingUser && (
                <Routes>
                  <Route
                    element={<DefaultPage />}
                    path={`${pageURLs[pages.defaultPage]}`}
                  />
                  <Route
                    element={<SecretPage />}
                    path={`${pageURLs[pages.secretPage]}`}
                  />
                  <Route
                    element={<Exercises />}
                    path={`${pageURLs[pages.exercisesList]}`}
                  />
                  <Route
                    element={<ExerciseDetails />}
                    path={`${pageURLs[pages.exercise]}/:id`}
                  />
                  <Route
                    element={<ExerciseDetails />}
                    path={`${pageURLs[pages.exercise]}/new`}
                  />
                  <Route
                    element={(
                      <LoginPage
                        errors={errors}
                        isFailedSignIn={isFailedSignIn}
                        isFailedSignUp={isFailedSignUp}
                        isFetchingSignIn={isFetchingSignIn}
                        isFetchingSignUp={isFetchingSignUp}
                        onSignIn={({ email, login, password }) => dispatch(actionsUser.fetchSignIn({ email, login, password }))}
                        onSignUp={({ email, firstName, lastName, login, password }) => dispatch(actionsUser.fetchSignUp({ email, firstName, lastName, login, password }))}
                      />
                    )}
                    path={`${pageURLs[pages.login]}`}
                  />
                  <Route
                    element={(
                      <MissedPage
                        redirectPage={`${pageURLs[pages.defaultPage]}`}
                      />
                    )}
                    path="*"
                  />
                  <Route path="/" element={<Navigate to="/exercises?lang=ua" />} />
                </Routes>
              )}
            </IntlProvider>
          </BrowserRouter>
        </ThemeProvider>
      </AuthoritiesProvider>
    </UserProvider>
  );
}

export default App;
