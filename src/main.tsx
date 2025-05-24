
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TranslationProvider } from "./hooks/use-translation.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TranslationProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TranslationProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
