import { createBrowserRouter } from "react-router-dom";
import {Home} from "./screens/home";
import {Login} from "./screens/login";
import {Admin} from "./screens/admin";
import {Networks} from "./screens/networks";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    
    },
    {
        path: "/admin",
        element: <Admin />
    },
    {
        path: "/admin/networks",
        element: <Networks />
    }
]);

export {router};