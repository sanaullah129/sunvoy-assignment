import { useContext } from "react";
import { RouteContext } from "./context/RouterContext";
import UserList from "./pages/UserList";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

export default function Router() {
    const { path } = useContext(RouteContext);

    switch (path) {
        case '/list':
            return <UserList />;
        case '/settings':
            return <Settings />;
        default:
            return <Login />;
    }
}