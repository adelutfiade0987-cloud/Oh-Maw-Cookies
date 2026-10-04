import React from 'react';

interface CookieVisualProps {
  category: 'clasic' | 'monster' | 'velvet' | 'choco' | 'matcha';
  view?: 'top' | 'cut';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

export const CookieVisual: React.FC<CookieVisualProps> = ({
  category,
  view = 'top',
  size = 'md',
  className = '',
  animate = true,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    xl: 'w-56 h-56',
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  if (view === 'cut') {
    return (
      <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
        <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-lg overflow-visible">
          <defs>
            {/* Clasic Gradients */}
            <linearGradient id="clasic-crust" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5B064" />
              <stop offset="50%" stopColor="#E2943B" />
              <stop offset="100%" stopColor="#B4651E" />
            </linearGradient>
            <radialGradient id="clasic-lava" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2E170A" />
              <stop offset="80%" stopColor="#4A2511" />
              <stop offset="100%" stopColor="#1B0C04" />
            </radialGradient>

            {/* Monster Gradients */}
            <linearGradient id="monster-crust" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="40%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* Red Velvet Gradients */}
            <linearGradient id="velvet-crust" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="40%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>
            <radialGradient id="creamcheese-lava" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FEF08A" />
              <stop offset="90%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </radialGradient>

            {/* Double Choco Gradients */}
            <linearGradient id="choco-crust" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5C2B10" />
              <stop offset="50%" stopColor="#3D1806" />
              <stop offset="100%" stopColor="#240D02" />
            </linearGradient>

            {/* Matcha Gradients */}
            <linearGradient id="matcha-crust" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#84CC16" />
              <stop offset="45%" stopColor="#65A30D" />
              <stop offset="100%" stopColor="#3F6212" />
            </linearGradient>
          </defs>

          {/* Cut Cross-Section Rendering */}
          {category === 'clasic' && (
            <g>
              {/* Outer broken cookie arc */}
              <path
                d="M 20 120 C 15 60 50 20 100 20 C 150 20 185 60 180 120 C 145 105 130 115 100 110 C 70 105 50 115 20 120 Z"
                fill="url(#clasic-crust)"
              />
              {/* Molten dark chocolate core oozing */}
              <path
                d="M 60 95 C 75 75 125 75 140 95 C 135 125 120 140 100 135 C 78 140 65 125 60 95 Z"
                fill="url(#clasic-lava)"
              />
              {/* Chocolate drip */}
              <path
                d="M 92 125 C 92 142 108 142 108 125 Z"
                fill="#2E170A"
              />
              {/* Chocochips on crust */}
              <circle cx="45" cy="55" r="7" fill="#2E170A" />
              <circle cx="150" cy="65" r="6" fill="#2E170A" />
              <circle cx="95" cy="35" r="8" fill="#2E170A" />
            </g>
          )}

          {category === 'monster' && (
            <g>
              {/* Blue dough broken arc */}
              <path
                d="M 20 120 C 15 60 50 20 100 20 C 150 20 185 60 180 120 C 145 105 130 115 100 110 C 70 105 50 115 20 120 Z"
                fill="url(#monster-crust)"
              />
              {/* Dark chocolate & gorio crumbs inside */}
              <path
                d="M 55 90 C 70 70 130 70 145 90 C 140 120 125 130 100 128 C 75 130 60 120 55 90 Z"
                fill="#18181B"
              />
              {/* White Oreo cream fleck inside */}
              <path d="M 85 96 Q 100 90 115 96 Q 100 104 85 96" fill="#F8FAFC" opacity="0.9" />
              {/* Mini Gorio on top */}
              <ellipse cx="100" cy="22" rx="26" ry="14" fill="#18181B" />
              <ellipse cx="100" cy="22" rx="22" ry="11" fill="#27272A" stroke="#09090B" strokeWidth="2" />
              <ellipse cx="100" cy="22" rx="14" ry="7" fill="#18181B" />
              {/* Gorio crumbs scattered */}
              <circle cx="50" cy="60" r="5" fill="#18181B" />
              <circle cx="145" cy="65" r="6" fill="#18181B" />
            </g>
          )}

          {category === 'velvet' && (
            <g>
              {/* Red dough broken arc */}
              <path
                d="M 20 120 C 15 60 50 20 100 20 C 150 20 185 60 180 120 C 145 105 130 115 100 110 C 70 105 50 115 20 120 Z"
                fill="url(#velvet-crust)"
              />
              {/* Cream cheese molten center filling */}
              <path
                d="M 52 92 C 68 65 132 65 148 92 C 142 125 125 136 100 134 C 75 136 58 125 52 92 Z"
                fill="url(#creamcheese-lava)"
              />
              {/* Soft cream cheese drip */}
              <ellipse cx="100" cy="118" rx="18" ry="10" fill="#FFFBEB" />
              <path d="M 94 122 C 94 140 106 140 106 122 Z" fill="#FEF08A" />
              {/* Velvet crinkles */}
              <path d="M 40 45 Q 60 50 70 40" stroke="#881337" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 130 42 Q 145 52 160 48" stroke="#881337" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}

          {category === 'choco' && (
            <g>
              {/* Cocoa dough broken arc */}
              <path
                d="M 20 120 C 15 60 50 20 100 20 C 150 20 185 60 180 120 C 145 105 130 115 100 110 C 70 105 50 115 20 120 Z"
                fill="url(#choco-crust)"
              />
              {/* Molten intense dark chocolate core */}
              <path
                d="M 55 90 C 70 65 130 65 145 90 C 142 130 126 144 100 142 C 74 144 58 130 55 90 Z"
                fill="#150802"
              />
              {/* Chocolate lava drip */}
              <path d="M 90 125 C 90 148 110 148 110 125 Z" fill="#100501" />
              {/* Fudgy cracks */}
              <path d="M 42 50 Q 62 60 80 48" stroke="#1F0B03" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 125 45 Q 145 58 160 52" stroke="#1F0B03" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}

          {category === 'matcha' && (
            <g>
              {/* Matcha dough broken arc */}
              <path
                d="M 20 120 C 15 60 50 20 100 20 C 150 20 185 60 180 120 C 145 105 130 115 100 110 C 70 105 50 115 20 120 Z"
                fill="url(#matcha-crust)"
              />
              {/* Matcha chocolate chunks inside */}
              <path
                d="M 58 92 C 72 75 128 75 142 92 C 136 122 122 132 100 128 C 78 132 64 122 58 92 Z"
                fill="#4D7C0F"
              />
              {/* Chunky matcha white chocolate chunks */}
              <rect x="75" y="86" width="18" height="14" rx="3" fill="#BEF264" transform="rotate(-12 84 93)" />
              <rect x="108" y="88" width="20" height="16" rx="3" fill="#D9F99D" transform="rotate(15 118 96)" />
              {/* Matcha surface crackles */}
              <path d="M 44 48 Q 65 55 82 45" stroke="#365314" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 122 42 Q 140 54 158 46" stroke="#365314" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Top / Full Dome View (Fresh Baked Cookie)
  return (
    <div
      className={`relative flex items-center justify-center ${currentSize} ${className} transition-transform duration-300 ${
        animate ? 'group-hover:scale-105' : ''
      }`}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          {/* Shadow filter */}
          <filter id="cookie-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.25" floodColor="#451A03" />
          </filter>

          {/* Gradients for cookies */}
          <radialGradient id="top-clasic" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FBD38D" />
            <stop offset="50%" stopColor="#ED8936" />
            <stop offset="90%" stopColor="#C05621" />
            <stop offset="100%" stopColor="#7B341E" />
          </radialGradient>

          <radialGradient id="top-monster" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="90%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#0C4A6E" />
          </radialGradient>

          <radialGradient id="top-velvet" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="50%" stopColor="#E11D48" />
            <stop offset="85%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>

          <radialGradient id="top-choco" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="50%" stopColor="#451A03" />
            <stop offset="85%" stopColor="#2E1002" />
            <stop offset="100%" stopColor="#170701" />
          </radialGradient>

          <radialGradient id="top-matcha" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#A3E635" />
            <stop offset="50%" stopColor="#65A30D" />
            <stop offset="85%" stopColor="#4D7C0F" />
            <stop offset="100%" stopColor="#365314" />
          </radialGradient>
        </defs>

        {/* 1. CLASIC COOKIE: Golden dough with dark chocochips */}
        {category === 'clasic' && (
          <g filter="url(#cookie-shadow)">
            {/* Chunky Organic Cookie Body */}
            <path
              d="M 100 20 C 145 18 180 50 182 95 C 184 140 145 182 100 180 C 55 178 18 142 20 98 C 22 52 55 22 100 20 Z"
              fill="url(#top-clasic)"
            />
            {/* Crust Texture Crinkles */}
            <path d="M 50 65 Q 75 75 90 62" stroke="#9C4221" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 115 120 Q 140 125 155 110" stroke="#9C4221" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 60 135 Q 85 145 110 140" stroke="#9C4221" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Chocochips on top (just like image WA0046) */}
            <g fill="#2A1406" stroke="#150802" strokeWidth="1">
              <ellipse cx="75" cy="58" rx="8" ry="7" transform="rotate(-15 75 58)" />
              <ellipse cx="120" cy="52" rx="9" ry="8" transform="rotate(20 120 52)" />
              <ellipse cx="98" cy="88" rx="10" ry="9" transform="rotate(-5 98 88)" />
              <ellipse cx="62" cy="105" rx="8" ry="7" transform="rotate(45 62 105)" />
              <ellipse cx="140" cy="95" rx="9" ry="8" transform="rotate(-25 140 95)" />
              <ellipse cx="112" cy="132" rx="8.5" ry="7.5" transform="rotate(10 112 132)" />
              <ellipse cx="80" cy="148" rx="7" ry="6" transform="rotate(-30 80 148)" />
              <ellipse cx="152" cy="65" rx="6" ry="5" />
            </g>
            {/* Glossy highlights on chips */}
            <circle cx="73" cy="56" r="2" fill="#8D4925" />
            <circle cx="118" cy="49" r="2" fill="#8D4925" />
            <circle cx="96" cy="85" r="2.5" fill="#8D4925" />
          </g>
        )}

        {/* 2. KUKI MONSTER: Blue cookie topped with Oreo/Gorio sandwich */}
        {category === 'monster' && (
          <g filter="url(#cookie-shadow)">
            {/* Chunky Blue Cookie Body */}
            <path
              d="M 100 20 C 145 18 180 50 182 95 C 184 140 145 182 100 180 C 55 178 18 142 20 98 C 22 52 55 22 100 20 Z"
              fill="url(#top-monster)"
            />
            {/* Cracks and biscuit texture */}
            <path d="M 45 70 Q 65 80 75 65" stroke="#0369A1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 125 130 Q 145 135 160 120" stroke="#0369A1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="58" cy="120" r="5" fill="#0C4A6E" />
            <circle cx="145" cy="68" r="5" fill="#0C4A6E" />

            {/* Whole Mini Gorio / Oreo cookie crowned on top */}
            <g>
              {/* Cookie Outer Disc */}
              <circle cx="100" cy="100" r="38" fill="#18181B" stroke="#09090B" strokeWidth="3" />
              {/* Embossed Ring */}
              <circle cx="100" cy="100" r="32" fill="none" stroke="#27272A" strokeWidth="2.5" strokeDasharray="5,3" />
              {/* Inner Circle pattern */}
              <circle cx="100" cy="100" r="20" fill="#27272A" stroke="#3F3F46" strokeWidth="1.5" />
              {/* Center crest */}
              <rect x="88" y="93" width="24" height="14" rx="3" fill="#18181B" stroke="#52525B" strokeWidth="1" />
              <text x="100" y="103" textAnchor="middle" fill="#A1A1AA" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
                GORIO
              </text>
            </g>
          </g>
        )}

        {/* 3. RED VELVET: Deep ruby red cookie with crinkled folds & cream cheese core hint */}
        {category === 'velvet' && (
          <g filter="url(#cookie-shadow)">
            {/* Chunky Red Cookie Body */}
            <path
              d="M 100 20 C 145 18 180 50 182 95 C 184 140 145 182 100 180 C 55 178 18 142 20 98 C 22 52 55 22 100 20 Z"
              fill="url(#top-velvet)"
            />
            {/* Signature Red Velvet Rustic Cracks */}
            <path d="M 52 55 C 70 65 75 80 92 78" stroke="#881337" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 112 76 C 130 82 142 70 156 82" stroke="#881337" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 70 115 C 85 125 110 120 130 130" stroke="#881337" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 85 40 Q 100 52 115 42" stroke="#9F1239" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 45 105 Q 60 118 70 135" stroke="#9F1239" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Subtle peeking cream cheese fissure in center */}
            <ellipse cx="102" cy="98" rx="8" ry="5" fill="#FEF08A" opacity="0.8" transform="rotate(-15 102 98)" />
          </g>
        )}

        {/* 4. DOUBLE CHOCO: Deep cocoa dough with cracked crust */}
        {category === 'choco' && (
          <g filter="url(#cookie-shadow)">
            {/* Chunky Dark Cocoa Body */}
            <path
              d="M 100 20 C 145 18 180 50 182 95 C 184 140 145 182 100 180 C 55 178 18 142 20 98 C 22 52 55 22 100 20 Z"
              fill="url(#top-choco)"
            />
            {/* Rich Fudgy Cracks */}
            <path d="M 48 60 Q 75 70 95 55" stroke="#170701" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 110 65 Q 135 75 158 60" stroke="#170701" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 60 115 Q 90 130 115 118" stroke="#170701" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 115 118 Q 138 128 152 110" stroke="#170701" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Molten Chocolate droplets on top */}
            <circle cx="85" cy="85" r="7" fill="#120400" />
            <circle cx="125" cy="95" r="8" fill="#120400" />
            <circle cx="100" cy="138" r="6" fill="#120400" />
            {/* Sheen */}
            <circle cx="83" cy="83" r="2" fill="#5C2508" />
            <circle cx="123" cy="93" r="2" fill="#5C2508" />
          </g>
        )}

        {/* 5. MATCHA: Earthy green matcha cookie with matcha chocolate chunks */}
        {category === 'matcha' && (
          <g filter="url(#cookie-shadow)">
            {/* Chunky Matcha Body */}
            <path
              d="M 100 20 C 145 18 180 50 182 95 C 184 140 145 182 100 180 C 55 178 18 142 20 98 C 22 52 55 22 100 20 Z"
              fill="url(#top-matcha)"
            />
            {/* Natural Matcha Crinkles */}
            <path d="M 50 65 Q 75 75 90 60" stroke="#365314" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 115 62 Q 138 72 155 60" stroke="#365314" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 65 125 Q 95 135 125 120" stroke="#365314" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Embedded Matcha Chocolate Chunks */}
            <g fill="#BEF264" stroke="#4D7C0F" strokeWidth="1.5">
              <rect x="70" y="75" width="16" height="12" rx="2" transform="rotate(-15 78 81)" />
              <rect x="115" y="80" width="18" height="14" rx="2" transform="rotate(25 124 87)" />
              <rect x="95" y="105" width="15" height="11" rx="2" transform="rotate(-5 102 110)" />
              <rect x="60" y="100" width="12" height="10" rx="2" transform="rotate(40 66 105)" />
              <rect x="135" y="112" width="14" height="11" rx="2" transform="rotate(-20 142 117)" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
