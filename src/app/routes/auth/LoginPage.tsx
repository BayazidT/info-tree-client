import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Loader2 } from 'lucide-react';
import { login } from '@/api/authApi';
import { useAuthStore } from '@/store/authStore';
import InfoTreeLogo from '@/assets/logo.png';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login: storeLogin } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tokens = await login({ username, password });
      await storeLogin(tokens);
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Invalid username or password';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
      
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-20">
            <div className="flex justify-center -mt-20 mb-6">
              <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
                <img
                  src={InfoTreeLogo}
                  alt="Info Tree BD Logo"
                  className="w-full h-full object-contain p-3"
                />
              </div>
            </div>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Sign in to the admin portal
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition outline-none"
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition outline-none"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 text-white font-semibold py-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Demo credentials:</p>
            <p className="font-medium">
              Username: <span className="text-sky-700">admin</span> | Password:{' '}
              <span className="text-sky-700">123</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-8">
          © 2026 trbtree.com. All rights reserved.
        </p>
      </div>
    </div>
  );
}