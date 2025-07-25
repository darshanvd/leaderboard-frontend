import React, { useEffect } from 'react';
import PlayerList from './component/PlayerList';
import Header from './component/Header';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_SESSION } from './graqhql/Query';
import { loginSuccess, logout } from './features/loginSlice';
import Loading from './component/common/Loading';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading } = useQuery(GET_CURRENT_SESSION, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (data?.session?.isLoggedIn) {
      dispatch(
        loginSuccess({
          name: data.session.name ?? '',
          userId: data.session.userId ?? '',
          email: data.session.email ?? '',
          isLoggedIn: true,
        })
      );
    } else if (!loading && !data?.session?.isLoggedIn) {
      dispatch(logout());
    }
  }, [data, loading, dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <PlayerList />
    </>
  );
};

export default App;
