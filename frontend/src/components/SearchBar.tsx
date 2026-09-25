import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, Sparkles, Film, ArrowRight } from 'lucide-react';
import type { SearchResult } from '../types/movie';

interface SearchBarProps {
  onSearch: (movieTitle: string) => void;
  isLoading?: boolean;
  onFocusChange?: (focused: boolean) => void;
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading = false,
  onFocusChange,
  initialValue = ''
}) => {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<number | null>(null);

  useEffect(() => {
    if (initialValue) {
      setQuery(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = window.setTimeout(async () => {
      try {
        setIsSuggesting(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data: SearchResult[] = await res.json();
          setSuggestions(data);
          setShowDropdown(data.length > 0 && isFocused);
        }
      } catch (err) {
        console.error('Autocomplete fetch error:', err);
      } finally {
        setIsSuggesting(false);
      }
    }, 180);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query, isFocused]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && suggestions[focusedIndex]) {
        handleSelectSuggestion(suggestions[focusedIndex].title);
      } else if (query.trim()) {
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const handleSubmit = () => {
    if (!query.trim() || isLoading) return;
    setShowDropdown(false);
    onSearch(query.trim());
  };

  const handleSelectSuggestion = (title: string) => {
    setQuery(title);
    setShowDropdown(false);
    onSearch(title);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocusChange && onFocusChange(true);
    if (suggestions.length > 0) setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      setShowDropdown(false);
      onFocusChange && onFocusChange(false);
    }, 200);
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '720px', margin: '0 auto' }}>
      <div
        style={{
          position: 'absolute',
          inset: '-3px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(255, 42, 84, 0.6) 0%, rgba(121, 40, 202, 0.5) 100%)',
          filter: 'blur(20px)',
          opacity: isFocused ? 0.8 : 0.25,
          transition: 'all 0.35s ease',
          pointerEvents: 'none'
        }}
      />

      <div
        className="glass-panel"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '20px',
          background: isFocused ? 'rgba(15, 15, 24, 0.95)' : 'rgba(10, 10, 16, 0.82)',
          backdropFilter: 'blur(24px)',
          border: isFocused ? '1px solid rgba(255, 42, 84, 0.55)' : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isFocused
            ? '0 12px 40px rgba(0, 0, 0, 0.8), 0 0 24px rgba(255, 42, 84, 0.25)'
            : '0 8px 32px rgba(0, 0, 0, 0.5)',
          padding: '6px 8px 6px 18px',
          transform: isFocused ? 'scale(1.01)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 30
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '14px', color: isFocused ? '#FF2A54' : 'var(--text-muted)' }}>
          {isLoading || isSuggesting ? (
            <Loader2 size={22} className="animate-spin" color="#FF2A54" />
          ) : (
            <Search size={22} style={{ transition: 'color 0.2s' }} />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search for a movie you love... (e.g. Avatar, Inception, Batman)"
          style={{
            flex: 1,
            background: 'transparent',
            color: '#FFFFFF',
            fontSize: '1.05rem',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            padding: '12px 0'
          }}
          aria-label="Search movies"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px',
              transition: 'all 0.2s'
            }}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!query.trim() || isLoading}
          className="btn-primary"
          style={{
            padding: '12px 24px',
            fontSize: '0.92rem',
            borderRadius: '14px',
            opacity: query.trim() ? 1 : 0.65,
            cursor: query.trim() ? 'pointer' : 'not-allowed',
            flexShrink: 0
          }}
        >
          <span>Find Movies</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="glass-panel"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            left: 0,
            right: 0,
            background: 'rgba(10, 10, 16, 0.95)',
            backdropFilter: 'blur(28px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '18px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            zIndex: 40,
            animation: 'fadeInScale 0.2s ease-out'
          }}
        >
          <div
            style={{
              padding: '10px 16px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={12} color="#FF2A54" />
            AI Matched Titles from 4,806 TMDB Corpus
          </div>

          <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
            {suggestions.map((item, idx) => {
              const isSelected = idx === focusedIndex;
              return (
                <div
                  key={item.movie_id}
                  onMouseDown={() => handleSelectSuggestion(item.title)}
                  onMouseEnter={() => setFocusedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 18px',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(255, 42, 84, 0.15)' : 'transparent',
                    borderLeft: isSelected ? '3px solid #FF2A54' : '3px solid transparent',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? '#FF2A54' : 'var(--text-muted)'
                      }}
                    >
                      <Film size={16} />
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: isSelected ? '#FFFFFF' : 'var(--text-secondary)'
                        }}
                      >
                        {item.title}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          marginTop: '2px'
                        }}
                      >
                        {item.year && <span>{item.year}</span>}
                        {item.genres && item.genres.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{item.genres.slice(0, 2).join(', ')}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.rating > 0 && (
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#FBBF24',
                        background: 'rgba(251, 191, 36, 0.12)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid rgba(251, 191, 36, 0.2)'
                      }}
                    >
                      ★ {item.rating.toFixed(1)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
