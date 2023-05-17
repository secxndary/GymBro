import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBarAdmin from "../shared/navbar-admin";
import AdminExercises from "./exercises";
const accessToken = localStorage.getItem("access_token");



export default function AdminDashboard() {

    let navigate = useNavigate();


    useEffect(() => {
        async function fetchRoutines() {
            const res = await axios.get(
                "https://localhost:3999/api/routine/get-all-by-user", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const { data } = res;
        }
        fetchRoutines();
    }, []);




    return (
        <div>
            <NavBarAdmin />
            <div className="container mt-4">
                <AdminExercises />
            </div>
        </div>
    );
}