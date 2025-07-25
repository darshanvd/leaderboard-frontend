import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App.tsx';
import ErrorBoundary from './component/common/ErrorBoundary.tsx';
import './index.css';
import client from './apolloClient.ts';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
