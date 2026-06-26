import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {

    return (
        <div>

            <Sidebar />

            <div>

                <Header />

                {children}

            </div>

        </div>
    );
}

export default Layout;