import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const accessToken = localStorage.getItem("access_token");




export default function CreateRoutinePage() {
    const [exercises, setExercises] = useState([]);
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
            <h1>Create routine</h1>
            <input
                type="text"
                value={title}
                placeholder="Routine title"
                onChange={e => setTitle(e.target.value)}
            />
            <br /> <br /><br />
            <select>
                {exercises.map(exercise => (
                    <option key={exercise.id}>{exercise.name}</option>
                ))}
            </select>
            <button onClick={addExercise}>Add exercise</button>            
        </div>
    );
}



function addExercise() {

}



