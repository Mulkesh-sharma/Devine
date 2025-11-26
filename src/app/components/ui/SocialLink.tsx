import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface SocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactNode;
  label: string;
}

export default function SocialLink({
  icon,
  label,
  className = '',
  ...props
}: SocialLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  
  // Magnetic effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      className={cn(
        "relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 border border-gray-700 transition-colors hover:bg-orange-500 hover:text-white hover:border-orange-400",
        className
      )}
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props as any}
    >
      {icon}
    </motion.a>
  );
}
