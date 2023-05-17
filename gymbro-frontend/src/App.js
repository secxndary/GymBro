import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import './bootstrap.css';
import SignInPage from './components/auth/signin';
import SignUpPage from './components/auth/signup';
import HomePage from './components/home/home';
import WorkoutPage from './components/workout/workout';
import CreateRoutinePage from './components/routine/create-routine';
import AdminDashboard from './components/admin/dashboard';
import AdminExercises from './components/admin/exercises';
import CreateExercise from './components/admin/create-exercise';
import Error404 from './components/shared/error404';
import UpdateExercise from './components/admin/update-exercise';




export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignInPage />} />
                <Route path='signin' element={<SignInPage />} />
                <Route path='signup' element={<SignUpPage />} />
                <Route path='home' element={<HomePage />} />
                <Route path='create-routine' element={<CreateRoutinePage />} />
                <Route path='workout/:workoutId' element={<WorkoutPage />} />
                <Route path='admin' element={<AdminDashboard />} />
                <Route path='admin/exercises' element={<AdminExercises />} />
                <Route path='admin/exercises/create' element={<CreateExercise />} />
                <Route path='admin/exercises/update/:exerciseId' element={<UpdateExercise />} />
                <Route path='*' element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}
