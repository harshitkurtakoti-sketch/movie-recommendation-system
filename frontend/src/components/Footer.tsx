import React from 'react';
import { Film, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(5, 5, 8, 0.95)',
        padding: '60px 40px 40px',
        zIndex: 10
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          {/* Logo & Tagline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #FF2A54, #7928CA)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Film size={16} color="#FFFFFF" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                AETHERIA
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#FF2A54',
                  background: 'rgba(255, 42, 84, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}
              >
                AI MOVIE ENGINE
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', fontStyle: 'italic' }}>
              "Discover less. Watch better."
            </p>
          </div>

          {/* Model Metrics Quick Summary */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-faint)'
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Corpus: </span>
              <span style={{ color: '#FFFFFF' }}>4,806 Titles</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Features: </span>
              <span style={{ color: '#FFFFFF' }}>5,000 Vectors</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Latency: </span>
              <span style={{ color: '#10B981' }}>&lt; 2ms</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '0.8rem',
            color: 'var(--text-faint)'
          }}
        >
          <div>
            Powered by Content-Based Machine Learning & TMDB 5000 Dataset.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Engineered with production precision</span>
            <Sparkles size={12} color="#FF2A54" />
          </div>
        </div>
      </div>
    </footer>
  );
};
