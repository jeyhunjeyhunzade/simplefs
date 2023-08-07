import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "@app/router/rooter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div>
        <Toaster />
      </div>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
