import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
// import nodemailer from 'nodemailer';


export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstNameState, setFirstName] = useState("");
    const [lastNameState, setLastName] = useState("");
    const [error, setError] = useState(null);


    let navigate = useNavigate();
    const routeChange = path => event => {
        navigate(path);
    }


    async function handleRegister(e) {
        e.preventDefault();
        try {
            setError(null);
            var firstName = (firstNameState === "") ? null : firstNameState;
            var lastName = (lastNameState === "") ? null : lastNameState;
            const res = await axios.post(
                "https://localhost:3999/api/auth/signup",
                {
                    email,
                    password,
                    firstName,
                    lastName
                });
            const { data } = res;

            localStorage.setItem("access_token", data.access_token);
            console.log(localStorage.getItem("access_token"))

            navigate("/")
        } catch (err) {
            console.log(err);
            const errorMessage = err.response ? err.response.data.message : err.message;
            setError(errorMessage);
        }
    }



    function sendmail() {
        // Создание транспортера для отправки писем
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'gymbronotification@gmail.com',
                pass: 'yetvzowwyzprhnic',
            },
        });

        // Опции для отправки письма
        const mailOptions = {
            from: 'gymbronotification@gmail.com',
            to: 'valdaitsevv@mail.ru',
            subject: 'GymBro',
            text: 'Привет, спасибо за регистрацию! Добро пожаловать в команду GymBro. Успехов в твоих тренировках!',
        };

        // Отправка письма
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Ошибка при отправке письма:', error);
            } else {
                console.log('Письмо успешно отправлено:', info.response);
            }
        });

    }




    return (
        <div className="container mt-4">
            <h1>Sign Up</h1>
            {
                (error && Array.isArray(error)) ?
                    error.map(err => (<p className="text-danger">{err}</p>)) :
                    <p className="text-danger">{error}</p>
            }
            <form onSubmit={handleRegister}>
                <label>
                    Email
                    <input
                        className="form-control"
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    Password
                    <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    First Name
                    <input
                        className="form-control"
                        type="text"
                        value={firstNameState}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    Last Name
                    <input
                        className="form-control"
                        type="text"
                        value={lastNameState}
                        onChange={e => setLastName(e.target.value)}
                    />
                </label>
                <br />
                <br />

                <button
                    className="btn btn-primary"
                    type="submit">
                    Sign Up
                </button>
                <button
                    className="btn btn-secondary ms-3"
                    onClick={routeChange(`/signin`)}>
                    Already have an account?
                </button>
            </form>
        </div>
    );
}