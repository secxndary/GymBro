import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../shared/navbar-user";



export default function WorkoutPage() {
    const [user, setUser] = useState({});
    const [workout, setWorkout] = useState([]);
    const [routine, setRoutine] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [timers, setTimers] = useState({});
    const [exerciseLogs, setExerciseLogs] = useState({});
    const [isRender, setIsRender] = useState(true);
    const [activeExercises, setActiveExercises] = useState({});
    const [completedTimes, setCompletedTimes] = useState({});
    const [exerciseState, setExerciseState] = useState({});
    const [activeExerciseId, setActiveExerciseId] = useState(null);

    const accessToken = localStorage.getItem("access_token");
    const workoutId = window.location.href.split('/')[4];
    const totalTime = Object.values(completedTimes).reduce((acc, curr) => acc + curr, 0);
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;



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
                setWorkout(data);

                const resRoutine = await axios.get(
                    `https://localhost:3999/api/routine/get-by-id/${data.routineId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setRoutine(resRoutine.data);


                const resExercises = await axios.get(
                    `https://localhost:3999/api/exercise/get-by-routine/${data.routineId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                
                const filteredExercises = resExercises.data.filter((exercise) => {
                    return exercise.routine.some((routine) => routine.id === data.routineId);
                });
                
                console.log(resExercises.data);
                console.log(filteredExercises);
                setExercises(filteredExercises);
            }
        }

        // async function fetchExercises() {
        //     const res = await axios.get(
        //         `https://localhost:3999/api/exercise/get-by-routine/${workout.routineId}`, {
        //         headers: {
        //             'Authorization': `Bearer ${accessToken}`
        //         }
        //     })
        //     const { data } = res;
        //     setExercises(data);
        //     console.log(data);
        // }

        async function fetchUser() {
            const res = await axios.get(
                "https://localhost:3999/api/users/me", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const { data } = res;
            setUser(data);
        }

        fetchWorkout();
        fetchUser();
    }, []);



    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return seconds > 60 ? `${minutes} min ${remainingSeconds} seconds` : `${seconds} seconds`;
    }




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




    const handleStartExercise = (exerciseId) => {
        const startTime = new Date().getTime(); // Получение текущего времени
        const newTimer = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
            setTimers((prevTimers) => ({
                ...prevTimers,
                [exerciseId]: elapsedSeconds,
            }));
        }, 1000); // Обновление счетчика каждую секунду
        setTimers((prevTimers) => ({
            ...prevTimers,
            [exerciseId]: 0, // Начальное значение счетчика
        }));

        setActiveExercises((prevActiveExercises) => ({
            ...prevActiveExercises,
            [exerciseId]: true,
        }));

        setExerciseLogs((prevLogs) => ({
            ...prevLogs,
            [exerciseId]: startTime,
        }));

        setExerciseState((prevExerciseState) => ({
            ...prevExerciseState,
            [exerciseId]: {
                startTime: startTime,
                isActive: true
            }
        }));

        setActiveExerciseId(exerciseId);
        setIsRender(true);
    };




    const handleFinishExercise = (exerciseId) => {
        clearInterval(timers[exerciseId]);
        const startTime = exerciseLogs[exerciseId];
        delete timers[exerciseId];
        delete exerciseLogs[exerciseId];
        const endTime = new Date().getTime();
        const duration = Math.floor((endTime - startTime) / 1000);

        setTimers((prevTimers) => ({
            ...prevTimers,
            [exerciseId]: duration,
        }));

        setActiveExercises((prevActiveExercises) => ({
            ...prevActiveExercises,
            [exerciseId]: false,
        }));

        setCompletedTimes((prevCompletedTimes) => ({
            ...prevCompletedTimes,
            [exerciseId]: duration,
        }));

        setExerciseState((prevExerciseState) => ({
            ...prevExerciseState,
            [exerciseId]: {
                ...prevExerciseState[exerciseId],
                isActive: true
            }
        }));

        setIsRender(false);
        setActiveExerciseId(null);

        if (exerciseId in timers) {
            clearInterval(timers[exerciseId]);
            delete timers[exerciseId];
        }

    };



    useEffect(() => {
        const keys = Object.keys(completedTimes);
        const lastKey = keys[keys.length - 1];
        const lastValue = completedTimes[lastKey];

        const sendSetData = async () => {
            try {
                console.log({
                    exerciseId: lastKey,
                    workoutId: workout.id,
                    elapsedSeconds: lastValue,
                });

                const res = await axios.post(
                    "https://localhost:3999/api/set/create",
                    {
                        exerciseId: lastKey,
                        workoutId: workout.id,
                        elapsedSeconds: lastValue,
                    },
                    {
                        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
                    }
                );
            } catch (error) {
                console.error(error);
            }
        };

        if (lastKey) {
            sendSetData();
        }
    }, [completedTimes]);




    return (
        <div>
            <NavBar user={user} />

            <div className="container mt-4">
                <h1 className="">Workout "{routine && routine.title}"</h1>
                <h4>Started: {new Date(workout.timeStart).toLocaleString()}</h4>
                <h4>Finished: {workout.timeEnd ? new Date(workout.timeEnd).toLocaleString() : "In progress"}</h4>
                <div className="mt-4">
                    <h3>
                        Total Workout Time:{" "}
                        {totalTime >= 60 ? `${minutes} min ${seconds} seconds` : `${totalTime} seconds`}
                    </h3>
                </div>

                {exercises.map((exercise, index) => (
                    <div className="mt-4" key={exercise.id}>
                        <h3>{++index}. {exercise.name}</h3>

                        <button
                            className="btn btn-dark fs-5"
                            onClick={() => handleStartExercise(exercise.id)}
                            disabled={(exerciseState[exercise.id]?.isActive) || activeExerciseId !== null && activeExerciseId !== exercise.id}
                        >
                            Start
                        </button>

                        <button
                            className="btn btn-secondary ms-2 fs-5"
                            onClick={() => handleFinishExercise(exercise.id)}
                            disabled={!isRender || activeExerciseId !== exercise.id}
                        >
                            Finish
                        </button>

                        {activeExercises[exercise.id] && (
                            <div className="fs-5">
                                <p>Elapsed Time: <b>{formatTime(timers[exercise.id])}</b></p>
                            </div>
                        )}

                        {!activeExercises[exercise.id] && timers[exercise.id] !== undefined && (
                            <div className="fs-5">
                                <p>You worked out for <b>{formatTime(completedTimes[exercise.id]) ?? timers[exercise.id]}</b></p>
                            </div>
                        )}
                    </div>
                ))}

                <button
                    className="btn btn-primary mt-5 fs-3 mb-5"
                    onClick={handleFinishWorkout}
                >
                    Finish workout
                </button>
            </div>
        </div>
    );
}


