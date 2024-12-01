import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// src/index.js

export { default as Clickable } from './COMPONENTS/Clickable';
export { default as Spacer } from './COMPONENTS/Spacer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

