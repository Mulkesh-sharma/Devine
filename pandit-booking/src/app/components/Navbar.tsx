'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { services } from '../../lib/dummyServices';
import { useAuth } from '../context/AuthContext';
import type { Service } from '../../lib/types';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'All Pujas', href: '/services' },
    { name: 'Articles', href: '/articles' },
    { name: 'Privacy Policy', href: '/privacyPolicy' },
    ...(user ? [{ name: 'Profile', href: '/profile' }] : []),
  ];

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = services.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices([]);
    }
  }, [searchTerm]);

  return (
    <nav className={`bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 fixed w-full z-50 shadow-lg transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white hover:text-amber-200 transition-colors">
          Devine Rituals
        </Link>

        {/* Search */}
        <div className="relative hidden md:block flex-1 mx-8 max-w-md">
          <input
            type="text"
            placeholder="Search Pujas..."
            className="w-full border-0 rounded-full px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70">
            🔍
          </div>
          {filteredServices.length > 0 && (
            <ul className="absolute z-50 bg-white border border-gray-200 w-full mt-2 max-h-60 overflow-auto rounded-xl shadow-xl">
              {filteredServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="block px-4 py-3 hover:bg-orange-50 text-gray-800 border-b border-gray-100 last:border-b-0"
                    onClick={() => setSearchTerm('')}
                  >
                    <div className="font-medium">{service.title}</div>
                    <div className="text-sm text-gray-500">₹{service.priceINR}</div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link
                href="/profile"
                className="text-white font-semibold hover:text-amber-200 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                  {user.firstName.charAt(0).toUpperCase()}
                </div>
                Hi, {user.firstName}
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all duration-200 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-4 px-6 py-2.5 rounded-lg bg-white text-orange-600 hover:bg-amber-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all" onClick={() => setOpen(!open)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gradient-to-r from-orange-600 to-amber-700 border-t border-white/20">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white font-medium hover:text-amber-200 hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-white font-semibold hover:text-amber-200 hover:bg-white/10 px-3 py-2 rounded-lg transition-all flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                    {user.firstName.charAt(0).toUpperCase()}
                  </div>
                  Hi, {user.firstName}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-white/20 text-white text-center hover:bg-white/30 transition-all font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 rounded-lg bg-white text-orange-600 text-center hover:bg-amber-50 transition-all font-semibold"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
