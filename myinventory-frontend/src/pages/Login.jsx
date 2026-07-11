import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

import AlertMessage from "../components/AlertMessage";
import ActionButton from "../components/ActionButton";
import FormGroup from "../components/FormGroup";
import InventoryIcon from "../components/InventoryIcon";

import "./Login.css";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();

        setErrorMessage("");

        try {
            setLoading(true);

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
                    "Credenciales inválidas o usuario inactivo"
                )
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-visual-panel">
                <div className="login-visual-content">
                <div className="login-brand">
                <InventoryIcon
                    size={22}
                />

                    <span>
                        MyInventory
                    </span>
                </div>

                    <h1 className="login-visual-title">
                        Gestiona tu inventario en tiempo real, sin complicaciones.
                    </h1>

                    <p className="login-visual-description">
                        Controla productos, categorías, proveedores, movimientos
                        y usuarios desde una sola plataforma clara, moderna y profesional.
                    </p>

                    <div className="login-visual-card">
                        <div className="login-visual-metric">
                            <span className="login-visual-metric-label">
                                Productos
                            </span>
                            <strong>+ Inventario organizado</strong>
                        </div>

                        <div className="login-visual-metric">
                            <span className="login-visual-metric-label">
                                Movimientos
                            </span>
                            <strong>+ Trazabilidad completa</strong>
                        </div>

                        <div className="login-visual-metric">
                            <span className="login-visual-metric-label">
                                Dashboard
                            </span>
                            <strong>+ Información clara y útil</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="login-form-panel">
                <div className="login-form-card">

                    <div className="login-form-header">
                        <h2 className="login-logo">
                            MyInventory
                        </h2>

                        <p className="login-subtitle">
                            Bienvenido de vuelta. Por favor ingresa tus datos.
                        </p>
                    </div>

                    <AlertMessage
                        type="error"
                        message={errorMessage}
                    />

                    <form onSubmit={handleLogin} className="login-form">

                        <FormGroup label="Correo electrónico">
                            <input
                                type="email"
                                placeholder="tu@correo.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                disabled={loading}
                                autoComplete="email"
                            />
                        </FormGroup>

                        <FormGroup label="Contraseña">
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                disabled={loading}
                                autoComplete="current-password"
                            />
                        </FormGroup>

                    <ActionButton
                        type="submit"
                        variant="primary"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? "Ingresando..." : "Iniciar Sesión"}
                    </ActionButton>
                    </form>

                </div>
            </div>

        </div>
    );
}

export default Login;