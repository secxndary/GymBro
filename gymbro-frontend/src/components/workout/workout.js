import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../navbar";



export default function WorkoutPage() {
    const [workout, setWorkout] = useState([]);
    const [routine, setRoutine] = useState(null);
    const accessToken = localStorage.getItem("access_token");
    const workoutId = window.location.href.split('/')[4];


    useEffect(() => {
        async function fetchWorkout() {
            if (workout.length === 0) {
                const res = await axios.get(
                    `https://localhost:3999/api/workout/${workoutId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const { data } = res;
                console.log('data', data);
                setWorkout(data);
                console.log('workout', workout);

                const resRoutine = await axios.get(
                    `https://localhost:3999/api/routine/get-by-id/${data.routineId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                console.log('resRoutine.data', resRoutine.data);
                setRoutine(resRoutine.data);
                console.log('routine', routine)
            }
        }

        fetchWorkout();
    }, []);


    useEffect(() => {
        console.log('routine', routine);
    }, [routine]);
    

    async function handleFinishWorkout() {
        const res = await axios.put(
            `https://localhost:3999/api/workout/end`,
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
            <NavBar />

            <div className="container mt-4">
                <h1>Workout "{routine && routine.title}"</h1>
                <div>Started: {new Date(workout.timeStart).toLocaleString()}</div>
                <div>Finished: {workout.timeEnd ? new Date(workout.timeEnd).toLocaleString() : "In progress"}</div>
                <button
                    className="btn btn-primary mt-3 btn-lg"
                    onClick={handleFinishWorkout}>
                    Finish workout</button>
            </div>
        </div>
    );
}


