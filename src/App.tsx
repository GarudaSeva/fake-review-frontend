import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { ReviewProvider } from "@/context/ReviewContext";
import { AuthProvider } from "@/context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import MyReviews from "./pages/MyReviews";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminReviewReport from "./pages/admin/AdminReviewReport";
import AdminSuspiciousUsers from "./pages/admin/AdminSuspiciousUsers";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <ReviewProvider>
          <TooltipProvider>
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/products" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/my-reviews" element={<MyReviews />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/add-product" element={<AdminAddProduct />} />
                <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
                <Route path="/admin/product-report/:id" element={<AdminReviewReport />} />
                <Route path="/admin/suspicious-users" element={<AdminSuspiciousUsers />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ReviewProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
