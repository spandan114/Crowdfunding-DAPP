import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);

reportWebVitals();
