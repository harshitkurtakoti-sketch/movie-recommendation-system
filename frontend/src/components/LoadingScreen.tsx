import React, { useEffect, useState } from 'react';
import { Film, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Show loading for 1.4s then smoothly fade out
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(onComplete, 600);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: fadingOut ? 'none' : 'auto'
      }}
    >
      {/* Central Ambient Glow */}
      <div
        className="ambient-glow glow-crimson"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          opacity: 0.3
        }}
      />

      {/* Central Animated Hologram Logo */}
      <div style={{ position: 'relative', marginBottom: '28px' }}>
        {/* Orbital Ring 1 */}
        <div
          style={{
            position: 'absolute',
            inset: '-16px',
            borderRadius: '50%',
            border: '1.5px dashed rgba(255, 42, 84, 0.5)',
            animation: 'orbitalRotate 4s linear infinite'
          }}
        />

        {/* Orbital Ring 2 */}
        <div
          style={{
            position: 'absolute',
            inset: '-28px',
            borderRadius: '50%',
            border: '1px solid rgba(121, 40, 202, 0.3)',
            animation: 'orbitalRotate 8s linear infinite reverse'
          }}
        />

        {/* Core Logo Box */}
        <div
          style={{
            width: '74px',
            height: '74px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #FF2A54 0%, #7928CA 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(255, 42, 84, 0.6)',
            position: 'relative',
            zIndex: 2
          }}
        >
          <Film size={36} color="#FFFFFF" />
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.8rem',
          fontWeight: 800,
          letterSpacing: '0.06em',
          color: '#FFFFFF',
          marginBottom: '8px'
        }}
      >
        AETHERIA
      </div>

      {/* Preparing Text */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Sparkles size={14} color="#FF2A54" className="animate-spin" />
        <span>Preparing your cinematic universe...</span>
      </div>
    </div>
  );
};
