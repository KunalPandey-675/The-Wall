import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./routes/App.jsx";

// <-------------Pages ----------->

import CreatePost from "./pages/CreatePost.jsx";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import MyPosts from "./pages/MyPosts.jsx";
// <-------------Components ----------->

import PostList from "./components/PostList.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthenticatedRoute from "./components/AuthenticatedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PostList />,
      },
      {
        path: "/create-post",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthenticatedRoute>
            <Login />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthenticatedRoute>
            <SignUp />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "/otp",
        element: <OtpVerification />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-posts",
        element: (
          <ProtectedRoute>
            <MyPosts />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <PostList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
