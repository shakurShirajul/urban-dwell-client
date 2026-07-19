import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "@/layouts/root-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import PrivateRoute from "@/app/route-guards/private-route";
import AdminRoute from "@/app/route-guards/admin-route";
import MemberRoute from "@/app/route-guards/member-route";
import PageNotFound from "@/shared/components/page-not-found";
import { LoadingState } from "@/shared/components/ui/feedback";

const Home = lazy(() => import("@/features/home/home"));
const Login = lazy(() => import("@/features/auth/login/login"));
const Signup = lazy(() => import("@/features/auth/signup/signup"));
const Apartments = lazy(() => import("@/features/apartments/apartments"));
const AdminProfile = lazy(() => import("@/features/dashboard/admin-profile/admin-profile"));
const ManageMembers = lazy(() => import("@/features/dashboard/manage-members/manage-members"));
const MakeAnnouncement = lazy(() => import("@/features/dashboard/make-announcement/make-announcement"));
const AgreementRequests = lazy(() => import("@/features/dashboard/agreement-requests/agreement-requests"));
const ManageCoupons = lazy(() => import("@/features/dashboard/manage-coupons/manage-coupons"));
const MyProfile = lazy(() => import("@/features/dashboard/my-profile"));
const MakePayment = lazy(() => import("@/features/dashboard/make-payment/make-payment"));
const PaymentHistory = lazy(() => import("@/features/dashboard/payment-history/payment-history"));
const Announcements = lazy(() => import("@/features/dashboard/announcements/announcements"));
const PaymentPage = lazy(() => import("@/features/dashboard/make-payment/payment-page"));

const withLoadingBoundary = (element) => (
  <Suspense fallback={<LoadingState label="Preparing this view…" />}>
    {element}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: withLoadingBoundary(<Home />),
      },
      {
        path: "/apartments",
        element: withLoadingBoundary(<Apartments />),
      },
      {
        path: "/aparments",
        element: <Navigate to="/apartments" replace />,
      },
    ],
  },
  {
    path: "/login",
    element: withLoadingBoundary(<Login />),
    errorElement: <PageNotFound />,
  },
  {
    path: "/signup",
    element: withLoadingBoundary(<Signup />),
    errorElement: <PageNotFound />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="myprofile" replace />,
      },
      {
        path: "adminprofile",
        element: (
          <AdminRoute>
            {withLoadingBoundary(<AdminProfile />)}
          </AdminRoute>
        ),
      },
      {
        path: "managemember",
        element: (
          <AdminRoute>
            {withLoadingBoundary(<ManageMembers />)}
          </AdminRoute>
        ),
      },
      {
        path: "makeannouncement",
        element: (
          <AdminRoute>
            {withLoadingBoundary(<MakeAnnouncement />)}
          </AdminRoute>
        ),
      },
      {
        path: "agreementrequest",
        element: (
          <AdminRoute>
            {withLoadingBoundary(<AgreementRequests />)}
          </AdminRoute>
        ),
      },
      {
        path: "managecoupons",
        element: (
          <AdminRoute>
            {withLoadingBoundary(<ManageCoupons />)}
          </AdminRoute>
        ),
      },
      {
        path: "myprofile",
        element: (
          <PrivateRoute>
            {withLoadingBoundary(<MyProfile />)}
          </PrivateRoute>
        ),
      },
      {
        path: "makepayment",
        element: (
          <MemberRoute>
            {withLoadingBoundary(<MakePayment />)}
          </MemberRoute>
        ),
      },
      {
        path: "paymenthistory",
        element: (
          <MemberRoute>
            {withLoadingBoundary(<PaymentHistory />)}
          </MemberRoute>
        ),
      },
      {
        path: "announcement",
        element: (
          <PrivateRoute>
            {withLoadingBoundary(<Announcements />)}
          </PrivateRoute>
        ),
      },
      {
        path: "paymentpage",
        element: (
          <MemberRoute>
            {withLoadingBoundary(<PaymentPage />)}
          </MemberRoute>
        ),
      },
    ],
  },
]);

export default router;
