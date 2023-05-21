import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./components/IndexPage.jsx";
import { NotFound } from "./components/NotFound/NotFound.jsx";
import AuthenticationPage from "./components/Authentication/AuthenticationPage.jsx";
import HomePage from "./components/Pages/HomePage.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import ManagerPage from "./components/Pages/ManagerPage.jsx";
import AdminPage from "./components/Pages/AdminPage.jsx";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<AuthenticationPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </QueryClientProvider>
  );
}
