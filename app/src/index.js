import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import AuthProv from './AuthProv';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProv>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProv>
    
  </React.StrictMode>
);
reportWebVitals();

//

