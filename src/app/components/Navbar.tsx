'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { services } from '../../lib/dummyServices';
import { useAuth } from '../context/AuthContext';
import type { Service } from '../../lib/types';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '../../lib/utils';
import Button from './ui/Button';

// Magnetic Nav Link Component
const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: xSpring, y: ySpring }}>
      <Link
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative px-4 py-2 text-sm font-medium text-amber-100/80 hover:text-amber-50 transition-colors group"
      >
        <span className="relative z-10">{children}</span>
        <motion.span
          className="absolute inset-0 rounded-lg bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity -z-0"
          layoutId="navbar-hover"
        />
      </Link>
    </motion.div>
  );
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const { user, logout } = useAuth();
  
  const homeLink = user?.role === 'admin' ? '/admin' : '/';

  const navLinks = [
    { name: 'Home', href: homeLink },
    { name: 'About', href: '/about' },
    { name: 'All Pujas', href: '/services' },
    ...(user?.role === 'admin' ? [{ name: 'Bookings', href: '/admin/bookings' }] : []),
    ...(user ? [{ name: 'My Bookings', href: '/bookings' }] : []),
    { name: 'Articles', href: '/articles' },
    { name: 'Privacy Policy', href: '/privacyPolicy' },
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
    <motion.nav
      style={{
        backgroundColor: `rgba(17, 24, 39, 0.95)`, // Fixed Dark Greyish
        backdropFilter: `blur(16px)`, // Fixed Blur
        borderColor: `rgba(249, 115, 22, 0.2)`, // Fixed Orange border
      }}
      className={cn(
        "fixed w-full z-50 transition-all duration-300 border-b",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent opacity-50" />

      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">

        {/* MIST LOGO */}
        <Link
          href={homeLink}
          className="relative group"
        >
          <motion.span 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-400 to-amber-200 bg-[length:200%_auto] animate-gradient"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            Devine Rituals
          </motion.span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
        </Link>

        {/* SEARCH BAR (Obsidian) */}
        <div className="relative hidden lg:block flex-1 mx-8 max-w-md group">
          <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <input
            type="text"
            placeholder="Search Pujas..."
            className="relative w-full border border-orange-500/20 rounded-full px-5 py-2.5 bg-black/40 text-amber-50 placeholder-amber-500/30 focus:outline-none focus:bg-black/60 focus:border-orange-500/50 transition-all shadow-inner shadow-black/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500/40">🔍</div>

          {filteredServices.length > 0 && (
            <motion.ul 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-50 bg-[#0a0a0a] border border-orange-500/20 w-full mt-4 max-h-60 overflow-auto rounded-xl shadow-2xl shadow-black/80"
            >
              {filteredServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="block px-4 py-3 hover:bg-orange-500/10 text-amber-100/80 border-b border-orange-500/10 last:border-b-0 transition-colors"
                    onClick={() => setSearchTerm('')}
                  >
                    <div className="font-medium text-orange-400">{service.title}</div>
                    <div className="text-sm text-amber-500/60">₹{service.priceINR}</div>
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink key={link.name} href={link.href}>
              {link.name}
            </NavLink>
          ))}

          {/* PROFILE + LOGOUT */}
          {user ? (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-orange-500/20">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium text-amber-100 hover:text-orange-400 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-700 rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-orange-900/50 border border-orange-500/30">
                  {user.firstName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:inline">Hi, {user.firstName}</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="!px-3 !py-1 text-xs text-amber-500/60 hover:text-amber-500 hover:bg-orange-500/10"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="ml-4">
              <Link href="/login">
                <Button variant="primary" size="sm" className="!rounded-full shadow-orange-500/20">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden p-2 text-amber-100 hover:text-orange-400 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* MOBILE MENU (Deep Dark) */}
      <motion.div 
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className="lg:hidden overflow-hidden bg-gray-900/95 backdrop-blur-xl border-t border-orange-500/20"
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-amber-100/80 font-medium hover:text-orange-400 px-3 py-2 rounded-lg hover:bg-orange-500/10 transition-all"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <div className="h-px bg-orange-500/20 my-2" />
              <Link
                href="/profile"
                className="flex items-center gap-3 text-amber-100 font-medium px-3 py-2"
                onClick={() => setOpen(false)}
              >
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-sm font-bold border border-orange-500/30">
                  {user.firstName.charAt(0).toUpperCase()}
                </div>
                Hi, {user.firstName}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-left text-red-400 hover:text-red-300 px-3 py-2 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="mt-4"
              onClick={() => setOpen(false)}
            >
              <Button variant="primary" className="w-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}
