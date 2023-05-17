import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const accessToken = localStorage.getItem("access_token");




export default function AdminExercises() {
    const [exercises, setExercises] = useState([]);
    const [muscleGroups, setMuscleGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const exercisesResponse = await axios.get(
                    'https://localhost:3999/api/exercise/get-all', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setExercises(exercisesResponse.data);

                const muscleGroupsResponse = await axios.get(
                    'https://localhost:3999/api/muscle-group/get-all', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                setMuscleGroups(muscleGroupsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);


    function handleEdit(exerciseId) {
        // Обработчик редактирования упражнения
        // ...
    }

    function handleDelete(exerciseId) {
        // Обработчик удаления упражнения
        // ...
    }

    function addExercise() {
        navigate(`/admin/exercises/create`);
    }


    return (
        <div>
            <h1 className="mb-4">Exercises List</h1>
            <button className="btn btn-primary fs-3 mb-5" onClick={addExercise} >Add exercise</button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2  px" }}>
                {exercises.map((exercise, index) => (
                    <div className="card border-primary mb-3" style={{ maxWidth: "90%" }} key={exercise.id}>
                        <div className="card-header">Exercise №{++index}</div>
                        <div className="card-body">
                            <div>
                                <h3>{exercise.name}</h3>
                                <p>Technique: {exercise.technique}</p>
                                <p>Muscle Group: {muscleGroups.find((group) => group.id === exercise.muscleGroupId) && muscleGroups.find((group) => group.id === exercise.muscleGroupId).name}</p>
                                <button className="btn btn-info fs-5" onClick={() => handleEdit(exercise.id)}>Edit</button>
                                <button className="btn btn-secondary ms-3 fs-5" onClick={() => handleDelete(exercise.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}
