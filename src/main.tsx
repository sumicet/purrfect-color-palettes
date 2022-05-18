import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import './index.css';
import { theme } from './theme/default';

const root = document.getElementById('root');

render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    root
);
