import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./AppRouter";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
import { queryClient } from "./api/query";
import { QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
