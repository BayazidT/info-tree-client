// src/app/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore'
import { getProfile } from '@/api/authApi';
import ProtectedRoute from '@/components/common/protectedRoute';
import DashboardLayout from '@/app/routes/dashboard.layout';
import Dashboard from './app/routes/DashboardPage';
import LoginPage from '@/app/routes/auth/LoginPage';
import DoctorPage from './app/routes/doctors/DoctorsPage';
import CivicPage from './app/routes/civic/CivicPage';
import UsersPage from './app/routes/users/UsersPage';
import UserDetailsPage from './app/routes/users/UserDetailsPage';
import DoctorDetailsPage from './app/routes/doctors/DoctorDetailsPage';
import CreatePage from './app/routes/create/CreatePage';

function AuthLoader() {
  const { tokens, user, login } = useAuthStore();

  useEffect(() => {
    if (tokens && !user) {
      getProfile(tokens.accessToken)
        .then(() => {
          // Re-use login action to set user (tokens already stored)
          login(tokens);
        })
        .catch(() => {
          useAuthStore.getState().logout();
        });
    }
  }, [tokens, user, login]);

  return null;
}

// Redirect logic for root path
function RootRedirect() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}

// Loading fallback component
function PageLoading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-lg text-gray-600 animate-pulse">Loading page...</div>
    </div>
  );
}

// 404 page
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600">Page not found</p>
      <button
        onClick={() => window.history.back()}
        className="mt-6 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
      >
        Go Back
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthLoader /> {/* Loads profile if tokens exist but user missing */}

      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Default redirect based on auth state */}
          <Route index element={<RootRedirect />} />

          {/* Dashboard Pages */}
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<PageLoading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="doctors"
            element={
              <Suspense fallback={<PageLoading />}>
                <DoctorPage />
              </Suspense>
            }
          />
          <Route
            path="doctor/:id"
            element={
              <Suspense fallback={<PageLoading />}>
                <DoctorDetailsPage />
              </Suspense>
            }
          />
          <Route
            path="emergency"
            element={
              <Suspense fallback={<PageLoading />}>
                <CivicPage />
              </Suspense>
            }
          />
          <Route
            path="create"
            element={
              <Suspense fallback={<PageLoading />}>
                <CreatePage />
              </Suspense>
            }
          />
          <Route
            path="users"
            element={
              <Suspense fallback={<PageLoading />}>
                <UsersPage />
              </Suspense>
            }
          />
          <Route
            path="users/:id"
            element={
              <Suspense fallback={<PageLoading />}>
                <UserDetailsPage />
              </Suspense>
            }
          />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}