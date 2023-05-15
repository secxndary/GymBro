import React, { useState, useEffect } from "react";
import axios from "axios";



export default function WorkoutPage() {
    const [workout, setWorkout] = useState([]);
    const accessToken = localStorage.getItem("access_token");
    const workoutId = window.location.href.split('/')[4];


    useEffect(() => {
        async function fetchWorkout() {
            const res = await axios.get(
                `http://localhost:3999/api/workout/${workoutId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const { data } = res;
            setWorkout(data);
        }
        fetchWorkout();
    }, []);



    async function handleFinishWorkout() {
        const res = await axios.put(
            `http://localhost:3999/api/workout/end`,
            {
                timeEnd: new Date().toISOString(),
                workoutId: workout.id
            },
            {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
        const { data } = res;
        setWorkout(data);
    }


    return (
        <div>
            <h1>Workout</h1>
            <div>Started: {new Date(workout.timeStart).toLocaleString()}</div>
            <div>Finished: {new Date(workout.timeEnd).toLocaleString()}</div>
            <br />
            <button onClick={handleFinishWorkout}>Finish workout</button>
        </div>
    );
}


