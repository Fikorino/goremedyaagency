import { Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Analytics from "@/components/Analytics";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import PortfolioPage from "@/pages/PortfolioPage";
import PortfolioDetailPage from "@/pages/PortfolioDetailPage";
import PriceEstimatorPage from "@/pages/PriceEstimatorPage";
import BlogPage from "@/pages/BlogPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/admin/LoginPage";
import AdminDashboard from "@/admin/AdminDashboard";
import AdminServices from "@/admin/AdminServices";
import AdminBlog from "@/admin/AdminBlog";
import AdminPortfolio from "@/admin/AdminPortfolio";
import AdminLeads from "@/admin/AdminLeads";
import AdminSettings from "@/admin/AdminSettings";
import AdminLogos from "@/admin/AdminLogos";
import { useAuthStore } from "@/lib/auth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Helmet>
        <meta
          name="description"
          content="Göre Medya Ajans - Antalya medya ve reklam ajansı. Strateji, içerik ve performans pazarlaması."
        />
      </Helmet>
      <Analytics />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/hizmetler" element={<ServicesPage />} />
          <Route path="/hizmetler/:slug" element={<ServiceDetailPage />} />
          <Route path="/portfolyo" element={<PortfolioPage />} />
          <Route path="/portfolyo/:slug" element={<PortfolioDetailPage />} />
          <Route path="/fiyat-hesapla" element={<PriceEstimatorPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
        </Route>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="hizmetler" element={<AdminServices />} />
          <Route path="portfolyo" element={<AdminPortfolio />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="logolar" element={<AdminLogos />} />
          <Route path="leadler" element={<AdminLeads />} />
          <Route path="ayarlar" element={<AdminSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
