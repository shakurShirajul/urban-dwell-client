import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Dashboard from "../Layout/Dashboard";
import AdminProfile from "../Pages/Dashboard/AdminProfile";
import ManageMembers from "../Pages/Dashboard/MangeMembers/ManageMembers";
import MakeAnnouncement from "../Pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import AgreementRequests from "../Pages/Dashboard/AgreementRequests/AgreementRequests";
import ManageCoupons from "../Pages/Dashboard/ManageCoupons";
import MyProfile from "../Pages/Dashboard/MyProfile";
import MakePayment from "../Pages/Dashboard/MakePayment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import Announcements from "../Pages/Dashboard/Announcements/Announcements";
import Apartments from "../Pages/Apartments/Apartments";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";

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
                element: <PrivateRoute><Apartments /></PrivateRoute>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'adminprofile',
                element: <AdminRoute><AdminProfile /></AdminRoute>
            },
            {
                path: 'managemember',
                element: <AdminRoute><ManageMembers /></AdminRoute>,
            },
            {
                path: 'makeannouncement',
                element: <AdminRoute><MakeAnnouncement /></AdminRoute>,
            },
            {
                path: 'agreementrequest',
                element: <AdminRoute><AgreementRequests /></AdminRoute>,
            },
            {
                path: 'managecoupons',
                element: <AdminRoute><ManageCoupons /></AdminRoute>,
            },
            {
                path: 'myprofile',
                element: <PrivateRoute><MyProfile /></PrivateRoute>,
            },
            {
                path: 'makepayment',
                element: <MemberRoute><MakePayment /></MemberRoute>
            },
            {
                path: 'paymenthistory',
                element: <MemberRoute><PaymentHistory /></MemberRoute>
            },
            {
                path: 'announcement',
                element: <PrivateRoute><Announcements /></PrivateRoute>
            }
        ]
    }
]);

export default router;