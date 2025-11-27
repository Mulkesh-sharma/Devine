'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>;
}

export default function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const THRESHOLD = 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.scrollY === 0 && startY > 0) {
      const touchY = e.touches[0].clientY;
      const diff = touchY - startY;
      
      if (diff > 0) {
        // Add resistance
        const pullDistance = Math.min(diff * 0.5, THRESHOLD * 1.5);
        setCurrentY(pullDistance);
      }
    }
  };

  const handleTouchEnd = async () => {
    if (currentY >= THRESHOLD) {
      setRefreshing(true);
      setCurrentY(THRESHOLD);
      
      // Trigger refresh
      if (onRefresh) {
        await onRefresh();
      } else {
        window.location.reload();
      }
      
      setRefreshing(false);
    }
    
    setStartY(0);
    setCurrentY(0);
  };

  useEffect(() => {
    controls.start({ y: currentY });
  }, [currentY, controls]);

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="min-h-screen relative"
    >
      {/* Loading Indicator */}
      <motion.div 
        className="absolute top-0 left-0 right-0 flex justify-center items-center h-16 pointer-events-none z-50"
        style={{ y: currentY - 60, opacity: Math.min(currentY / THRESHOLD, 1) }}
      >
        <div className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 ${refreshing ? 'animate-spin' : ''}`}>
          <FiRefreshCw className="text-orange-500 w-6 h-6" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div animate={controls} className="min-h-screen">
        {children}
      </motion.div>
    </div>
  );
}
