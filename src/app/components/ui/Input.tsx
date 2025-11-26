'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn as themeClasses } from './theme';
import { cn } from '../../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className = '',
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative group">
      <div className="relative">
        {/* Ethereal Glow Background */}
        <motion.div
          className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 opacity-0 blur transition duration-500"
          animate={{ opacity: focused ? 0.5 : 0 }}
        />
        
        <div className="relative flex items-center">
          {icon && (
            <div className={cn("absolute left-3 transition-colors duration-300", focused ? "text-orange-400" : "text-gray-500")}>
              {icon}
            </div>
          )}
          
          <input
            className={cn(
              "w-full bg-gray-900/90 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-transparent transition-all duration-300",
              icon ? "pl-10" : "",
              error ? "border-red-500" : "",
              className
            )}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false);
              setHasValue(!!e.target.value);
            }}
            onChange={(e) => setHasValue(!!e.target.value)}
            {...props}
          />

          {/* Floating Label */}
          {label && (
            <label
              className={cn(
                "absolute left-4 transition-all duration-300 pointer-events-none",
                icon ? "left-10" : "",
                (focused || hasValue || props.value) 
                  ? "-top-2.5 text-xs text-orange-400 bg-gray-900 px-1" 
                  : "top-3 text-gray-500"
              )}
            >
              {label}
            </label>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 text-xs text-red-500 pl-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className = '',
  ...props
}: TextareaProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative group">
      <div className="relative">
        <motion.div
          className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 opacity-0 blur transition duration-500"
          animate={{ opacity: focused ? 0.5 : 0 }}
        />
        
        <textarea
          className={cn(
            "w-full bg-gray-900/90 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-transparent transition-all duration-300",
            error ? "border-red-500" : "",
            className
          )}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(!!e.target.value);
          }}
          onChange={(e) => setHasValue(!!e.target.value)}
          {...props}
        />

        {label && (
          <label
            className={cn(
              "absolute left-4 transition-all duration-300 pointer-events-none",
              (focused || hasValue || props.value)
                ? "-top-2.5 text-xs text-orange-400 bg-gray-900 px-1"
                : "top-3 text-gray-500"
            )}
          >
            {label}
          </label>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 text-xs text-red-500 pl-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
