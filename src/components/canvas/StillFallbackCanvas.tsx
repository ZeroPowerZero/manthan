import React from 'react';

export const StillFallbackCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-midnight">
      {/* Deep cosmic gradient background */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(79, 216, 232, 0.15) 0%, rgba(193, 61, 214, 0.12) 35%, rgba(43, 42, 107, 0.25) 60%, rgba(23, 20, 31, 1) 90%)'
        }}
      />

      {/* Stylized Luminous Figure Silhouette SVG */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-[320px] md:w-[480px] h-[520px] md:h-[680px] opacity-85"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="iridescentGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C13DD6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#4FD8E8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#F2B84B" stopOpacity="0.75" />
            </linearGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient id="rayGrad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#4FD8E8" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#C13DD6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#17141F" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Upward Volumetric God-Rays */}
          <polygon points="170,160 50,0 350,0 230,160" fill="url(#rayGrad)" opacity="0.6" />
          <polygon points="200,140 120,0 280,0 200,140" fill="url(#rayGrad)" opacity="0.8" />

          {/* Awakening Mind Corona */}
          <circle cx="200" cy="140" r="35" fill="url(#iridescentGlow)" filter="url(#softGlow)" opacity="0.9" />
          <circle cx="200" cy="140" r="14" fill="#FFFFFF" opacity="0.95" />

          {/* Ecstatic Head Tilted Up */}
          <ellipse cx="200" cy="140" rx="22" ry="26" fill="#F2E9DB" opacity="0.8" />

          {/* Glowing Heart Core */}
          <circle cx="200" cy="225" r="28" fill="#4FD8E8" filter="url(#softGlow)" opacity="0.75" />
          <circle cx="200" cy="225" r="10" fill="#FFFFFF" opacity="0.9" />

          {/* Torso & Arching Spine */}
          <path
            d="M 185,165 Q 175,220 182,290 L 218,290 Q 225,220 215,165 Z"
            fill="url(#iridescentGlow)"
            opacity="0.85"
          />

          {/* Left Arm reaching upward and outward */}
          <path
            d="M 180,195 Q 130,170 90,120 Q 95,115 105,120 Q 145,175 185,205 Z"
            fill="url(#iridescentGlow)"
            opacity="0.75"
          />
          <circle cx="85" cy="115" r="6" fill="#4FD8E8" filter="url(#softGlow)" />

          {/* Right Arm reaching upward and outward */}
          <path
            d="M 220,195 Q 270,170 310,120 Q 305,115 295,120 Q 255,175 215,205 Z"
            fill="url(#iridescentGlow)"
            opacity="0.75"
          />
          <circle cx="315" cy="115" r="6" fill="#C13DD6" filter="url(#softGlow)" />

          {/* Pelvis & Lower Form */}
          <path
            d="M 180,290 Q 170,360 178,460 L 195,460 Q 192,370 198,300 Z"
            fill="#2B2A6B"
            opacity="0.8"
          />
          <path
            d="M 220,290 Q 230,360 222,460 L 205,460 Q 208,370 202,300 Z"
            fill="#2B2A6B"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Subtle Static Stardust Grid */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(rgba(216, 197, 245, 0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
};
