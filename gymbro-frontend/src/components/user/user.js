import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBar from "../shared/navbar-user";
const accessToken = localStorage.getItem("access_token");



export default function UserPage() {
    const [user, setUser] = useState(null);
    const [workouts, setWorkouts] = useState([]);



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
        // Логика для обновления пользователя через API
        // Используйте значения полей email, firstName, lastName, role из состояния
    };

    const handleLogout = () => {
        // Логика для выхода из аккаунта
    };

    const handleDeleteProfile = () => {
        // Логика для удаления профиля
    };


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

                <form>
                    <label>Email
                        <input
                            className="form-control mb-2"
                            type="email"
                            value={user.email}
                            readOnly
                        />
                    </label>
                    <br />

                    <label>First Name
                        <input
                            className="form-control mb-2"
                            type="text"
                            value={user.firstName}
                        />
                    </label>
                    <br />

                    <label>Last Name
                        <input
                            className="form-control mb-2"
                            type="text"
                            value={user.lastName}
                        />
                    </label>
                    <br />


                    <button
                        className="btn btn-primary mt-2"
                        type="button"
                        onClick={handleUpdateUser}>
                        Update
                    </button>
                </form>

                <button
                    className="btn btn-primary mt-2"
                    type="button"
                    onClick={handleLogout}>
                    Log Out
                </button>
                <button
                    className="btn btn-secondary ms-2 mt-2"
                    type="button"
                    onClick={handleDeleteProfile}>
                    Delete Profile
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

