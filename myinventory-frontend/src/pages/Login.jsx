import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../hooks/useAuth";

import {
    getApiErrorMessage
} from "../utils/getApiErrorMessage";

import AlertMessage from "../components/AlertMessage";
import ActionButton from "../components/ActionButton";

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

    const [loading, setLoading] =
        useState(false);

    const handleLogin = async (event) => {

        event.preventDefault();

        setErrorMessage("");
        setLoading(true);

        try {

            await login({
                email,
                password
            });

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            setErrorMessage(
                getApiErrorMessage(
                    error,
                    "Correo o contraseña incorrectos"
                )
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div>

            <h1>
                MyInventory
            </h1>

            <AlertMessage
                type="error"
                message={errorMessage}
            />

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    disabled={loading}
                    required
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    disabled={loading}
                    required
                />

                <br />
                <br />

                <ActionButton
                    type="submit"
                    variant="primary"
                    disabled={loading}
                >
                    {
                        loading
                            ? "Ingresando..."
                            : "Iniciar Sesión"
                    }
                </ActionButton>

            </form>

        </div>
    );
}

export default Login;