import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import SignInPage from './components/auth/signin';
import SignUpPage from './components/auth/signup';
import HomePage from './components/home/home';
import WorkoutPage from './components/workout/workout';
import CreateRoutinePage from './components/routine/create-routine';
import './App.css';
import './bootstrap.css';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignInPage />} />
                <Route path='signin' element={<SignInPage />} />
                <Route path='signup' element={<SignUpPage />} />
                <Route path='home' element={<HomePage />} />
                <Route path='create-routine' element={<CreateRoutinePage />} />
                <Route path='workout/:workoutId' element={<WorkoutPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
