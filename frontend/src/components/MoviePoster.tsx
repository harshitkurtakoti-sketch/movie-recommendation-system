import React, { useState } from 'react';
import { Film, Star } from 'lucide-react';
import type { MovieItem } from '../types/movie';

interface MoviePosterProps {
  movie: MovieItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

const GENRE_PALETTES: Record<string, { bg: string; accent: string; secondary: string; tag: string }> = {
  'Science Fiction': {
    bg: 'linear-gradient(155deg, #0a192f 0%, #030712 100%)',
    accent: '#38BDF8',
    secondary: '#818CF8',
    tag: 'SCI-FI'
  },
  'Action': {
    bg: 'linear-gradient(155deg, #2a0b12 0%, #080304 100%)',
    accent: '#FF2A54',
    secondary: '#F59E0B',
    tag: 'ACTION'
  },
  'Adventure': {
    bg: 'linear-gradient(155deg, #0f241a 0%, #030805 100%)',
    accent: '#10B981',
    secondary: '#38BDF8',
    tag: 'ADVENTURE'
  },
  'Fantasy': {
    bg: 'linear-gradient(155deg, #240d38 0%, #08030f 100%)',
    accent: '#C084FC',
    secondary: '#E879F9',
    tag: 'FANTASY'
  },
  'Drama': {
    bg: 'linear-gradient(155deg, #16182c 0%, #070812 100%)',
    accent: '#93C5FD',
    secondary: '#A78BFA',
    tag: 'DRAMA'
  },
  'Thriller': {
    bg: 'linear-gradient(155deg, #240f22 0%, #080308 100%)',
    accent: '#F43F5E',
    secondary: '#A855F7',
    tag: 'THRILLER'
  },
  'Horror': {
    bg: 'linear-gradient(155deg, #220609 0%, #050102 100%)',
    accent: '#E11D48',
    secondary: '#881337',
    tag: 'HORROR'
  },
  'Crime': {
    bg: 'linear-gradient(155deg, #1c1a16 0%, #070605 100%)',
    accent: '#F59E0B',
    secondary: '#EF4444',
    tag: 'CRIME'
  },
  'Animation': {
    bg: 'linear-gradient(155deg, #1f143a 0%, #060312 100%)',
    accent: '#F472B6',
    secondary: '#60A5FA',
    tag: 'ANIMATION'
  },
  'Comedy': {
    bg: 'linear-gradient(155deg, #261f0e 0%, #090703 100%)',
    accent: '#FBBF24',
    secondary: '#FB923C',
    tag: 'COMEDY'
  },
  'Romance': {
    bg: 'linear-gradient(155deg, #2a0e1e 0%, #0a0307 100%)',
    accent: '#FB7185',
    secondary: '#F43F5E',
    tag: 'ROMANCE'
  }
};

export const MoviePoster: React.FC<MoviePosterProps> = ({ movie, className = '', size = 'md' }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const primaryGenre = movie.genres && movie.genres.length > 0 ? movie.genres[0] : 'Drama';
  const palette = GENRE_PALETTES[primaryGenre] || GENRE_PALETTES['Drama'];

  const tmdbId = movie.id || movie.movie_id;
  const posterUrl = movie.poster_path
    ? (movie.poster_path.startsWith('http') ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
    : (tmdbId ? `https://image.tmdb.org/t/p/w500/placeholder_${tmdbId}.jpg` : null);

  const initials = movie.title
    ? movie.title
        .split(/[\s:-]+/)
        .filter(Boolean)
        .map(w => w[0])
        .slice(0, 3)
        .join('')
        .toUpperCase()
    : 'CIN';

  const sizeHeights: Record<string, string> = {
    sm: '150px',
    md: '270px',
    lg: '360px',
    hero: '420px'
  };

  return (
    <div
      className={`movie-poster-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: sizeHeights[size],
        borderRadius: '12px',
        overflow: 'hidden',
        background: palette.bg,
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        flexShrink: 0
      }}
    >
      {/* Background Radial Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-25%',
          right: '-25%',
          width: '90%',
          height: '90%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${palette.accent}28 0%, transparent 70%)`,
          filter: 'blur(28px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-25%',
          left: '-25%',
          width: '90%',
          height: '90%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${palette.secondary}20 0%, transparent 70%)`,
          filter: 'blur(28px)',
          pointerEvents: 'none'
        }}
      />

      {/* Real Poster Image (if available & loads) */}
      {!imgFailed && posterUrl && (
        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgFailed(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease-in-out',
            zIndex: 1
          }}
        />
      )}

      {/* Cinematic Poster Graphic (clean, minimal, never duplicates title) */}
      {(!imgLoaded || imgFailed) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px',
            zIndex: 2,
            boxSizing: 'border-box'
          }}
        >
          {/* Top Bar: Genre & TMDB Star Rating */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: size === 'sm' ? '0.62rem' : '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: palette.accent,
                textTransform: 'uppercase',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                padding: '3px 8px',
                borderRadius: '6px',
                border: `1px solid ${palette.accent}35`
              }}
            >
              {palette.tag}
            </span>

            {movie.vote_average ? (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: size === 'sm' ? '0.68rem' : '0.75rem',
                  fontWeight: 700,
                  color: '#FBBF24',
                  background: 'rgba(0,0,0,0.55)',
                  padding: '3px 7px',
                  borderRadius: '6px',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <Star size={11} fill="#FBBF24" />
                {movie.vote_average.toFixed(1)}
              </span>
            ) : null}
          </div>

          {/* Centerpiece: Cinematic Emblem */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'auto 0'
            }}
          >
            <div
              style={{
                width: size === 'sm' ? '40px' : '58px',
                height: size === 'sm' ? '40px' : '58px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${palette.accent}25, ${palette.secondary}15)`,
                border: `1px solid ${palette.accent}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 24px ${palette.accent}20`,
                marginBottom: '8px'
              }}
            >
              <Film size={size === 'sm' ? 18 : 26} color={palette.accent} />
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: size === 'sm' ? '1rem' : '1.35rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                color: '#FFFFFF',
                opacity: 0.85,
                textShadow: `0 0 16px ${palette.accent}60`
              }}
            >
              {initials}
            </div>
          </div>

          {/* Bottom Minimal Film Strip Indicator */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
              opacity: 0.35
            }}
          >
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                style={{
                  width: '6px',
                  height: '4px',
                  borderRadius: '1px',
                  background: palette.accent
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Film Grain Texture */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0)',
          backgroundSize: '4px 4px',
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 3
        }}
      />
    </div>
  );
};
