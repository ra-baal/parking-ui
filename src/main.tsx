import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadConfig } from './config';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')!);

loadConfig()
  .then(() => {
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    );
  })
  .catch((err) => {
    root.render(<div>Failed to load configuration: {err.message}</div>);
  });