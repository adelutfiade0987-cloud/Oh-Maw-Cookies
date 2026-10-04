import React from 'react';

interface MawLogoProps {
  variant?: 'full' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MawLogo: React.FC<MawLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const CookieIcon = (
    <svg viewBox="0 0 100 100" className={`${iconSizes[size]} shrink-0`} fill="none">
      {/* Bitten Cookie Outline in signature Navy Blue */}
      <path
        d="M 85 40 
           C 80 43, 73 37, 72 32
           C 71 27, 78 22, 73 18
           C 68 14, 60 21, 56 18
           C 35 15, 15 32, 15 54
           C 15 76, 34 92, 56 92
           C 78 92, 92 74, 92 53
           C 92 48, 88 44, 85 40 Z"
        stroke="#2C5282"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FEF08A"
      />
      {/* Chocolate Chips in the logo */}
      <circle cx="36" cy="46" r="4.5" fill="#2C5282" />
      <circle cx="54" cy="38" r="4" fill="#2C5282" />
      <circle cx="44" cy="65" r="5" fill="#2C5282" />
      <circle cx="66" cy="58" r="4" fill="#2C5282" />
      <circle cx="56" cy="76" r="3.5" fill="#2C5282" />
      <circle cx="73" cy="72" r="3.5" fill="#2C5282" />
    </svg>
  );

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center rounded-full bg-[#FEF08A] p-2 shadow-inner border-2 border-[#2C5282]/20 ${className}`}>
        {CookieIcon}
      </div>
    );
  }

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{CookieIcon}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {CookieIcon}
      <div className="flex flex-col leading-none">
        <span className="font-display font-bold tracking-tight text-[#2C5282] text-xl sm:text-2xl">
          Oh Maw
        </span>
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#D97706]">
          Artisan Cookies
        </span>
      </div>
    </div>
  );
};
