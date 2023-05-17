import React from "react";
import { useNavigate } from "react-router";



export default function Error404() {

    const navigate = useNavigate();
    const redirectToIndexPage = () => {
        navigate("/");
    }


    return (
        <div className="container d-flex" style={{ "margin-left": "17%", "width": "50%" }}>
            <img cursor="pointer" onClick={redirectToIndexPage} alt="" src="https://cdn.dribbble.com/users/1152726/screenshots/2940106/media/a9dc3a955065937ae8bed3fcfc036a75.gif" />
        </div>
    );
}