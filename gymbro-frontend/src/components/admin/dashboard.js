import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBarAdmin from "../shared/navbar-admin";
import AdminExercises from "./exercises";
const accessToken = localStorage.getItem("access_token");
import {socket} from '../../App'

export default function AdminDashboard() {

    const [message, setMessage] = useState("");
    let navigate = useNavigate();


    useEffect(() => {
        async function fetchRoutines() {
            const res = await axios.get(
                "https://localhost:3999/api/routine/get-all-by-user", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            // const { data } = res;
        }
        fetchRoutines();
    }, []);




    async function handleSend() {
        socket.emit('notify', message);
    }




    return (
        <div>

            <NavBarAdmin />
            <div className="container mt-4">
                <div className="">
                    <label>
                        Send message
                        <input
                            className="form-control"
                            type="text"
                            onChange={e => setMessage(e.target.value)}
                        />
                    </label>
                    <button
                        className="btn btn-dark ms-3"
                        onClick={handleSend}>
                        Notify
                    </button>
                </div>

                <AdminExercises />
            </div>
        </div>
    );
}