// main.jsx
// ============================================================
// This is the ENTRY POINT of the React application.
// It connects React to the HTML file (index.html).
// React will "mount" (render) the <App /> component inside
// the <div id="root"> element in index.html.
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component
import App from './App';

// Import global CSS styles
import './index.css';

// ReactDOM.createRoot() finds the #root div in index.html
// and tells React to render everything inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode helps detect potential problems during development
  // (it renders components twice in dev mode to catch bugs)
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
