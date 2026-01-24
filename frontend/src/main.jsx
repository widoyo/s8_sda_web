import "./styles/index.css";

import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { Toaster } from "./components/toast";
import { TokenProvider } from "./hooks/useToken";
import { createRoot } from "react-dom/client";
import { router } from "./routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenProvider>
      <RouterProvider router={router} />
      <Toaster richColors closeButton />
    </TokenProvider>
  </StrictMode>
);
