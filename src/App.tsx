// src/app/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';
import { getProfile } from '@/api/authApi';

import ProtectedRoute from '@/components/common/protectedRoute';
import PublicLayout from '@/components/layout/PublicLayout';     // ← new
import DashboardLayout from '@/app/routes/dashboard.layout';
import { LanguageProvider } from '@/context/LanguageContext';
import LandingPage from '@/app/pages/public/LandingPage';   // ← your new public home
// other public pages
// import EmergencyPublicPage from '@/pages/public/EmergencyPage';
import DoctorsPage from '@/app/pages/public/DoctorsPage';
// import ContactPage from '@/pages/public/ContactPage';

// admin pages (keep as-is)
import Dashboard from './app/routes/DashboardPage';
import CivicPage from './app/routes/civic/CivicPage';
import DoctorPage from './app/routes/doctors/DoctorsPage';
import UsersPage from './app/routes/users/UsersPage';
import UserDetailsPage from './app/routes/users/UserDetailsPage';
import DoctorDetailsPage from './app/routes/doctors/DoctorDetailsPage';
import CreatePage from './app/routes/create/CreatePage';

import LoginPage from '@/app/routes/auth/LoginPage';
import DoctorDetailsPublicPage from './app/pages/public/DoctorDetailsPublicPage';
import EmergencyPublicPage from './app/pages/public/EmergencyPublicPage';
import NotFoundPage from './app/pages/public/NotFoundPage';
// import NotFound from '@/pages/NotFound';
// ────────────────────────────────────────────────
//  Auth loader (unchanged)
function AuthLoader() {
  const { tokens, user, login } = useAuthStore();

  useEffect(() => {
    if (tokens?.accessToken && !user) {
      getProfile(tokens.accessToken)
        .then(() => login(tokens))
        .catch(() => useAuthStore.getState().logout());
    }
  }, [tokens, user, login]);

  return null;
}

// ────────────────────────────────────────────────
//  Redirect root "/" intelligently
function RootRedirect() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/admin/login" replace />
  );
}

// ────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AuthLoader />

      <Routes>

        {/* ─── Public section ──────────────────────────────────────── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/emergency" element={<EmergencyPublicPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}

          {/* Login is usually separate or in public layout */}
          {/* <Route path="/login" element={<LoginPage />} /> */}

          {/* Optional: public doctor detail, emergency detail, etc. */}
          <Route path="/doctors/:id" element={<DoctorDetailsPublicPage />} />

          
        </Route>
        {/* ─── Root redirect ──────────────────────────────────────── */}
        <Route path="admin/login" element={<LoginPage />} />

        {/* ─── Admin / Protected section ───────────────────────────── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route index element={<Navigate to="dashboard" replace />} />

          <Route
            path="dashboard"
            element={
              <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="doctors"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <DoctorPage />
              </Suspense>
            }
          />
          <Route
            path="doctors/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <DoctorDetailsPage />
              </Suspense>
            }
          />
          <Route
            path="emergency"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CivicPage />
              </Suspense>
            }
          />
          <Route
            path="create"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CreatePage />
              </Suspense>
            }
          />
          <Route
            path="users"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UsersPage />
              </Suspense>
            }
          />
          <Route
            path="users/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UserDetailsPage />
              </Suspense>
            }
          />
           
        </Route>

        {/* ─── Fallbacks ───────────────────────────────────────────── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}