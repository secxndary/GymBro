import React from "react";


export default function NavBar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand">GymBro</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link active">Home
                                <span class="visually-hidden">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">Features</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">Pricing</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}