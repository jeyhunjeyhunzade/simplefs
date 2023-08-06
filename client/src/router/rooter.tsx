import { createBrowserRouter } from "react-router-dom";
import App from "@app/pages/App";
import Login from "@app/pages/auth/Login";
import Signup from "@app/pages/auth/Signup";
import RouterErrorPage from "@app/router/RouterErrorPage";

export enum Routes {
  homepage = "/",
  login = "/login",
  signup = "/signup",
}

export const router = createBrowserRouter([
  {
    path: Routes.homepage,
    element: <App />,
    errorElement: <RouterErrorPage />,
  },
  {
    path: Routes.login,
    element: <Login />,
  },
  {
    path: Routes.signup,
    element: <Signup />,
  },
]);
