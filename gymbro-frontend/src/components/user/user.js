import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../shared/navbar-user";
const accessToken = localStorage.getItem("access_token");



export default function UserPage() {
    const [user, setUser] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [firstNameState, setFirstName] = useState("");
    const [lastNameState, setLastName] = useState("");
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchUser() {
            const res = await axios.get(
                "https://localhost:3999/api/users/me", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            );
            const { data } = res;
            setUser(data);
            setFirstName(data.firstName);
            setLastName(data.lastName);
        }

        async function fetchWorkouts() {
            const res = await axios.get(
                "https://localhost:3999/api/workout/get-all-by-user", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            );
            const { data } = res;
            setWorkouts(data);
        }

        fetchWorkouts();
        fetchUser();
    }, []);




    const handleUpdateUser = async () => {
        var firstName = (firstNameState === "") ? undefined : firstNameState;
        var lastName = (lastNameState === "") ? undefined : lastNameState;
        try {
            const res = await axios.put(
                "https://localhost:3999/api/users/update",
                {
                    firstName: firstName,
                    lastName: lastName
                },
                {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                }
            );

        }
        catch (err) {
            console.log(err);
            const errorMessage = err.response ? err.response.data.message : err.message;
            setError(errorMessage);
        }
    };


    
    function handleLogout() {
        localStorage.removeItem("access_token");
        navigate('/');
    }


    if (!user) {
        return <div>
            <NavBar user={{}} />
            <h5 className="container mt-4">
                Loading...
            </h5>
        </div>;
    }


    return (
        <div>
            <NavBar user={user} />
            <div className="container">
                <h1 className="mt-4">Hello, Gym Bro!</h1>

                <form onSubmit={handleUpdateUser}>
                    {
                        (error && Array.isArray(error)) ?
                            error.map(err => (<p className="text-danger">{err}</p>)) :
                            <p className="text-danger">{error}</p>
                    }
                    <label>
                        Email
                        <input
                            className="form-control mb-2"
                            type="email"
                            value={user.email}
                            readOnly
                        />
                    </label>
                    <br />

                    <label>
                        First Name
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder={firstNameState}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </label>
                    <br />

                    <label>
                        Last Name
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder={lastNameState}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </label>
                    <br />


                    <button
                        className="btn btn-primary mt-2"
                        type="submit"
                    >
                        Update
                    </button>
                </form>

                <button
                    className="btn btn-secondary mt-2"
                    type="button"
                    onClick={handleLogout}>
                    Log Out
                </button>


                <h2 className="mt-4">Workouts:</h2>
                <ul>
                    {workouts.map((workout) => (
                        <li key={workout.id}>
                            <p>Start Time: {workout.timeStart ? new Date(workout.timeStart).toLocaleString() : "Not started"}</p>
                            <p>End Time: {workout.timeEnd ? new Date(workout.timeEnd).toLocaleString() : "Not finished yet"}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

