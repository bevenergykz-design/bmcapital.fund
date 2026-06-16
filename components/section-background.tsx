'use client';

import Image from 'next/image';
import { useTheme } from '@/lib/theme-context';

interface SectionBackgroundProps {
  imagePath: string;
  opacity?: number;
  position?: 'left' | 'right' | 'center';
  svgFallback?: React.ReactNode;
}

export default function SectionBackground({
  imagePath,
  opacity = 0.06,
  position = 'center',
  svgFallback
}: SectionBackgroundProps) {
  const { theme } = useTheme();

  const objectPosition = {
    left: 'left center',
    right: 'right center',
    center: 'center',
  }[position];

  const blendMode = theme === 'dark' ? 'soft-light' : 'multiply';
  const adjustedOpacity = theme === 'dark' ? opacity : opacity * 0.75;

  const gradientDirection = position === 'left'
    ? 'to right'
    : position === 'right'
    ? 'to left'
    : 'to bottom';

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: adjustedOpacity,
          mixBlendMode: blendMode as any,
        }}
      >
        {svgFallback ? (
          <div className="w-full h-full flex items-center justify-center">
            {svgFallback}
          </div>
        ) : (
          <Image
            src={imagePath}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition }}
            priority={false}
            quality={75}
          />
        )}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${gradientDirection}, transparent 20%, var(--bm-bg) 90%)`,
          opacity: 0.6,
        }}
      />
    </div>
  );
}
