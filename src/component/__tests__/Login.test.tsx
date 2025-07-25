import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../rootReducer';
import Login from '../Login';
import { LOGIN } from '../../graqhql/Mutations';
import { vi } from 'vitest';

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    login: { isLoggedIn: false, email: '', name: '', userId: '', token: '' },
  },
});

const mocks = [
      {
        request: {
          query: LOGIN,
          variables: { email: 'test@example.com', password: 'password123' },
        },
        result: {
          data: {
            login: {
              userId: '1',
              name: 'Test User',
              email: 'test@example.com',
              isLoggedIn: 'true',
              __typename: 'User',
            },
          },
        },
      },
    ];

describe('Login', () => {
  test('renders login form and submits successfully, calls onClose', async () => {
    const onClose = vi.fn();
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <Login onClose={onClose} />
        </Provider>
      </MockedProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  test('shows error on failed login', async () => {
    const mocks = [
      {
        request: {
          query: LOGIN,
          variables: { email: 'fail@example.com', password: 'wrong' },
        },
        error: new Error('User not found.'),
      },
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <Login onClose={vi.fn()} />
        </Provider>
      </MockedProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'fail@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByText(/User not found./i)).toBeInTheDocument();
  });
});
