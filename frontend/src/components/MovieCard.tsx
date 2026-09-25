import React, { useState, useRef } from 'react';
import { Star, Sparkles, Info, Compass } from 'lucide-react';
import type { MovieItem } from '../types/movie';
import { MoviePoster } from './MoviePoster';

interface MovieCardProps {
  movie: MovieItem;
  onSelectMovie?: (movie: MovieItem) => void;
  onRecommendSimilar?: (movie: MovieItem) => void;
  rank?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelectMovie,
  onRecommendSimilar,
  rank
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -6;
    const tiltY = ((x - centerX) / centerX) * 6;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const rating = movie.vote_average ?? 0;
  const matchPct = movie.match_percentage;
  const matchedTokens = movie.matched_features || [];

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        borderRadius: '16px',
        perspective: '1000px',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transform: isHovered
          ? `translateY(-8px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'translateY(0) rotateX(0deg) rotateY(0deg)',
        transition: isHovered
          ? 'transform 0.12s ease-out, box-shadow 0.25s ease'
          : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease',
        transformStyle: 'preserve-3d',
        zIndex: isHovered ? 20 : 1
      }}
      onClick={() => onSelectMovie && onSelectMovie(movie)}
    >
      {/* Outer ambient glow on hover */}
      <div
        style={{
          position: 'absolute',
          inset: '-4px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(255, 42, 84, 0.4), rgba(121, 40, 202, 0.3))',
          filter: 'blur(16px)',
          opacity: isHovered ? 0.75 : 0,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Main Card Surface with Fixed Equal-Height Layout */}
      <div
        className="glass-panel"
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'rgba(14, 14, 22, 0.92)',
          border: isHovered
            ? '1px solid rgba(255, 42, 84, 0.45)'
            : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isHovered
            ? '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 42, 84, 0.25)'
            : '0 8px 24px rgba(0, 0, 0, 0.5)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {/* Poster Container (Fixed Height 270px) */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '270px', flexShrink: 0 }}>
          <div
            style={{
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              height: '100%'
            }}
          >
            <MoviePoster movie={movie} size="md" />
          </div>

          {/* Top Badges Floating Over Poster */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              right: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 4,
              pointerEvents: 'none'
            }}
          >
            {matchPct ? (
              <div
                style={{
                  background: 'rgba(5, 5, 5, 0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 42, 84, 0.45)',
                  color: '#FF2A54',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 4px 12px rgba(255, 42, 84, 0.25)'
                }}
              >
                <Sparkles size={11} />
                {matchPct}
              </div>
            ) : rank ? (
              <div
                style={{
                  background: 'rgba(5, 5, 5, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                #{rank}
              </div>
            ) : (
              <div />
            )}

            {rating > 0 && (
              <div
                style={{
                  background: 'rgba(5, 5, 5, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  color: '#FBBF24',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '3px 7px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <Star size={11} fill="#FBBF24" />
                {rating.toFixed(1)}
              </div>
            )}
          </div>

          {/* Hover Overlay Button */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.3) 50%, transparent 100%)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.25s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '14px',
              zIndex: 3
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '8px',
                transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                opacity: isHovered ? 1 : 0,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <button
                type="button"
                className="btn-primary"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  borderRadius: '8px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectMovie && onSelectMovie(movie);
                }}
              >
                <Info size={13} />
                Details
              </button>

              {onRecommendSimilar && (
                <button
                  type="button"
                  className="btn-secondary"
                  title="Find recommendations similar to this movie"
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRecommendSimilar(movie);
                  }}
                >
                  <Compass size={13} color="#FF2A54" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Card Body (Consistent Structured Padding & Alignment) */}
        <div
          style={{
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            gap: '6px'
          }}
        >
          <div>
            {/* Title & Release Year Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '8px',
                marginBottom: '2px'
              }}
            >
              <h3
                title={movie.title}
                style={{
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  color: isHovered ? '#FF2A54' : '#FFFFFF',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'color 0.2s ease',
                  flex: 1
                }}
              >
                {movie.title}
              </h3>

              {movie.year && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    flexShrink: 0
                  }}
                >
                  {movie.year}
                </span>
              )}
            </div>

            {/* Genres Row */}
            {movie.genres && movie.genres.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                {movie.genres.slice(0, 2).map((g) => (
                  <span
                    key={g}
                    style={{
                      fontSize: '0.68rem',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-muted)',
                      border: '1px solid rgba(255, 255, 255, 0.07)'
                    }}
                  >
                    {g}
                  </span>
                ))}
                {movie.runtime && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      color: 'var(--text-faint)',
                      padding: '2px 4px'
                    }}
                  >
                    • {movie.runtime}
                  </span>
                )}
              </div>
            )}

            {/* ML Strategy Tag / Matched Features */}
            {movie.ml_strategy && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: '#38BDF8',
                  background: 'rgba(56, 189, 248, 0.08)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  marginBottom: '6px'
                }}
              >
                <span>{movie.ml_strategy}</span>
              </div>
            )}

            {/* Matched Feature Tags (The tokens that triggered the ML link!) */}
            {matchedTokens.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                {matchedTokens.slice(0, 3).map((tok) => (
                  <span
                    key={tok}
                    style={{
                      fontSize: '0.64rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#A855F7',
                      background: 'rgba(168, 85, 247, 0.08)',
                      padding: '1px 5px',
                      borderRadius: '3px',
                      border: '1px solid rgba(168, 85, 247, 0.2)'
                    }}
                  >
                    #{tok}
                  </span>
                ))}
              </div>
            )}

            {/* Overview Snippet Clamped to 2 lines */}
            {movie.overview && (
              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.45,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  margin: 0
                }}
              >
                {movie.overview}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
