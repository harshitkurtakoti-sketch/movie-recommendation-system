import React, { useEffect, useState, useRef } from 'react';
import { Compass, ChevronLeft, ChevronRight, Flame, Award, Rocket, Shield, Eye, Film } from 'lucide-react';
import type { MovieItem, ExploreCategory } from '../types/movie';
import { MovieCard } from './MovieCard';

interface ExploreSectionProps {
  onSelectMovie: (movie: MovieItem) => void;
  onRecommendSimilar: (movie: MovieItem) => void;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  onSelectMovie,
  onRecommendSimilar
}) => {
  const [categories, setCategories] = useState<ExploreCategory[]>([]);

  useEffect(() => {
    const fetchExplore = async () => {
      try {
        const res = await fetch('/api/explore');
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error('Failed to load explore categories:', err);
      }
    };

    fetchExplore();
  }, []);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'trending':
        return <Flame size={18} color="#FF2A54" />;
      case 'acclaimed':
        return <Award size={18} color="#FBBF24" />;
      case 'scifi':
        return <Rocket size={18} color="#38BDF8" />;
      case 'action':
        return <Shield size={18} color="#F43F5E" />;
      case 'thrillers':
        return <Eye size={18} color="#A855F7" />;
      default:
        return <Film size={18} color="#10B981" />;
    }
  };

  return (
    <section
      id="discover"
      style={{
        position: 'relative',
        padding: '60px 40px 100px',
        maxWidth: '1440px',
        margin: '0 auto',
        zIndex: 10
      }}
    >
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#FF2A54',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '6px'
          }}
        >
          <Compass size={14} />
          Cinematic Curation
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.15
          }}
        >
          Explore More Universes
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '6px' }}>
          Deep-dive into critically acclaimed gems, trending hits, and genre explorations from the TMDB corpus.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
        {categories.map((cat) => (
          <CategoryRow
            key={cat.id}
            category={cat}
            icon={getCategoryIcon(cat.id)}
            onSelectMovie={onSelectMovie}
            onRecommendSimilar={onRecommendSimilar}
          />
        ))}
      </div>
    </section>
  );
};

interface CategoryRowProps {
  category: ExploreCategory;
  icon: React.ReactNode;
  onSelectMovie: (movie: MovieItem) => void;
  onRecommendSimilar: (movie: MovieItem) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  category,
  icon,
  onSelectMovie,
  onRecommendSimilar
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const distance = 540;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
              {category.title}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {category.tagline}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="btn-secondary"
            style={{
              width: '36px',
              height: '36px',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="btn-secondary"
            style={{
              width: '36px',
              height: '36px',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: '20px',
          paddingTop: '6px',
          paddingLeft: '4px',
          paddingRight: '4px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          alignItems: 'stretch'
        }}
      >
        {category.movies.map((movie) => (
          <div
            key={movie.id || movie.movie_id || movie.title}
            style={{
              flex: '0 0 240px',
              scrollSnapAlign: 'start',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <MovieCard
              movie={movie}
              onSelectMovie={onSelectMovie}
              onRecommendSimilar={onRecommendSimilar}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
