
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../rootReducer';
import Header from '../Header';
import { MockedProvider } from '@apollo/client/testing';
import { LOGOUT } from '../../graqhql/Mutations';

describe('Header', () => {
  const renderHeader = (preloadedState = { login: { isLoggedIn: false, name: '', email: '', userId: '' } }) => {
    const store = configureStore({ reducer: rootReducer, preloadedState });
    return render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Provider store={store}>
          <Header />
        </Provider>
      </MockedProvider>
    );
  };

  it('renders the title', () => {
    renderHeader();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it('shows Login button when not logged in', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows Logout button and username when logged in', () => {
    renderHeader({ login: { isLoggedIn: true, name: 'Test User', email: 'test@example.com', userId: '1' } });
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('calls logout mutation and dispatches logout on Logout click', async () => {
    const mocks = [
      {
        request: { query: LOGOUT },
        result: { data: { logout: { message: 'Logged out', __typename: 'Message' } } },
      },
    ];
    const preloadedState = { login: { isLoggedIn: true, name: 'Test User', email: 'test@example.com', userId: '1' } };
    const store = configureStore({ reducer: rootReducer, preloadedState });
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <Header />
        </Provider>
      </MockedProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    // Wait for logout mutation to complete and user to be logged out
    await waitFor(() => {
      expect(store.getState().login.isLoggedIn).toBe(false);
    });
  });
});
