import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";



export default function HomePage() {
    const [routines, setRoutines] = useState([]);
    const accessToken = localStorage.getItem("access_token");


    let navigate = useNavigate();
    const routeChange = routineId => event => {
        startWorkout(routineId)
            .then(res => {
                const { id } = res;
                console.log(id);
                navigate(`/workout/${id}`);
            });
    }


    useEffect(() => {
        async function fetchRoutines() {
            const res = await axios.get(
                "http://localhost:3999/api/routine/get-all-by-user", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const { data } = res;
            setRoutines(data);
        }
        fetchRoutines();
    }, []);



    async function startWorkout(routineId) {
        console.log('DATE ISO: ', new Date().toISOString());

        const res = await axios.post(
            `http://localhost:3999/api/workout/start`,
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




    function RoutineList(props) {
        return (
            <div>
                {props.routines.map((routine) => (
                    <div key={routine.id}>
                        <h3>{routine.title}</h3>
                        <button onClick={routeChange(routine.id)}>
                            Start Routine
                        </button>
                    </div>
                ))}
            </div>
        );
    }


    return (
        <div>
            <h1>My Routines</h1>
            <RoutineList routines={routines} />
        </div>
    );
}


