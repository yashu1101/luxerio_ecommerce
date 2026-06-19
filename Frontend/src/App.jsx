import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { RouteManager } from "./routes/RouteManager";
import { ContextProviders } from "./Context/ContextProviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ContextProviders>
            <RouteManager></RouteManager>
          </ContextProviders>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
