import React, { useState, useEffect } from 'react';
import { Film, Search } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
  onOpenSearch?: () => void;
  isModelReady?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection = 'hero',
  onOpenSearch,
  isModelReady = true
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '74px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 50,
        background: isScrolled
          ? 'rgba(5, 5, 5, 0.82)'
          : 'linear-gradient(to bottom, rgba(5,5,5,0.7) 0%, transparent 100%)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        transition: 'all 0.35s ease'
      }}
    >
      <div
        onClick={() => onNavigate('hero')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #FF2A54 0%, #7928CA 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(255, 42, 84, 0.4)'
          }}
        >
          <Film size={20} color="#FFFFFF" />
          <div
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#00F2FE',
              boxShadow: '0 0 8px #00F2FE'
            }}
          />
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ color: '#FFFFFF' }}>AETHERIA</span>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                background: 'rgba(255, 42, 84, 0.15)',
                color: '#FF2A54',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 42, 84, 0.3)'
              }}
            >
              AI CINE
            </span>
          </div>
          <div
            style={{
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '-2px'
            }}
          >
            Neural Discovery Engine
          </div>
        </div>
      </div>

      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }}
        className="nav-links-desktop"
      >
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          style={{
            fontSize: '0.92rem',
            fontWeight: activeSection === 'hero' ? 600 : 500,
            color: activeSection === 'hero' ? '#FFFFFF' : 'var(--text-muted)',
            transition: 'color 0.2s',
            position: 'relative'
          }}
        >
          Home
          {activeSection === 'hero' && (
            <span
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '0',
                right: '0',
                height: '2px',
                background: '#FF2A54',
                borderRadius: '2px'
              }}
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => onNavigate('recommendations')}
          style={{
            fontSize: '0.92rem',
            fontWeight: activeSection === 'recommendations' ? 600 : 500,
            color: activeSection === 'recommendations' ? '#FFFFFF' : 'var(--text-muted)',
            transition: 'color 0.2s',
            position: 'relative'
          }}
        >
          Recommendations
          {activeSection === 'recommendations' && (
            <span
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '0',
                right: '0',
                height: '2px',
                background: '#FF2A54',
                borderRadius: '2px'
              }}
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => onNavigate('discover')}
          style={{
            fontSize: '0.92rem',
            fontWeight: activeSection === 'discover' ? 600 : 500,
            color: activeSection === 'discover' ? '#FFFFFF' : 'var(--text-muted)',
            transition: 'color 0.2s',
            position: 'relative'
          }}
        >
          Discover
          {activeSection === 'discover' && (
            <span
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '0',
                right: '0',
                height: '2px',
                background: '#FF2A54',
                borderRadius: '2px'
              }}
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => onNavigate('model')}
          style={{
            fontSize: '0.92rem',
            fontWeight: activeSection === 'model' ? 600 : 500,
            color: activeSection === 'model' ? '#FFFFFF' : 'var(--text-muted)',
            transition: 'color 0.2s',
            position: 'relative'
          }}
        >
          How It Works
          {activeSection === 'model' && (
            <span
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '0',
                right: '0',
                height: '2px',
                background: '#FF2A54',
                borderRadius: '2px'
              }}
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => onNavigate('tech')}
          style={{
            fontSize: '0.92rem',
            fontWeight: activeSection === 'tech' ? 600 : 500,
            color: activeSection === 'tech' ? '#FFFFFF' : 'var(--text-muted)',
            transition: 'color 0.2s',
            position: 'relative'
          }}
        >
          Technology
          {activeSection === 'tech' && (
            <span
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '0',
                right: '0',
                height: '2px',
                background: '#FF2A54',
                borderRadius: '2px'
              }}
            />
          )}
        </button>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          className="glass-pill"
          style={{
            padding: '5px 12px',
            fontSize: '0.78rem',
            border: isModelReady ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            background: isModelReady ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)'
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: isModelReady ? '#10B981' : '#EF4444',
              boxShadow: isModelReady ? '0 0 8px #10B981' : '0 0 8px #EF4444'
            }}
          />
          <span style={{ color: isModelReady ? '#A7F3D0' : '#FECACA', fontWeight: 600 }}>
            {isModelReady ? 'ML Model Online' : 'Connecting...'}
          </span>
        </div>

        {onOpenSearch && (
          <button
            type="button"
            onClick={onOpenSearch}
            className="btn-secondary"
            style={{
              padding: '8px 14px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Search size={15} />
            <span>Search</span>
            <kbd
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '2px 5px',
                borderRadius: '4px',
                color: 'var(--text-muted)'
              }}
            >
              /
            </kbd>
          </button>
        )}
      </div>
    </header>
  );
};
