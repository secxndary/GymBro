import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBar from "../shared/navbar-user";
const accessToken = localStorage.getItem("access_token");



export default function CreateRoutinePage() {
    const [exercises, setExercises] = useState([]);
    const [routineExercises, setRoutineExercises] = useState([]);
    const [selectedExerciseName, setSelectedExerciseName] = useState([]);
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);
    const selectRef = useRef(null);
    const navigate = useNavigate();


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
            setSelectedExerciseName(data[0].name);
        }
        fetchExercises();
    }, []);



    const addExercise = () => {
        const selectedOption = selectRef.current.value;
        setSelectedExerciseName(selectedOption);

        const selectedExercise = exercises.find(exercise => exercise.name === selectedOption);
        if (selectedExercise) {
            setRoutineExercises(prevExercises => [...prevExercises, selectedExercise]);
            setExercises(prevExercises => prevExercises.filter(exercise => exercise !== selectedExercise));
        }
    };



    const removeExercise = exerciseToRemove => {
        setRoutineExercises(prevExercises => {
            const updatedExercises = prevExercises.filter(exercise => exercise !== exerciseToRemove);
            return updatedExercises;
        });

        setExercises(prevExercises => {
            const updatedExercises = [...prevExercises, exerciseToRemove];
            return updatedExercises;
        });
    }



    async function createRoutine() {
        try {
            setError(null);
            const res = await axios.put(
                `https://localhost:3999/api/routine/create-with-exercises`,
                {
                    title: title,
                    exercises: routineExercises
                },
                {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
            const { data } = res;
            console.log(data);
            navigate('/home');
        } catch (err) {
            console.log(err);
            const errorMessage = err.response ? err.response.data.message : err.message;
            setError(errorMessage);
        }
    }




    return (
        <div>
            <NavBar />

            <div className="container mt-4">
                <h1>Create new routine</h1>

                {/* Ввод названия тренировки */}
                {error ?
                    (
                        <div class="form-group has-danger">
                            <label className="form-label mt-3" for="inputInvalid">Routine title</label>
                            <input
                                className="form-control is-invalid"
                                id="inputInvalid"
                                type="text"
                                value={title}
                                style={{ maxWidth: '300px' }}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="e.g. Chest + Triceps"
                            />
                            <div className="invalid-feedback">{error}</div>
                        </div>
                    )
                    :
                    (
                        <div class="form-group">
                            <label className="form-label mt-3" for="inputValid">Routine title</label>
                            <input
                                className="form-control"
                                id="inputValid"
                                type="text"
                                value={title}
                                style={{ maxWidth: '300px' }}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="e.g. Chest + Triceps"
                            />
                        </div>
                    )}



                {/* Уже добавленные в тренировку упражнения */}
                {routineExercises.length > 0 && routineExercises.map(exercise => (
                    <div>
                        <div className="mt-2" key={exercise.id}>{exercise.name}</div>
                        <button
                            className="btn btn-secondary"
                            onClick={() => removeExercise(exercise)}
                        >Remove</button>
                    </div>
                ))}


                {/* Форма добавления упражнений*/}
                {exercises.length > 0 && (
                    <div className="">
                        <select
                            ref={selectRef}
                            className="form-select mt-3"
                            style={{ maxWidth: '300px' }}
                            value={selectedExerciseName}
                            onChange={e => setSelectedExerciseName(e.target.value)}
                        >
                            {exercises.map(exercise => (
                                <option key={exercise.id} >{exercise.name}</option>
                            ))}
                        </select>
                        <button
                            className="btn btn-dark col-md-2 mt-2"
                            onClick={addExercise}>
                            Add exercise
                        </button>
                    </div>
                )}


                {/* Кнопка создания тренировки*/}
                <button
                    className="btn btn-primary btn-lg mt-4 col-md-3"
                    style={{ maxWidth: '400px' }}
                    onClick={createRoutine}>
                    Create routine
                </button>
            </div>
        </div>
    );
}






