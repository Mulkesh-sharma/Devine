'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import ThreeBackground from '../components/ThreeBackground';
import { apiRequest, API_ENDPOINTS } from '../../lib/config';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  // Steps: 'signup' | 'otp'
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // Timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle signup form submission (Step 1)
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await apiRequest(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify(form),
      });

      setStep('otp');
      setMessage(`Verification code sent to ${form.email}`);
      setTimer(60); // 60 seconds cooldown
    } catch (err: any) {
      console.error('Signup Error:', err);
      if (err.errors && Array.isArray(err.errors)) {
        // Construct a detailed error message from the validation array
        const validationMessages = err.errors.map((e: any) => e.message).join(', ');
        setError(`Validation failed: ${validationMessages}`);
      } else {
        setError(err.message || 'Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification (Step 2)
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await apiRequest<{ token: string; user: any }>(API_ENDPOINTS.AUTH.VERIFY, {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          otp,
        }),
      });

      // Do NOT auto-login. Just redirect to login page.
      setMessage('OTP verified, your account has been created please login');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResend = async () => {
    if (timer > 0) return;
    
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await apiRequest(API_ENDPOINTS.AUTH.RESEND, {
        method: 'POST',
        body: JSON.stringify({ email: form.email }),
      });

      setMessage(`New verification code sent to ${form.email}`);
      setTimer(60);
    } catch (err: any) {
      setError(err.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[70px] ">
      <ThreeBackground />
      
      <div className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/50">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600 drop-shadow-sm">
          {step === 'signup' ? 'Create Your Account' : 'Verify Email'}
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium bg-red-50 p-2 rounded">{error}</p>
        )}
        {message && (
          <p className="text-green-600 mb-4 text-center font-medium bg-green-50 p-2 rounded">{message}</p>
        )}

        {step === 'signup' ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white/50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending Code...' : 'Sign Up'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                We sent a 6-digit code to <strong>{form.email}</strong>
              </p>
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="w-full text-center text-2xl tracking-widest border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all bg-white/50"
                placeholder="123456"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>

            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={() => setStep('signup')}
                className="text-sm text-gray-600 hover:text-orange-600"
              >
                Change Email
              </button>
              
              <button
                type="button"
                onClick={handleResend}
                disabled={timer > 0 || loading}
                className={`text-sm font-medium ${
                  timer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-orange-600 hover:text-orange-700'
                }`}
              >
                {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
              </button>
            </div>
          </form>
        )}

        {step === 'signup' && (
          <p className="text-sm mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-orange-600 font-bold hover:text-orange-700 hover:underline transition-colors"
            >
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
