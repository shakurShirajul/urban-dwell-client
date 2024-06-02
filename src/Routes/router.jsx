import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
// import Root from "../Layout/Root";
// import Home from "../Pages/Home/Home";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Root></Root>,
//         children: [
//             {
//                 path: "/",
//                 element: <Home></Home>
//             },
//         ]
//     }
// ])

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    },
]);

export default router;