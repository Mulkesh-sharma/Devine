'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <div className="flex gap-4">
              <Link
                href="/"
                className="px-4 py-2 text-orange-600 border border-orange-600 rounded hover:bg-orange-50 transition"
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Profile Avatar */}
          <div className="flex items-center mb-8">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-3xl font-bold text-orange-600 mr-6">
              {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">Member since {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">{user.firstName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">{user.lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">{user.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">{user.age} years old</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border min-h-[80px]">{user.address}</p>
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Account Status</h4>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-600 font-medium">Active Account</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Your account is in good standing. You can book pandits and access all services.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity or Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/services"
              className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition text-center"
            >
              <div className="text-2xl mb-2">🙏</div>
              <h4 className="font-semibold text-gray-800">Book a Puja</h4>
              <p className="text-sm text-gray-600">Schedule a new ritual</p>
            </Link>
            <Link
              href="/articles"
              className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition text-center"
            >
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-semibold text-gray-800">Read Articles</h4>
              <p className="text-sm text-gray-600">Learn about rituals</p>
            </Link>
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-2xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-800">Contact Support</h4>
              <p className="text-sm text-gray-600">Get help when needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
