
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { TranslationProvider } from './hooks/use-translation';
import { Toaster } from './components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <TranslationProvider>
          <App />
          <Toaster />
        </TranslationProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
