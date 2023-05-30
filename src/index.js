import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()
const initializeCache = () => {
    const user = localStorage.getItem('user');
    
    if (user) {
      // L'utilisateur est connecté, stockez les informations dans le cache de React Query
      queryClient.setQueryData('user', JSON.parse(user));
    }
  }
initializeCache()


root.render(
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
  {/* // <React.StrictMode> */}
  
      <App />
  {/* // </React.StrictMode> */}
  </BrowserRouter>
      <ReactQueryDevtools/>
    </QueryClientProvider>
);
