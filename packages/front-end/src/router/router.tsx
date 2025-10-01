import { Game1, Game2, Dictionary, ErrorPage, AdminPage}  from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
    {
        index: true,
        element: <div>Home page!</div>
    },
    {
        path: '/game1',
        element: <Game1/>
    },
    {
        path: '/game2',
        element: <Game2/>
    },
    {
        path: "/dictionary",
        element: <Dictionary/>
    },
    {
        path: "/errortest",
        element: <ErrorPage/>
    },
    {
        path: "/admin",
        element: <AdminPage/>
    }
])

export function Router() {
    return <RouterProvider router={router}/>
}