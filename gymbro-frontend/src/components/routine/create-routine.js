import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import axios from "axios";
import NavBar from "../navbar";
const accessToken = localStorage.getItem("access_token");



export default function CreateRoutinePage() {
    const [exercises, setExercises] = useState([]);
    // eslint-disable-next-line
    const [routineExercises, setRoutineExercises] = useState([]);
    const [title, setTitle] = useState("");


    useEffect(() => {
        async function fetchExercises() {
            const res = await axios.get(
                "https://localhost:3999/api/exercise/get-all", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const { data } = res;
            setExercises(data);
        }
        fetchExercises();
    }, []);




    return (
        <div>
            <NavBar />

            <div className="container mt-4">
                <h1>Create new routine</h1>
                <input
                    type="text"
                    value={title}
                    placeholder="Routine title"
                    className="form-control mt-3"
                    style={{ width: '20%' }}
                    onChange={e => setTitle(e.target.value)}
                />
                <br /> <br /><br />
                <select>
                    {exercises.map(exercise => (
                        <option key={exercise.id}>{exercise.name}</option>
                    ))}
                </select>
                <button
                    className="btn btn-secondary"
                    onClick={addExercise}>
                    Add exercise</button>
                <br /> <br /> <br />
                <button
                    className="btn btn-primary"
                    onClick={createRoutine}
                >Create routine</button>
            </div>
        </div>
    );
}



function addExercise() {

}


function createRoutine() {

}

