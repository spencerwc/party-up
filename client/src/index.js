import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CommentProvider } from './context/CommentContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <AuthProvider>
                <CommentProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </CommentProvider>
            </AuthProvider>
        </MantineProvider>
    </React.StrictMode>
);
