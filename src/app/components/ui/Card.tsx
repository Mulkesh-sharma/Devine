'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { cn as themeClasses } from './theme';
import { cn } from '../../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'interactive' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spotlight values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics for tilt
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate rotation based on mouse position relative to center
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -5; // Max -5deg tilt
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 5;   // Max 5deg tilt

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);

    // Update spotlight position
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const baseClasses = 'relative rounded-2xl overflow-hidden transition-all duration-300 group';
  
  const variantClasses = {
    default: 'bg-gray-900/80 border border-gray-800',
    hover: 'bg-gray-900/80 border border-gray-800',
    interactive: 'bg-gray-900/80 border border-gray-800 cursor-pointer',
    glass: 'bg-gray-900/40 backdrop-blur-xl border border-white/10',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      ref={ref}
      className={cn(baseClasses, variantClasses[variant], paddingClasses[padding], className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props as any}
    >
      {/* Spotlight Border Effect */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 40%
            )
          `,
        }}
      />

      {/* Iridescent Border Glow */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-orange-500/30 transition-all duration-500" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Card subcomponents
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export function CardHeader({ title, subtitle, className = '', children, ...props }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {title && <h3 className={themeClasses.text.heading}>{title}</h3>}
      {subtitle && <p className={`mt-1 ${themeClasses.text.muted}`}>{subtitle}</p>}
      {children}
    </div>
  );
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardBody({ className = '', children, ...props }: CardBodyProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className = '', children, ...props }: CardFooterProps) {
  return (
    <div className={`mt-6 pt-6 border-t border-white/5 ${className}`} {...props}>
      {children}
    </div>
  );
}
