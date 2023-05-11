import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RoutinesPage from './routine';
import LoginPage from './auth/signin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* user = {
      id = "6ab46a47-7155-4976-be77-783a099e37a7"
    } */}
    {/* <App /> */}
    {/* <RoutineList user={{ id: "6ab46a47-7155-4976-be77-783a099e37a7" }} /> */}
    {/* <RoutinesPage /> */}
    <LoginPage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
