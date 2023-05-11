import React, { useState } from "react";
import axios from "axios";


export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);


    async function handleLogin(e) {
        e.preventDefault();
        const res = null;
        try {
            res = await axios.post(
                "http://localhost:3999/api/auth/signin",
                {
                    email,
                    password
                });
            const { data } = res;

            // if (!response.ok) {
            //     throw new Error("Failed to log in");
            // }

            localStorage.setItem("access_token", data.access_token);
            console.log(localStorage.getItem("access_token"))
        } catch (err) {
            const errorMessage = err.response.data.message;
            setError(errorMessage);
        }
    }

    return (
        <div>
            <h1>Sign in page</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
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
                <button type="submit">Log In</button>
                <button>Register</button>
            </form>
        </div>
    );
}