'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import ThreeBackground from '../components/ThreeBackground';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setMessage('');
        return;
      }

      const userData = data.data.user;

      // Split full name into first/last
      const [firstName, ...lastNameParts] = userData.name
        ? userData.name.split(' ')
        : ['', ''];

      const transformedUser = {
        ...userData,
        firstName: firstName || '',
        lastName: lastNameParts.join(' ') || '',
        role: userData.role,
      };

      // 🔥 Save to React Context
      login(transformedUser, data.data.token);

      // 🔥 Save token cookie (needed for middleware)
      document.cookie = `token=${data.data.token}; path=/; max-age=604800`;

      // 🔥 Save user cookie (middleware needs it)
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify(transformedUser)
      )}; path=/; max-age=604800`;

      setMessage('Login successful!');
      setError('');

      const redirectPath =
        transformedUser.role === 'admin' ? '/admin' : '/';

      router.push(redirectPath);
    } catch (err) {
      setError('Server error. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground />
      
      <form onSubmit={handleLogin} className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/50">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600 drop-shadow-sm">Welcome Back</h1>

        {error && <p className="text-red-500 mb-4 text-center font-medium bg-red-50 p-2 rounded">{error}</p>}
        {message && <p className="text-green-500 mb-4 text-center font-medium bg-green-50 p-2 rounded">{message}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email or Phone</label>
            <input
              placeholder="Enter your email or phone"
              autoComplete="username"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              required
              readOnly
              onFocus={(e) => e.target.removeAttribute('readonly')}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              readOnly
              onFocus={(e) => e.target.removeAttribute('readonly')}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white/50"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
        >
          Login
        </button>

        <p className="text-sm mt-6 text-center text-gray-600">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-orange-600 font-bold hover:text-orange-700 hover:underline transition-colors">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
