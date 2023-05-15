import React, { useState, useEffect } from "react";
import axios from "axios";



export default function WorkoutPage() {
    const [workout, setWorkout] = useState([]);
    const accessToken = localStorage.getItem("access_token");

    useEffect(() => {
        async function fetchWorkout() {
            const res = await axios.get(
                "http://localhost:3999/api/workout/", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const { data } = res;
            setRoutines(data);
        }
        fetchRoutines();
    });


    return (
        <div>
            <h1>My Routines</h1>
            <RoutineList routines={routines} />
        </div>
    );
}


