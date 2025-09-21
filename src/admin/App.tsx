import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";



import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Producers from "./pages/Producers";
import Distributors from "./pages/Distributors";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Blockchain from "./pages/Blockchain";
import Analytics from "./pages/Analytics";
import Marketing from "./pages/Marketing";
import Billing from "./pages/Billing";
import "./index.css";
const queryClient = new QueryClient();

const AdminApp = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <Routes>
          <Route index element={<Login />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <AppLayout><Dashboard /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="users" element={
              <ProtectedRoute>
                <AppLayout><Users /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="products" element={
              <ProtectedRoute>
                <AppLayout><Products /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="producers" element={
              <ProtectedRoute>
                <AppLayout><Producers /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="distributors" element={
              <ProtectedRoute>
                <AppLayout><Distributors /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="blockchain" element={
              <ProtectedRoute>
                <AppLayout><Blockchain /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="analytics" element={
              <ProtectedRoute>
                <AppLayout><Analytics /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="marketing" element={
              <ProtectedRoute>
                <AppLayout><Marketing /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="billing" element={
              <ProtectedRoute>
                <AppLayout><Billing /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute>
                <AppLayout><Settings /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="help" element={
              <ProtectedRoute>
                <AppLayout><Help /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default AdminApp;