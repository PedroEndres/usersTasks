import { AuthProvider } from "@/context/auth";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Router } from "@/Router";
import { NavBar } from "@/components/nav-bar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <NavBar />
        {/* Agregar el Todo Wrapper más adelante, una vez el usuario haya iniciado sesión */}
        {/*  */}
        <Router />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
