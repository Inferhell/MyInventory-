import Header from "./Header";
import Sidebar from "./Sidebar";

import "./Layout.css";

function Layout({
    children
}) {

    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-area">

                <Header />

                <main className="page-wrapper">
                    <div className="page-card">
                        {children}
                    </div>
                </main>

            </div>

        </div>
    );
}

export default Layout;