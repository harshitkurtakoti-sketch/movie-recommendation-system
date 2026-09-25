import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Brain,
  BookOpen,
  Clapperboard,
  Globe2,
  Gem,
  Flame,
  Layers
} from 'lucide-react';
import type { MovieItem, RecommendationResponse } from '../types/movie';
import { MovieCard } from './MovieCard';
import { MoviePoster } from './MoviePoster';

interface RecommendationSectionProps {
  data: RecommendationResponse;
  onSelectMovie: (movie: MovieItem) => void;
  onRecommendSimilar: (movie: MovieItem) => void;
  onStrategyChange: (strategyKey: string) => void;
  currentStrategy?: string;
}

interface MLStrategyOption {
  key: string;
  name: string;
  icon: React.ReactNode;
  tag: string;
  description: string;
  color: string;
}

const ML_STRATEGY_OPTIONS: MLStrategyOption[] = [
  {
    key: 'balanced',
    name: 'Balanced Cosine',
    icon: <Brain size={14} />,
    tag: '5,000-D Full Matrix',
    description: 'Equally weighted cosine distance across plot keywords, cast, crew, and genres.',
    color: '#FF2A54'
  },
  {
    key: 'story_themes',
    name: 'Story & Narrative',
    icon: <BookOpen size={14} />,
    tag: 'NLP Plot Vectors',
    description: 'Prioritizes thematic plot keywords, conflict tropes, and story embeddings.',
    color: '#38BDF8'
  },
  {
    key: 'director_cast',
    name: 'Director & Cast',
    icon: <Clapperboard size={14} />,
    tag: 'Talent Synergy',
    description: 'Boosts candidate films sharing directorial vision, auteur style, or leading actors.',
    color: '#A855F7'
  },
  {
    key: 'genre_world',
    name: 'Genre & Universe',
    icon: <Globe2 size={14} />,
    tag: 'Worldbuilding',
    description: 'Maximizes overlap across primary cinematic genres, mood, and atmosphere.',
    color: '#10B981'
  },
  {
    key: 'hidden_gems',
    name: 'Hidden Gems',
    icon: <Gem size={14} />,
    tag: 'Underrated (★ 7.0+)',
    description: 'Filters for high critic & audience scores that are under-the-radar masterpieces.',
    color: '#FBBF24'
  },
  {
    key: 'blockbusters',
    name: 'Blockbuster Hits',
    icon: <Flame size={14} />,
    tag: 'High Box Office',
    description: 'Weights high-budget box office phenomenons and widespread cultural impact.',
    color: '#FB7185'
  }
];

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  data,
  onSelectMovie,
  onRecommendSimilar,
  onStrategyChange,
  currentStrategy = 'balanced'
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'year'>('match');

  const { source_movie, recommendations, engine_metrics } = data;

  const activeStrategyObj =
    ML_STRATEGY_OPTIONS.find((s) => s.key === currentStrategy) || ML_STRATEGY_OPTIONS[0];

  const allGenres = Array.from(
    new Set(recommendations.flatMap((m) => m.genres || []))
  );

  let filtered = recommendations.filter((m) => {
    if (selectedGenre === 'All') return true;
    return m.genres?.includes(selectedGenre);
  });

  if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
  } else if (sortBy === 'year') {
    filtered = [...filtered].sort((a, b) => (b.year ?? '').localeCompare(a.year ?? ''));
  }

  return (
    <section
      id="recommendations"
      style={{
        position: 'relative',
        padding: '60px 40px 100px',
        maxWidth: '1440px',
        margin: '0 auto',
        zIndex: 10
      }}
    >
      {/* Source Anchor Banner */}
      <div
        style={{
          marginBottom: '40px',
          animation: 'fadeInScale 0.4s ease'
        }}
      >
        <div
          className="glass-panel"
          style={{
            position: 'relative',
            padding: '24px 32px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(255, 42, 84, 0.08) 0%, rgba(121, 40, 202, 0.06) 50%, rgba(10, 10, 16, 0.94) 100%)',
            border: '1px solid rgba(255, 42, 84, 0.28)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 42, 84, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 480px' }}>
            <div style={{ width: '84px', flexShrink: 0, cursor: 'pointer' }} onClick={() => onSelectMovie(source_movie)}>
              <MoviePoster movie={source_movie} size="sm" />
            </div>

            <div>
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}
              >
                <span>Because you liked</span>
                <span
                  style={{
                    background: 'rgba(255, 42, 84, 0.2)',
                    color: '#FF2A54',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.7rem'
                  }}
                >
                  Active Seed
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  cursor: 'pointer'
                }}
                onClick={() => onSelectMovie(source_movie)}
              >
                {source_movie.title}
              </h2>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  marginTop: '6px'
                }}
              >
                {source_movie.year && <span>{source_movie.year}</span>}
                {source_movie.runtime && (
                  <>
                    <span>•</span>
                    <span>{source_movie.runtime}</span>
                  </>
                )}
                {source_movie.vote_average ? (
                  <>
                    <span>•</span>
                    <span style={{ color: '#FBBF24', fontWeight: 600 }}>★ {source_movie.vote_average.toFixed(1)}</span>
                  </>
                ) : null}
                {source_movie.genres && (
                  <>
                    <span>•</span>
                    <span>{source_movie.genres.slice(0, 3).join(', ')}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Engine Telemetry */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '6px',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              ML Vector Pipeline
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0, 0, 0, 0.45)',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.78rem',
                color: '#38BDF8'
              }}
            >
              <Cpu size={14} />
              <span>5,000 Dimensions • {engine_metrics?.corpus_size || 4806} Corpus Movies</span>
            </div>
          </div>
        </div>
      </div>

      {/* ML Recommendation Types Selector */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 24px',
          borderRadius: '20px',
          background: 'rgba(12, 12, 18, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '36px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'rgba(255, 42, 84, 0.15)',
                border: '1px solid rgba(255, 42, 84, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Layers size={14} color="#FF2A54" />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF' }}>
                Machine Learning Recommendation Types
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Select an ML vector weighting strategy to dynamically re-synthesize recommendations
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: '0.72rem',
              color: activeStrategyObj.color,
              fontFamily: 'var(--font-mono)',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: `1px solid ${activeStrategyObj.color}40`
            }}
          >
            Active Mode: {activeStrategyObj.name} ({activeStrategyObj.tag})
          </div>
        </div>

        {/* Strategies Pills Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px'
          }}
        >
          {ML_STRATEGY_OPTIONS.map((strat) => {
            const isSelected = strat.key === currentStrategy;
            return (
              <button
                key={strat.key}
                type="button"
                onClick={() => onStrategyChange(strat.key)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: isSelected
                    ? `linear-gradient(135deg, ${strat.color}22 0%, rgba(10, 10, 16, 0.95) 100%)`
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected
                    ? `1px solid ${strat.color}`
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected ? `0 0 20px ${strat.color}25` : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%', marginBottom: '4px' }}>
                  <span style={{ color: isSelected ? strat.color : 'var(--text-muted)' }}>
                    {strat.icon}
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: isSelected ? '#FFFFFF' : 'var(--text-secondary)'
                    }}
                  >
                    {strat.name}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '0.68rem',
                    color: isSelected ? strat.color : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {strat.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Strategy Explainer */}
        <div
          style={{
            marginTop: '14px',
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={13} color={activeStrategyObj.color} />
          <span>
            <strong style={{ color: activeStrategyObj.color }}>{activeStrategyObj.name}:</strong>{' '}
            {activeStrategyObj.description}
          </span>
        </div>
      </div>

      {/* Header and Filter/Sort Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <div>
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: activeStrategyObj.color,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '4px'
            }}
          >
            <Sparkles size={14} />
            AI Matched Candidates ({filtered.length} Films)
          </div>
          <h3
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              fontWeight: 800,
              color: '#FFFFFF'
            }}
          >
            Recommended For You
          </h3>
        </div>

        {/* Filter and Sort Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setSelectedGenre('All')}
              className="glass-pill"
              style={{
                background: selectedGenre === 'All' ? 'rgba(255, 42, 84, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: selectedGenre === 'All' ? '#FF2A54' : 'rgba(255, 255, 255, 0.1)',
                color: selectedGenre === 'All' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              All Genres ({recommendations.length})
            </button>

            {allGenres.slice(0, 4).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGenre(g)}
                className="glass-pill"
                style={{
                  background: selectedGenre === g ? 'rgba(255, 42, 84, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  borderColor: selectedGenre === g ? '#FF2A54' : 'rgba(255, 255, 255, 0.1)',
                  color: selectedGenre === g ? '#FFFFFF' : 'var(--text-muted)'
                }}
              >
                {g}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '0.82rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="match" style={{ background: '#101018' }}>Sort: Match Synergy</option>
            <option value="rating" style={{ background: '#101018' }}>Sort: TMDB Rating</option>
            <option value="year" style={{ background: '#101018' }}>Sort: Release Year</option>
          </select>
        </div>
      </div>

      {/* Grid of Perfectly Equal-Height Uniform Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}
      >
        {filtered.map((movie, index) => (
          <MovieCard
            key={movie.id || movie.movie_id || movie.title}
            movie={movie}
            onSelectMovie={onSelectMovie}
            onRecommendSimilar={onRecommendSimilar}
            rank={movie.rank || index + 1}
          />
        ))}
      </div>
    </section>
  );
};
