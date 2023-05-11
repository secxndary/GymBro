import React, { useState, useEffect } from "react";
import axios from "axios";



function RoutinesPage() {
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        async function fetchRoutines() {
            const response = await fetch('localhost:3999/routine/get-all-by-user');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRoutines(data);
        }
        fetchRoutines();
    }, []);

    return (
        <div>
            <h1>My Routines</h1>
            <RoutineList routines={routines} />
        </div>
    );
}





function RoutineList(props) {
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        async function fetchRoutines() {
            const response = await axios.get("/routine/get-all-by-user", {
                params: { userId: props.userId }
            });
            setRoutines(response.data);
        }
        fetchRoutines();
    }, [props.userId]);

    return (
        <div>
            {routines.map((routine) => (
                <div key={routine.id}>
                    <h3>{routine.title}</h3>
                    <button onClick={() => handleStartRoutine(routine.id)}>
                        Start Routine
                    </button>
                </div>
            ))}
        </div>
    );

    function handleStartRoutine(routineId) {
        // Code to start routine goes here
    }
}



export default RoutinesPage;
