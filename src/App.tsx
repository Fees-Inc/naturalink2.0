import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import RoleSelection from "./pages/RoleSelection";
import Consumer from "./pages/Consumer";
import Producer from "./pages/Producer";
import Distributor from "./pages/Distributor";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import BlogCreate from "./pages/BlogCreate";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/consumer" element={<Consumer />} />
            <Route path="/producer" element={<Producer />} />
            <Route path="/distributor" element={<Distributor />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/create" element={<BlogCreate />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
