import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../shared/navbar-user";
// import WorkoutExercises from "./workout-exercises";



export default function WorkoutPage() {
    const [workout, setWorkout] = useState([]);
    const [routine, setRoutine] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [timers, setTimers] = useState({}); // Локальное состояние для хранения таймеров
    const [exerciseLogs, setExerciseLogs] = useState({}); // Локальное состояние для хранения отметок времени начала упражнений
    const [isRender, setIsRender] = useState(true);
    const [activeExercises, setActiveExercises] = useState({});
    const [completedTimes, setCompletedTimes] = useState({});
    const [exerciseState, setExerciseState] = useState({});
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
                setWorkout(data);

                const resRoutine = await axios.get(
                    `https://localhost:3999/api/routine/get-by-id/${data.routineId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setRoutine(resRoutine.data);
            }
        }

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

        fetchWorkout();
        fetchExercises();
    }, []);




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

        setIsRender(true);
    };



    const handleFinishExercise = (exerciseId) => {
        clearInterval(timers[exerciseId]);
        const startTime = exerciseLogs[exerciseId];
        delete timers[exerciseId];
        delete exerciseLogs[exerciseId];
        const endTime = new Date().getTime();
        const duration = Math.floor((endTime - startTime) / 1000);
        setIsRender(false);
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

        // Добавляем эту часть кода для остановки отсчета времени
        if (exerciseId in timers) {
            clearInterval(timers[exerciseId]);
            delete timers[exerciseId];
        }
    };




    return (
        <div>
            <NavBar />

            <div className="container mt-4">
                <h1 className="">Workout "{routine && routine.title}"</h1>
                <h4>Started: {new Date(workout.timeStart).toLocaleString()}</h4>
                <h4>Finished: {workout.timeEnd ? new Date(workout.timeEnd).toLocaleString() : "In progress"}</h4>

                {exercises.map((exercise) => (
                    <div className="mt-4" key={exercise.id}>
                        <h3>{exercise.name}</h3>

                        <button
                            className="btn btn-dark fs-5"
                            onClick={() => handleStartExercise(exercise.id)}
                            disabled={exerciseState[exercise.id]?.isActive}
                        >
                            Start
                        </button>

                        <button
                            className="btn btn-secondary ms-2 fs-5"
                            onClick={() => handleFinishExercise(exercise.id)}
                            disabled={!activeExercises[exercise.id]}
                        >
                            Finish
                        </button>

                        {activeExercises[exercise.id] && (
                            <div className="fs-5">
                                <p>Elapsed Time: {timers[exercise.id]} seconds</p>
                            </div>
                        )}

                        {!activeExercises[exercise.id] && timers[exercise.id] !== undefined && (
                            <div className="fs-5">
                                <p>You worked out for {completedTimes[exercise.id] ?? timers[exercise.id]} seconds</p>
                            </div>
                        )}
                    </div>
                ))}

                <button
                    className="btn btn-primary mt-5 fs-3"
                    onClick={handleFinishWorkout}
                >
                    Finish workout
                </button>
            </div>
        </div>
    );
}


