import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBar from "../navbar";
const accessToken = localStorage.getItem("access_token");



export default function HomePage() {
    const [routines, setRoutines] = useState([]);

    let navigate = useNavigate();
    const changePathWorkout = routineId => {
        startWorkout(routineId)
            .then(res => {
                const { id } = res;
                navigate(`/workout/${id}`);
            });
    }


    const changePathNewRoutine = () => {
        navigate(`/create-routine`);
    }



    async function startWorkout(routineId) {
        const res = await axios.post(
            `https://localhost:3999/api/workout/start`,
            {
                timeStart: new Date().toISOString(),
                routineId: routineId
            },
            {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            }
        );
        const { data } = res;
        console.log('data', data)
        return data;
    }



    const deleteRoutine = routineId => {
        axios.delete(
            `https://localhost:3999/api/routine/delete/${routineId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => {
            setRoutines((prevRoutines) =>
                prevRoutines.filter((routine) => routine.id !== routineId)
            );
        }).catch(err => {
            console.log(err);
        })
    }



    useEffect(() => {
        async function fetchRoutines() {
            const res = await axios.get(
                "https://localhost:3999/api/routine/get-all-by-user", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const { data } = res;
            setRoutines(data);
        }
        fetchRoutines();
    }, []);



    function RoutineList(props) {
        return (
            <div>
                {props.routines.map(routine => (
                    <div key={routine.id}>
                        <h3 className="mt-4">{routine.title}</h3>
                        <button
                            className="btn btn-dark"
                            onClick={() => changePathWorkout(routine.id)}>
                            Start Routine
                        </button>
                        <button
                            className="btn btn-secondary ms-3"
                            onClick={() => deleteRoutine(routine.id)}>
                            Delete Routine
                        </button>

                    </div>
                ))}
                <br />
                <button
                    className="btn btn-primary mt-3 fs-4"
                    onClick={changePathNewRoutine}>
                    Create new routine
                </button>
            </div>
        );
    }


    return (
        <div>
            <NavBar />
            <div className="container mt-4">
                <h1 className="mb-4">My Routines</h1>
                <RoutineList routines={routines} />
            </div>
        </div>
    );
}