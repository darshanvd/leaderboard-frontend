import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import Login from './Login';
import type { RootState } from '../store';
import { logout } from '../features/loginSlice';
import { LOGOUT } from '../graqhql/Mutations';


const Header: React.FC = React.memo(() => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const userName = useSelector((state: RootState) => state.login.name);

  const [logoutMutation] = useMutation(LOGOUT, {
    onCompleted: () => {
      dispatch(logout());
    },
    onError: () => {
      dispatch(logout());
    }
  });

  const handleLoginClick = () => setShowModal(true);
  const handleLogout = () => {
    logoutMutation();
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <header className="flex flex-row w-full p-4 bg-header-bg justify-between">
        <div className="flex gap-3 items-center">
          <span className="inline-flex"></span>
          <span className="text-header-text pl-2">Leaderboard</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-header-text">
            {isLoggedIn ? userName : ""}
          </div>
          {isLoggedIn ? (
            <button
              className="text-red-text px-4 py-2 rounded hover:underline focus:outline-none bg-transparent"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          ) : (
            <button
              className="text-blue-text px-4 py-2 rounded hover:underline focus:outline-none bg-transparent"
              onClick={handleLoginClick}
              type="button"
            >
              Login
            </button>
          )}
        </div>
      </header>
      {showModal && !isLoggedIn && (
        <Login onClose={handleClose} />
      )}
    </>
  );
});

export default Header
