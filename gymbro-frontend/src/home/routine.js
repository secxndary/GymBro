import React, { useState, useEffect } from "react";
import axios from "axios";



export default function HomePage() {
    const [routines, setRoutines] = useState([]);
    const accessToken = localStorage.getItem("access_token");

    useEffect(() => {
        async function fetchRoutines() {
            const res = await axios.get(
                "http://localhost:3999/api/routine/get-all-by-user", {
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




function RoutineList(props) {
    return (
        <div>
            {props.routines.map((routine) => (
                <div key={routine.id}>
                    <h3>{routine.title}</h3>
                    <button onClick={() => handleStartRoutine(routine.id)}>
                        Start Routine
                    </button>
                </div>
            ))}
        </div>
    );
}



function handleStartRoutine(routineId) {
    // Code to start routine goes here
    navigate(`/workout/${routineId}`);
}
