import './App.css';
import SignInPage from './auth/signin';
import SignUpPage from './auth/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// function Hello({ user }) {
//     return (
//         <h1>Hello, {user}</h1>
//     )
// };

function App() {
    return (
        // <div className="App">
        //     <header className="App-header">
        //         <img src={logo} className="App-logo" alt="logo" />
        //         <Hello user="sanya" />
        //         <p>
        //             Edit <code>src/App.js</code> and save to reload.
        //         </p>
        //         <a
        //             className="App-link"
        //             href="https://reactjs.org"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             Learn React
        //         </a>
        //     </header>
        // </div>

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
