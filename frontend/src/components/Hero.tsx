import React, { useState } from 'react';
import { Sparkles, Brain, ArrowRight } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface HeroProps {
  onSearch: (movieTitle: string) => void;
  isLoading?: boolean;
  onFocusChange?: (focused: boolean) => void;
}

const SEED_MOVIES = [
  'Avatar',
  'The Dark Knight',
  'Inception',
  'Interstellar',
  'Pulp Fiction',
  'The Matrix',
  'Guardians of the Galaxy',
  'Fight Club'
];

export const Hero: React.FC<HeroProps> = ({ onSearch, isLoading = false, onFocusChange }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  const handleFocus = (focused: boolean) => {
    setSearchFocused(focused);
    onFocusChange && onFocusChange(focused);
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        textAlign: 'center',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      <div
        className="ambient-glow glow-crimson"
        style={{
          top: '20%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${searchFocused ? 1.3 : 1})`,
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: searchFocused ? 0.35 : 0.22
        }}
      />
      <div
        className="ambient-glow glow-violet"
        style={{
          top: '35%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.2
        }}
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* AI Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 42, 84, 0.08)',
            border: '1px solid rgba(255, 42, 84, 0.3)',
            borderRadius: '999px',
            padding: '6px 16px',
            marginBottom: '28px',
            boxShadow: '0 0 20px rgba(255, 42, 84, 0.2)',
            animation: 'fadeInScale 0.6s ease'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#FF2A54',
              boxShadow: '0 0 10px #FF2A54',
              animation: 'pulseGlow 2s infinite'
            }}
          />
          <Brain size={14} color="#FF2A54" />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FF4D73'
            }}
          >
            AI-Powered Recommendations
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-faint)',
              paddingLeft: '4px',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            5,000-D Vector Space
          </span>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            textShadow: '0 10px 40px rgba(0,0,0,0.8)'
          }}
        >
          Discover What You’ll <br />
          <span className="text-gradient-crimson">Love Next.</span>
        </h1>

        {/* Supporting Description */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.28rem)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto 40px',
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}
        >
          An AI-powered movie recommendation engine that learns from your interests and finds movies matched to your taste.
        </p>

        {/* Search Bar Container */}
        <div style={{ marginBottom: '32px' }}>
          <SearchBar
            onSearch={onSearch}
            isLoading={isLoading}
            onFocusChange={handleFocus}
          />
        </div>

        {/* Quick Seed Exploration Pills */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={12} color="#FF2A54" />
            Quick AI Seeds to Explore:
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              maxWidth: '740px'
            }}
          >
            {SEED_MOVIES.map((title) => (
              <button
                key={title}
                type="button"
                className="glass-pill"
                onClick={() => onSearch(title)}
                style={{
                  fontSize: '0.82rem',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                <span>{title}</span>
                <ArrowRight size={12} color="#FF2A54" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
