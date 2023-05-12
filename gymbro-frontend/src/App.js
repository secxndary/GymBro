import './App.css';
import SignInPage from './auth/signin';
import SignUpPage from './auth/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignInPage />} />
                <Route path='signin' element={<SignInPage />} />
                <Route path='signup' element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
