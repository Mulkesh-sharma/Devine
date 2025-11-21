'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-600">Login</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {message && <p className="text-green-500 mb-4 text-center">{message}</p>}

        <input
          placeholder="Email or Phone"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          required
          className="w-full border px-4 py-2.5 mb-4 rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border px-4 py-2.5 mb-6 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2.5 rounded-md"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account? <Link href="/signup" className="text-orange-600 font-bold">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
