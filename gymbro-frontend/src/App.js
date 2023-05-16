import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignInPage from './auth/signin';
import SignUpPage from './auth/signup';
import HomePage from './home/home';
import WorkoutPage from './workout/workout';
import CreateRoutinePage from './routine/create-routine';


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
