/* ============================================================
   main.jsx — Application Entry Point
   ============================================================
   BEGINNER TIP: This is where React "starts". It takes our
   <App /> component and renders it into the #root div in
   index.html. Think of it as plugging the app into the page.
   ============================================================ */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// createRoot tells React which DOM element to control
// .render() paints our App component onto the screen
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
