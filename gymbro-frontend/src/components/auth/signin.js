import React, { useState} from "react";
import { useNavigate } from "react-router";
import axios from "axios";


export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);


    let navigate = useNavigate();
    const routeChange = path => event => {
        navigate(path);
    }


    async function handleLogin(e) {
        e.preventDefault();
        var res = null;
        try {
            setError(null);
            res = await axios.post(
                "https://localhost:3999/api/auth/signin",
                {
                    email,
                    password
                });
            const { data } = res;

            localStorage.setItem("access_token", data.access_token);
            console.log(localStorage.getItem("access_token"))
            const userRes = await axios.get("https://localhost:3999/api/users/me", {
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                },
            });

            setUser(userRes.data);
            console.log('get users me', userRes.data);
            console.log('roleId', userRes.data.roleId);

            const roleRes = await axios.get(`https://localhost:3999/api/role/get-by-id/${userRes.data.roleId}`, {
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                },
            });
            setRole(roleRes.data);


            // useEffect(() => {
            if (role) {
                if (role.name === 'ADMIN')
                    navigate('/admin');
                else
                    navigate('/home');
            }
            // }, [role]);
        } catch (err) {
            console.log(err);
            const errorMessage = err.response ? err.response.data.message : err.message;
            setError(errorMessage);
        }
    }



    return (
        <div className="container mt-4">
            <h1>Sign In page</h1>
            {
                (error && Array.isArray(error)) ?
                    error.map(err => (<p className="text-danger">{err}</p>)) :
                    <p className="text-danger">{error}</p>
            }
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Email
                        <input
                            className="form-control"
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />

                    <label>
                        Password
                        <input
                            className="form-control"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <br />

                    <button
                        className="btn btn-primary"
                        type="submit">
                        Sign In
                    </button>
                    <button
                        className="btn btn-secondary ms-3"
                        onClick={routeChange(`/signup`)}>
                        Create new account
                    </button>
                </div>

            </form>
        </div>
    );
}