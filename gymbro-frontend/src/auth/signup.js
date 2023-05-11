import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";


export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);


    let navigate = useNavigate();
    const routeChange = path => event => {
        navigate(path);
    }


    async function handleRegister(e) {
        e.preventDefault();
        var res = null;
        try {
            setError(null);
            res = await axios.post(
                "http://localhost:3999/api/auth/signin",
                {
                    email,
                    password
                });
            const { data } = res;

            localStorage.setItem("access_token", data.access_token);
            console.log(localStorage.getItem("access_token"))
        } catch (err) {
            console.log(err);
            const errorMessage = err.response ? err.response.data.message : err.message;
            setError(errorMessage);
        }
    }


    return (
        <div>
            <h1>Sign Up page</h1>
            {
                (error && Array.isArray(error)) ?
                    error.map(err => (<p>{err}</p>)) :
                    <p>{error}</p>
            }
            <form onSubmit={handleRegister}>
                <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Sign Up</button>
                <button onClick={routeChange(`/signin`)}>Already have an account?</button>
            </form>
        </div>
    );
}