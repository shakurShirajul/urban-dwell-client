import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Dashboard from "../Layout/Dashboard";
import AdminProfile from "../Pages/Dashboard/AdminProfile";
import ManageMembers from "../Pages/Dashboard/MangeMembers/ManageMembers";
import MakeAnnouncement from "../Pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import AgreementRequests from "../Pages/Dashboard/AgreementRequests";
import ManageCoupons from "../Pages/Dashboard/ManageCoupons";
import MyProfile from "../Pages/Dashboard/MyProfile";
import MakePayment from "../Pages/Dashboard/MakePayment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import Announcements from "../Pages/Dashboard/Announcements";
import Apartments from "../Pages/Apartments/Apartments";

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
            },
            {
                path: '/aparments',
                element: <Apartments/>
            }
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'adminprofile',
                element: <AdminProfile />
            },
            {
                path: 'managemember',
                element: <ManageMembers />,
            },
            {
                path: 'makeannouncement',
                element: <MakeAnnouncement />
            },
            {
                path: 'agreementrequest',
                element: <AgreementRequests />
            },
            {
                path: 'managecoupons',
                element: <ManageCoupons />
            },
            {
                path: 'myprofile',
                element: <MyProfile />
            },
            {
                path: 'makepayment',
                element: <MakePayment />
            },
            {
                path: 'paymenthistory',
                element: <PaymentHistory />
            },
            {
                path: 'announcement',
                element: <Announcements/>
            }
        ]
    }
]);

export default router;