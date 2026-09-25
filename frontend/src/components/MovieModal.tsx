import React, { useEffect } from 'react';
import { X, Star, Calendar, Clock, DollarSign, Users, Award, Sparkles, Compass } from 'lucide-react';
import type { MovieItem } from '../types/movie';
import { MoviePoster } from './MoviePoster';

interface MovieModalProps {
  movie: MovieItem | null;
  onClose: () => void;
  onGetRecommendations: (title: string) => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  onClose,
  onGetRecommendations
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const formatCurrency = (val?: number) => {
    if (!val || val <= 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'rgba(5, 5, 5, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'fadeInScale 0.25s ease-out'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '880px',
          maxHeight: '90vh',
          background: 'rgba(12, 12, 18, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 42, 84, 0.15)',
          overflowY: 'auto',
          zIndex: 101,
          animation: 'fadeInScale 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s ease'
          }}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '32px',
              padding: '36px 36px 28px',
              background: 'linear-gradient(180deg, rgba(255, 42, 84, 0.08) 0%, transparent 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ width: '180px', flexShrink: 0, borderRadius: '16px', overflow: 'hidden' }}>
              <MoviePoster movie={movie} size="lg" />
            </div>

            <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {movie.match_percentage && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 42, 84, 0.15)',
                    color: '#FF2A54',
                    border: '1px solid rgba(255, 42, 84, 0.35)',
                    borderRadius: '999px',
                    padding: '4px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    width: 'fit-content',
                    marginBottom: '10px'
                  }}
                >
                  <Sparkles size={12} />
                  <span>{movie.match_percentage}</span>
                  {movie.match_tier && <span style={{ color: 'var(--text-muted)' }}>• {movie.match_tier}</span>}
                </div>
              )}

              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: '6px',
                  color: '#FFFFFF'
                }}
              >
                {movie.title}
              </h2>

              {movie.tagline && (
                <div
                  style={{
                    fontStyle: 'italic',
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    marginBottom: '14px'
                  }}
                >
                  "{movie.tagline}"
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '16px'
                }}
              >
                {movie.year && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} color="#94A3B8" />
                    {movie.year}
                  </span>
                )}

                {movie.runtime && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} color="#94A3B8" />
                    {movie.runtime}
                  </span>
                )}

                {movie.vote_average ? (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#FBBF24',
                      fontWeight: 700,
                      background: 'rgba(251, 191, 36, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    <Star size={13} fill="#FBBF24" />
                    {movie.vote_average.toFixed(1)} / 10
                  </span>
                ) : null}

                {movie.vote_count ? (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>
                ) : null}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {movie.genres.map((g) => (
                    <span
                      key={g}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    onClose();
                    onGetRecommendations(movie.title);
                  }}
                  style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                >
                  <Compass size={17} />
                  <span>Get Recommendations</span>
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onClose}
                  style={{ padding: '12px 20px', fontSize: '0.92rem' }}
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          <div style={{ padding: '32px 36px 40px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {movie.overview && (
              <div>
                <h4
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#FF2A54',
                    marginBottom: '8px'
                  }}
                >
                  Storyline / Overview
                </h4>
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65
                  }}
                >
                  {movie.overview}
                </p>
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              {movie.director && (
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '4px'
                    }}
                  >
                    <Award size={13} color="#FF2A54" />
                    Director
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF' }}>
                    {movie.director}
                  </div>
                </div>
              )}

              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '4px'
                    }}
                  >
                    <Users size={13} color="#7928CA" />
                    Key Cast
                  </div>
                  <div style={{ fontSize: '0.92rem', color: '#FFFFFF' }}>
                    {movie.cast.join(', ')}
                  </div>
                </div>
              )}

              {movie.budget && movie.budget > 0 ? (
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '4px'
                    }}
                  >
                    <DollarSign size={13} color="#10B981" />
                    Budget / Revenue
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#FFFFFF' }}>
                    {formatCurrency(movie.budget)} / {formatCurrency(movie.revenue)}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
