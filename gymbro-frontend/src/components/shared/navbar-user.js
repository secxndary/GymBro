import React from "react";


export default function NavBar({ user }) {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/home">GymBro</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item ms-2">
                            <a class="nav-link active" href="/home">Home
                                <span class="visually-hidden">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item ms-4">
                            <a class="nav-link active" href="/users/me">{(user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : user.email}
                                <span class="visually-hidden">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item ms-4">
                            <a class="nav-link active" href="/users/me">Log out
                                <span class="visually-hidden">(current)</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}