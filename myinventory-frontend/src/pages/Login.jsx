import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    login,
    getCurrentUser
} from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = async () => {

        try {

            await login(
                email,
                password
            );

            const user =
    await getCurrentUser();

if (
    !user ||
    !user.email
) {

    throw new Error(
        "No existe usuario autenticado"
    );
}

localStorage.setItem(
    "user",
    JSON.stringify(user)
);

            alert(
                `Bienvenido ${user.email}`
            );

            navigate("/");

        } catch (error) {

    localStorage.removeItem(
        "user"
    );

    alert(
        "Correo o contraseña incorrectos"
    );
}
    };

    return (

        <div>

            <h1>
                MyInventory
            </h1>

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
                onClick={handleSubmit}
            >
                Iniciar Sesión
            </button>

        </div>
    );
}

export default Login;