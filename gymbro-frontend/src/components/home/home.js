import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBar from "../navbar";
const accessToken = localStorage.getItem("access_token");



export default function HomePage() {
    const [routines, setRoutines] = useState([]);


    let navigate = useNavigate();
    const changePathWorkout = routineId => event => {
        startWorkout(routineId)
            .then(res => {
                const { id } = res;
                navigate(`/workout/${id}`);
            });
    }


    const changePathNewRoutine = () => {
        navigate(`/create-routine`);
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
                        <h3>{routine.title}</h3>
                        <button onClick={changePathWorkout(routine.id)}>
                            Start Routine
                        </button>
                    </div>
                ))}
                <br /> <br /> <br />
                <button onClick={changePathNewRoutine}>Create new routine</button>
            </div>
        );
    }


    return (
        <div>
            <NavBar />
            <h1>My Routines</h1>
            <RoutineList routines={routines} />
        </div>
    );
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