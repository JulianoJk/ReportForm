import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./components/IndexPage.jsx";
import { NotFound } from "./components/NotFound/NotFound.jsx";
import AuthenticationPage from "./components/Authentication/AuthenticationPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<AuthenticationPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </QueryClientProvider>
  );
}