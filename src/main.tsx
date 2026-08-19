import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TranslationProvider } from "./hooks/use-translation.tsx";

const queryClient = new QueryClient();
const VIRTUAL_ESTIMATE_ORIGIN = "https://dreamframe-site.vercel.app";

const hostname = window.location.hostname.toLowerCase();
const pathname = window.location.pathname;
const isLovablePreview =
  hostname.endsWith(".lovable.app") ||
  hostname.endsWith(".lovable.dev") ||
  hostname.endsWith(".lovableproject.com");
const isVirtualEstimateRoute =
  /^\/virtual-estimate(?:\/|$)/i.test(pathname) ||
  /^\/crm\/virtual-estimate(?:s)?(?:\/|$)/i.test(pathname);

if (isLovablePreview && isVirtualEstimateRoute) {
  window.location.replace(
    `${VIRTUAL_ESTIMATE_ORIGIN}${window.location.pathname}${window.location.search}${window.location.hash}`,
  );
} else {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TranslationProvider>
            <App />
          </TranslationProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>,
  );
}
