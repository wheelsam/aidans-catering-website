'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fade out after 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-cream flex items-center justify-center transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-64 h-64 md:w-80 md:h-80 relative animate-pulse">
        <Image
          src="/images/logo.jpeg"
          alt="Collins Charcuterie"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
