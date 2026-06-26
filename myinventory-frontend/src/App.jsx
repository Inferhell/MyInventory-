import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import Movements from "./pages/Movements";
import Users from "./pages/Users";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Products />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
    path="/categories"
    element={
        <ProtectedRoute>
            <RoleRoute
                roles={[
                    "ROLE_ADMIN",
                    "ROLE_SUPERVISOR"
                ]}
            >
                <Layout>
                    <Categories />
                </Layout>
            </RoleRoute>
        </ProtectedRoute>
    }
/>

                <Route
    path="/suppliers"
    element={
        <ProtectedRoute>
            <RoleRoute
                roles={[
                    "ROLE_ADMIN",
                    "ROLE_SUPERVISOR"
                ]}
            >
                <Layout>
                    <Suppliers />
                </Layout>
            </RoleRoute>
        </ProtectedRoute>
    }
/>

                <Route
                    path="/movements"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Movements />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
    path="/users"
    element={
        <ProtectedRoute>
            <RoleRoute
                roles={[
                    "ROLE_ADMIN"
                ]}
            >
                <Layout>
                    <Users />
                </Layout>
            </RoleRoute>
        </ProtectedRoute>
    }
/>

            </Routes>

        </BrowserRouter>
    );
}

export default App;