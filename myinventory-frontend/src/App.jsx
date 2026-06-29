import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";


import PermissionRoute from "./components/PermissionRoute";
import Forbidden from "./pages/Forbidden";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
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
    path="/forbidden"
    element={<Forbidden />}
/>

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
    path="/dashboard"
    element={
        <PermissionRoute permission="DASHBOARD_READ">
            <Layout>
                <Dashboard />
            </Layout>
        </PermissionRoute>
    }
/>

<Route
    path="/products"
    element={
        <PermissionRoute permission="PRODUCT_READ">
            <Layout>
                <Products />
            </Layout>
        </PermissionRoute>
    }
/>

<Route
    path="/categories"
    element={
        <PermissionRoute permission="CATEGORY_READ">
            <Layout>
                <Categories />
            </Layout>
        </PermissionRoute>
    }
/>

<Route
    path="/suppliers"
    element={
        <PermissionRoute permission="SUPPLIER_READ">
            <Layout>
                <Suppliers />
            </Layout>
        </PermissionRoute>
    }
/>

<Route
    path="/movements"
    element={
        <PermissionRoute permission="MOVEMENT_READ">
            <Layout>
                <Movements />
            </Layout>
        </PermissionRoute>
    }
/>

<Route
    path="/users"
    element={
        <PermissionRoute permission="USER_READ">
            <Layout>
                <Users />
            </Layout>
        </PermissionRoute>
    }
/>

            </Routes>

        </BrowserRouter>
    );
}

export default App;