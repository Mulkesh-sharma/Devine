'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-6">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl border border-gray-200"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Create Your Account
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}
        {message && (
          <p className="text-green-600 mb-4 text-center font-medium">{message}</p>
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
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
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
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
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
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
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
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
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
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
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
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
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
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="123 Main Street, City"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-orange-500 text-white py-2.5 rounded font-medium hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
        >
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
