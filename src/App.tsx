import { createBrowserRouter } from "react-router-dom";
import {Home} from "./screens/home";
import {Login} from "./screens/login";
import {Admin} from "./screens/admin";
import {Networks} from "./screens/networks";
import { Private } from "./routes/Private";
import { ErrorPage } from "./screens/error";
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
        element: <Private><Admin /></Private>
    },
    {
        path: "/admin/networks",
        element: <Private><Networks /></Private>
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);

export {router};