import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { useAuthStore } from "@/store/auth";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import PortfolioPage from "@/pages/PortfolioPage";
import PortfolioDetailPage from "@/pages/PortfolioDetailPage";
import PriceWizardPage from "@/pages/PriceWizardPage";
import BlogPage from "@/pages/BlogPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import AdminLoginPage from "@/admin/AdminLoginPage";
import AdminDashboardPage from "@/admin/AdminDashboardPage";
import AdminServicesPage from "@/admin/AdminServicesPage";
import AdminLogosPage from "@/admin/AdminLogosPage";
import AdminPortfolioPage from "@/admin/AdminPortfolioPage";
import AdminBlogPage from "@/admin/AdminBlogPage";
import AdminLeadsPage from "@/admin/AdminLeadsPage";
import AdminSettingsPage from "@/admin/AdminSettingsPage";

const AdminGuard = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PublicLayout>
              <PageTransition>
                <HomePage />
              </PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="/hizmetler"
          element={
            <PublicLayout>
              <PageTransition>
                <ServicesPage />
              </PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="/hizmetler/:slug"
          element={
            <PublicLayout>
              <PageTransition>
                <ServiceDetailPage />
              </PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="/portfolyo"
          element={
            <PublicLayout>
              <PageTransition>
                <PortfolioPage />
              </PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="/portfolyo/:slug"
          element={
            <PublicLayout>
              <PageTransition>
                <PortfolioDetailPage />
              </PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="/fiyat-hesapla"
          element={
            <PublicLayout>
              <PageTransition>
                <PriceWizardPage />
              </PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <PublicLayout>
              <PageTransition>
                <BlogPage />
              </PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PublicLayout>
              <PageTransition>
                <BlogDetailPage />
              </PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="/hakkimizda"
          element={
            <PublicLayout>
              <PageTransition>
                <AboutPage />
              </PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="/iletisim"
          element={
            <PublicLayout>
              <PageTransition>
                <ContactPage />
              </PageTransition>
            </PublicLayout>
          }
        />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout>
                <AdminDashboardPage />
              </AdminLayout>
            </AdminGuard>
          }
        />
        <Route
          path="/admin/hizmetler"
          element={
            <AdminGuard>
              <AdminLayout>
                <AdminServicesPage />
              </AdminLayout>
            </AdminGuard>
          }
        />
        <Route
          path="/admin/logolar"
          element={
            <AdminGuard>
              <AdminLayout>
                <AdminLogosPage />
              </AdminLayout>
            </AdminGuard>
          }
        />
        <Route
          path="/admin/portfolyo"
          element={
            <AdminGuard>
              <AdminLayout>
                <AdminPortfolioPage />
              </AdminLayout>
            </AdminGuard>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <AdminGuard>
              <AdminLayout>
                <AdminBlogPage />
              </AdminLayout>
            </AdminGuard>
          }
        />
        <Route
          path="/admin/leads"
          element={
            <AdminGuard>
              <AdminLayout>
                <AdminLeadsPage />
              </AdminLayout>
            </AdminGuard>
          }
        />
        <Route
          path="/admin/ayarlar"
          element={
            <AdminGuard>
              <AdminLayout>
                <AdminSettingsPage />
              </AdminLayout>
            </AdminGuard>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
