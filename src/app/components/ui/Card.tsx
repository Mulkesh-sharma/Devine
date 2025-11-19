'use client';

import React, { JSX } from 'react';
import { cn } from './theme';

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
}: CardProps): JSX.Element {
  const baseClasses = 'rounded-lg transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-gray-800 border border-gray-700 shadow-lg',
    hover: 'bg-gray-800 border border-gray-700 shadow-lg hover:bg-gray-750 hover:shadow-xl hover:border-orange-500/50',
    interactive: 'bg-gray-800 border border-gray-700 shadow-lg cursor-pointer hover:border-orange-500 hover:shadow-orange-500/20',
    glass: 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

// Card subcomponents
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export function CardHeader({ title, subtitle, className = '', children, ...props }: CardHeaderProps): JSX.Element {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {title && <h3 className={cn.text.heading}>{title}</h3>}
      {subtitle && <p className={`mt-1 ${cn.text.muted}`}>{subtitle}</p>}
      {children}
    </div>
  );
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardBody({ className = '', children, ...props }: CardBodyProps): JSX.Element {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className = '', children, ...props }: CardFooterProps): JSX.Element {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
}
