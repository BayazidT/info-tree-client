import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@/components/ui/Card';
import { User } from '@/types/user.types';
import { getUserById } from '@/api/userApi';

export default function EmployeeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);  
  const [loading, setLoading] = useState(true);  
  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
       const userRes = await getUserById(id);
        setUser(userRes as User);
    
      } catch (error) {
        console.error('Failed to load user details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]); 

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <div className="p-8 text-center text-gray-600">User not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Header */}
      <header>
        <div className='px-4'>
          <h1 className="text-3xl font-bold text-gray-900">
            {user.name || 'User Details'}
          </h1>
          <p className="mt-2 text-lg text-gray-600">User Information</p>
        </div>
      </header>

      {/* Employee Info */}
      <div className="flex justify-center">
        <Card className="w-full max-w-4xl shadow-sm p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Personal Information</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-base text-gray-900">{user.username}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-base text-gray-900">{user.email || '–'}</dd>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}