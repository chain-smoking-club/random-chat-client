import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
