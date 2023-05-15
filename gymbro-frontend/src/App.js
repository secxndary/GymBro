import './App.css';
import SignInPage from './auth/signin';
import SignUpPage from './auth/signup';
import HomePage from './home/routine';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorkoutPage from './workout/workout';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignInPage />} />
                <Route path='signin' element={<SignInPage />} />
                <Route path='signup' element={<SignUpPage />} />
                <Route path='home' element={<HomePage />} />
                <Route path='workout' element={<WorkoutPage />} />  // TODO: add query parameter with id
            </Routes>
        </BrowserRouter>
    );
}

export default App;
