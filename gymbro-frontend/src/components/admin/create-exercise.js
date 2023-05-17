import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const accessToken = localStorage.getItem("access_token");



export default function CreateExercise() {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [technique, setTechnique] = useState("");
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");


    useEffect(() => {
        fetchMuscleGroups();
    }, []);



    const fetchMuscleGroups = async () => {
        try {
            const response = await axios.get("https://localhost:3999/api/muscle-group/get-all", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setMuscleGroups(response.data);
        } catch (error) {
            console.log(error);
        }
    };



    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("https://localhost:3999/api/exercise/create",
                {
                    name: name,
                    image: image,
                    technique: technique,
                    muscleGroupId: selectedMuscleGroup
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

            setName("");
            setImage(null);
            setTechnique("");
            setSelectedMuscleGroup("");

            console.log("Exercise created successfully!");
        } catch (error) {
            console.log(error);
        }
    };


    const navigate = useNavigate();
    function dismiss() {
        navigate(`/admin`);
    }




    return (
        <div>
            <div className="container mt-4" style={{ "width": "30%" }}>
                <h1>Create Exercise</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name:</label>
                        <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">Image:</label>
                        <input className="form-control" type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">Technique:</label>
                        <input className="form-control" type="text" value={technique} onChange={(e) => setTechnique(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">Muscle Group:</label>
                        <select className="form-select" value={selectedMuscleGroup} onChange={(e) => setSelectedMuscleGroup(e.target.value)} required>
                            <option value="">Select Muscle Group</option>
                            {muscleGroups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-primary btn-lg mt-3" type="submit">Create Exercise</button>
                    <button className="btn btn-secondary btn-lg mt-3 ms-3" onClick={dismiss}>Dismiss</button>
                </form>
            </div>
        </div>
    );
};
