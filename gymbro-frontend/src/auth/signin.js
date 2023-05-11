import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);


    async function handleLogin(e) {
        e.preventDefault();
        try {
            console.log(JSON.stringify({ email, password }))
            // const response = await fetch("http://localhost:3999/api/auth/signin", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     mode: "no-cors",
            //     body: JSON.stringify({ email, password })
            // });

            const { data } = await axios.post("http://localhost:3999/api/auth/signin",
                { email, password });

            console.log(data);

            // if (!response.ok) {
            //     console.log(response);
            //     throw new Error("Failed to log in");
            // }

            localStorage.setItem("access_token", data.access_token);
            console.log(localStorage.getItem("access_token"))
            // window.location.href = "/dashboard";
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <h1>Login Page</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginPage;
