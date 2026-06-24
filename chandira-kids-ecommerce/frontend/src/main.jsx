import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { CompareProvider } from './context/CompareContext.jsx';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx';
import { SearchHistoryProvider } from './context/SearchHistoryContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <CompareProvider>
                <RecentlyViewedProvider>
                  <SearchHistoryProvider>
                    <App />
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        duration: 3000,
                        style: {
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                          fontSize: '0.9375rem',
                          fontWeight: 600,
                          borderRadius: '16px',
                          padding: '14px 18px',
                          boxShadow: '0 8px 32px -8px rgba(26, 26, 46, 0.12)'
                        },
                        success: { iconTheme: { primary: '#C43670', secondary: '#fff' } }
                      }}
                    />
                  </SearchHistoryProvider>
                </RecentlyViewedProvider>
              </CompareProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </HelmetProvider>
);
