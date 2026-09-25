import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RecommendationSection } from './components/RecommendationSection';
import { ExploreSection } from './components/ExploreSection';
import { ModelArchitecture } from './components/ModelArchitecture';
import { TechStackSection } from './components/TechStackSection';
import { MovieModal } from './components/MovieModal';
import { AIAssistantWidget } from './components/AIAssistantWidget';
import { LoadingScreen } from './components/LoadingScreen';
import { Footer } from './components/Footer';
import type { MovieItem, RecommendationResponse } from './types/movie';
import { AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const [isModelReady, setIsModelReady] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Search & Recommendation State
  const [isSearching, setIsSearching] = useState(false);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [recommendationData, setRecommendationData] = useState<RecommendationResponse | null>(null);
  const [currentStrategy, setCurrentStrategy] = useState<string>('balanced');
  const [searchError, setSearchError] = useState<string | null>(null);

  // Modal State
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);

  // AI Telemetry State
  const [aiStatus, setAiStatus] = useState<'idle' | 'analyzing' | 'vectorizing' | 'synthesizing' | 'ready'>('idle');
  const [currentSeedTitle, setCurrentSeedTitle] = useState<string>('Inception');

  const recommendationsRef = useRef<HTMLDivElement>(null);

  // Load initial recommendations on mount so the recommendation section is immediately ready
  useEffect(() => {
    const initApp = async () => {
      try {
        const resHealth = await fetch('/api/health');
        if (resHealth.ok) {
          setIsModelReady(true);
        }

        // Fetch default featured recommendations for Inception
        const resRec = await fetch('/api/recommend?title=Inception&top_n=8&type=balanced');
        if (resRec.ok) {
          const recData = await resRec.json();
          setRecommendationData(recData);
        }
      } catch (err) {
        console.warn('Initial connection warning:', err);
      }
    };
    initApp();
  }, []);

  // Global keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        input?.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  // Perform AI Recommendation Search
  const handleSearch = async (title: string, strategyOverride?: string) => {
    if (!title.trim() || isSearching) return;

    const strat = strategyOverride || currentStrategy;
    setSearchError(null);
    setIsSearching(true);
    setIsAccelerating(true);
    setCurrentSeedTitle(title);

    setAiStatus('analyzing');

    try {
      setTimeout(() => setAiStatus('vectorizing'), 250);
      setTimeout(() => setAiStatus('synthesizing'), 500);

      const res = await fetch(
        `/api/recommend?title=${encodeURIComponent(title)}&top_n=8&type=${encodeURIComponent(strat)}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to calculate recommendations.');
      }

      setRecommendationData(data);
      setAiStatus('ready');
      setActiveSection('recommendations');

      // Subtle celebration sparkle
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#FF2A54', '#7928CA', '#38BDF8'],
        disableForReducedMotion: true
      });

      // Smooth scroll to recommendations
      setTimeout(() => {
        recommendationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);

      setTimeout(() => {
        setAiStatus('idle');
      }, 3500);
    } catch (err: any) {
      console.error('Search error:', err);
      setSearchError(
        err.message || "We couldn't find that movie in the AI corpus. Try searching with another popular title."
      );
      setAiStatus('idle');
    } finally {
      setIsSearching(false);
      setTimeout(() => setIsAccelerating(false), 600);
    }
  };

  // Handle changing ML Recommendation Type
  const handleStrategyChange = (newStrategy: string) => {
    setCurrentStrategy(newStrategy);
    const activeTitle = recommendationData?.source_movie?.title || currentSeedTitle || 'Inception';
    handleSearch(activeTitle, newStrategy);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Initial Cinematic Loading Screen */}
      {isLoadingApp && <LoadingScreen onComplete={() => setIsLoadingApp(false)} />}

      {/* 3D Three.js Interactive Particle Background */}
      <ParticleBackground isAccelerating={isAccelerating} />

      {/* Top Glass Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenSearch={() => {
          const input = document.querySelector('input[type="text"]') as HTMLInputElement;
          input?.focus();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isModelReady={isModelReady}
      />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* 1. Hero Section */}
        <Hero
          onSearch={(title) => handleSearch(title)}
          isLoading={isSearching}
        />

        {/* Search Error Notification Banner (if any) */}
        {searchError && (
          <div
            style={{
              maxWidth: '720px',
              margin: '-40px auto 40px',
              padding: '16px 24px',
              borderRadius: '16px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#FECACA',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backdropFilter: 'blur(16px)',
              animation: 'fadeInScale 0.3s ease',
              zIndex: 20,
              position: 'relative'
            }}
          >
            <AlertCircle size={20} color="#EF4444" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: '0.9rem' }}>
              <strong>Movie Not Found: </strong>
              {searchError}
            </div>
          </div>
        )}

        {/* 2. AI Recommendations Section (Connected with ML Types) */}
        <div ref={recommendationsRef}>
          {recommendationData && (
            <RecommendationSection
              data={recommendationData}
              onSelectMovie={(movie) => setSelectedMovie(movie)}
              onRecommendSimilar={(movie) => handleSearch(movie.title)}
              onStrategyChange={handleStrategyChange}
              currentStrategy={currentStrategy}
            />
          )}
        </div>

        {/* 3. Explore More Universes (Curated Carousels) */}
        <ExploreSection
          onSelectMovie={(movie) => setSelectedMovie(movie)}
          onRecommendSimilar={(movie) => handleSearch(movie.title)}
        />

        {/* 4. How It Works / Model Architecture Section */}
        <ModelArchitecture />

        {/* 5. Technology Specifications Section */}
        <TechStackSection />
      </main>

      {/* Movie Details Modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onGetRecommendations={(title) => {
          setSelectedMovie(null);
          handleSearch(title);
        }}
      />

      {/* Floating Real-Time AI Telemetry Widget */}
      <AIAssistantWidget
        status={aiStatus}
        currentMovie={currentSeedTitle}
        totalCorpus={4806}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
