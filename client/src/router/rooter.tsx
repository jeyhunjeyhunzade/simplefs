import { createBrowserRouter } from "react-router-dom";
import App from "@app/pages/App";
import RouterErrorPage from "@app/router/RouterErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouterErrorPage />,
  },
]);
