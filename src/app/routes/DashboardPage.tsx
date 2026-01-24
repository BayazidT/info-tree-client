// src/app/routes/dashboard/Dashboard.tsx
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';  
import {
  Calendar, Clock, Users, UserCheck, AlertCircle, TrendingUp, Plus,
} from 'lucide-react';

import Card from '@/components/ui/Card';
import { useState, useEffect } from 'react';
import { UserPage } from '@/types/user.types';
import type { Doctor, PaginatedResponse } from "@/types/doctor.types";
import { getUsers } from '@/api/userApi';
import { getDoctors } from '@/api/doctorApi';
import { Civic } from '@/types/civic.types';
import { getCivics } from '@/api/civicApi';
export default function Dashboard() {
  const navigate = useNavigate();  
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<PaginatedResponse<Doctor> | null>(null);
  const [civic, setCivic] = useState<PaginatedResponse<Civic> | null>(null);
  const [user, setUser] = useState<UserPage>();

  
  useEffect(() => {
    fetchDoctors();
    fetchUsers();
    fetchEmergencyInfo();
  }, []);

  const fetchUsers = async () => {
      try {
        const response = await getUsers({
          page: 1,
          size: 1000,}
        );
        setUser(response || []);
      } catch (err) {
        alert('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

  const fetchDoctors = async () => {
          try {
            const today = format(new Date(), 'yyyy-MM-dd');
            const response = await getDoctors({
              page: 1,
              size: 100
            }
            );
            setDoctors(response || []);

          } catch (err) {
            alert('Failed to load doctors');
          } finally {
            setLoading(false);
          }
        };

       const fetchEmergencyInfo = async () => {
          try {
                setLoading(true);
                const res = await getCivics({
                  page: 0,
                  size: 1000
     });
                if (!res) throw new Error("Failed to fetch civic data");
                setCivic(res);
              } catch (err: any) {
                console.error(err);
                setCivic(null);
              } finally {
                setLoading(false);
              }
        }

  
  const quickLinks = [
    { title: 'Doctors', icon: Calendar, description: 'Manage all doctor lists', link: '/doctors', stats: `${doctors?.totalElements} total`, highlight: true },
    { title: 'Emergency', icon: Clock, description: 'Manage emergency information', link: '/emergency', stats: `${civic?.totalElements} today` },
    { title: 'Users', icon: Users, description: 'Users', link: '/users', stats: `Total users ${user?.totalElements}` },
  ];

  const todayHighlights = [
    { label: 'Doctor Entry', value: doctors?.totalElements, icon: AlertCircle, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Emergency Entry', value: civic?.totalElements, icon: UserCheck, color: 'text-green-600 bg-green-50' },
    { label: 'Hospital Entry', value: user?.totalElements, icon: TrendingUp, color: 'text-sky-600 bg-sky-50' },
  ];

  const handleNav = (path: string) => navigate(path);  // Reusable

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <button
          onClick={() => handleNav('/doctors')}
          className="flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition"
        >
          <Plus className="w-5 h-5" />
          New Doctor Entry
        </button>
      </div>

      {/* Today's Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {todayHighlights.map((item) => (
          <Card key={item.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '-' : item.value}</p>
              </div>
              <div className={`p-4 rounded-full ${item.color}`}>
                <item.icon className="w-8 h-8" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Links (Clickable Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <div
            key={link.title}
            onClick={() => handleNav(link.link)}
            className="block cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNav(link.link)}  
          >
            <Card className={`p-8 h-full ${link.highlight ? 'border-2 border-sky-200 ring-1 ring-sky-100' : ''}`}>
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{link.title}</h3>
                  <p className="text-gray-600 mt-2">{link.description}</p>
                  {link.stats && <p className="text-sm font-medium text-sky-600 mt-4">{link.stats}</p>}
                </div>
                <div className={`p-4 rounded-xl self-end mt-4 ${link.highlight ? 'bg-sky-100' : 'bg-gray-100'}`}>
                  <link.icon className={`w-8 h-8 ${link.highlight ? 'text-sky-600' : 'text-gray-600'}`} />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Quick Tip */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Tip</h2>
        <p className="text-gray-600">
          You have <span className="font-semibold text-yellow-600">{civic?.totalElements} pending information</span> for today.{' '}
          <button
            onClick={() => handleNav('/emergency')}
            className="text-sky-600 hover:underline font-medium"
          >
            Review now →
          </button>
        </p>
      </Card>
    </div>
  );
}