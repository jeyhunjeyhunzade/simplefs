import { createBrowserRouter } from "react-router-dom";
import App from "@app/pages/App";
import Login from "@app/pages/auth/Login";
import Signup from "@app/pages/auth/Signup";
import RouterErrorPage from "@app/router/RouterErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouterErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
