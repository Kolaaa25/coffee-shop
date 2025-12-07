import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { wakeUpBackend, prefetchMenu } from './services/backendCache';

// Wake up backend immediately when app loads (Render free tier sleeps after inactivity)
wakeUpBackend().then(() => {
  // Prefetch menu data after backend is awake
  prefetchMenu();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
