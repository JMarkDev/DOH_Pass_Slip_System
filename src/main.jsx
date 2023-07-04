import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
    <App />
    </AuthProvider>
    {/* <React.StrictMode> */}
    {/* </React.StrictMode> */}
  </Router>
)
