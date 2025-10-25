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

      if (res.ok) {
        login(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage('Login successful!');
        setError('');
        setTimeout(() => router.push('/'), 1200);
      } else {
        setError(data.message || 'Login failed');
        setMessage('');
      }
    } catch (err: any) {
      setError('Server error. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-600">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-center font-medium">{message}</p>}

        <input
          placeholder="Email or Phone"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
        />
        <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2.5 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all font-medium shadow-lg hover:shadow-xl">
          Login
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Don’t have an account? <Link href="/signup" className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-colors">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
