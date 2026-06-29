import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    useAuth
} from "../hooks/useAuth";
import {
    getApiErrorMessage
} from "../utils/getApiErrorMessage";

function Login() {

    const {
        login
    } = useAuth();

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [errorMessage, setErrorMessage] =
        useState("");

    const handleLogin = async (event) => {

        event.preventDefault();

        setErrorMessage("");

        try {

            await login({
                email,
                password
            });

            alert(
                `Bienvenido ${email}`
            );

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            setErrorMessage(
    getApiErrorMessage(
        error,
        "Credenciales inválidas o usuario inactivo"
    )
);
        }
    };

    return (

        <div>

            <h1>
                MyInventory
            </h1>

            {
                errorMessage && (

                    <p
                        style={{
                            color: "red"
                        }}
                    >
                        {errorMessage}
                    </p>
                )
            }

            <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) =>
                    setEmail(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <button
                onClick={handleLogin}
            >
                Iniciar Sesión
            </button>

        </div>
    );
}

export default Login;