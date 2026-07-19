import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import router from "@/app/router";
import { HelmetProvider } from "react-helmet-async";

import AuthProvider from "@/app/auth/auth-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            theme="colored"
          />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
