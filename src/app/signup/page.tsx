'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import ThreeBackground from '../components/ThreeBackground';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    age: 0,
    address: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'age' ? Number(value) : value }));
  };

  // Handle signup form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // API request to save user to users.json
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Save user and token locally and update context
      const token = data.token || ''; // Assuming the token is returned in data.token
      login(data.user, token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', token);

      setError('');
      setMessage('Signup successful! Redirecting...');
      setTimeout(() => router.push('/'), 1500);
    } catch (err: any) {
      const errorMessage = err.message || 'Signup failed. Please try again.';
      if (errorMessage.includes('User already exists')) {
        setError('User already exists. Please login instead.');
      } else {
        setError(errorMessage);
      }
      setMessage('');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground />
      
      <form
        onSubmit={handleSignup}
        className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-2xl border border-white/50"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600 drop-shadow-sm">
          Create Your Account
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium bg-red-50 p-2 rounded">{error}</p>
        )}
        {message && (
          <p className="text-green-600 mb-4 text-center font-medium bg-green-50 p-2 rounded">{message}</p>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white/50"
              placeholder="John"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white/50"
              placeholder="Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white/50"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mobile Number
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white/50"
              placeholder="+1 234 567 890"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white/50"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white/50"
              placeholder="25"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white/50"
              placeholder="123 Main Street, City"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
        >
          Sign Up
        </button>

        <p className="text-sm mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-orange-600 font-bold hover:text-orange-700 hover:underline transition-colors"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
