import { createBrowserRouter } from "react-router";
import LandingPage from "../landing/LandingPage";
import LandingPage2 from "../landing/LandingPage2";
import AppPage from "../app/AppPage";

export const router = createBrowserRouter([
    {
        path: "/",
        // element: <LandingPage />,
        element: <LandingPage2 />,
    },
    {
        path: "/app",
        element: <AppPage />,
    }
])