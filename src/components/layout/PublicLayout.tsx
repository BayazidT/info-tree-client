// src/layouts/PublicLayout.tsx
import { Outlet } from 'react-router-dom';
import PublicNavbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}