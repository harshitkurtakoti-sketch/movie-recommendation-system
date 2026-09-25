import React, { useState } from 'react';
import { Sparkles, Network } from 'lucide-react';

export const ModelArchitecture: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Choose a Movie You Love',
      desc: 'Select any title from our extensive 4,806-movie database. The engine immediately accesses the movie’s multidimensional profile.',
      tag: 'Seed Ingestion'
    },
    {
      num: '02',
      title: 'Model Analyzes Movie Similarities',
      desc: 'Our machine learning model maps story plotlines, director style, key genres, and cast relationships across 5,000 semantic dimensions.',
      tag: 'Vector Space Analysis'
    },
    {
      num: '03',
      title: 'Discover Matches Tailored to Your Taste',
      desc: 'By measuring the mathematical cosine distance between vectors, the engine surfaces the highest resonance movies without subjective bias.',
      tag: 'Cosine Synthesis'
    }
  ];

  const nodes = [
    { id: 0, title: 'Avatar', genre: 'Sci-Fi / Action', score: 'Seed' },
    { id: 1, title: 'Aliens', genre: 'Sci-Fi / Action', score: '88% Match' },
    { id: 2, title: 'Guardians of Galaxy', genre: 'Sci-Fi / Adventure', score: '87% Match' },
    { id: 3, title: 'Star Trek Darkness', genre: 'Sci-Fi / Action', score: '87% Match' }
  ];

  return (
    <section
      id="model"
      style={{
        position: 'relative',
        padding: '80px 40px 100px',
        maxWidth: '1360px',
        margin: '0 auto',
        zIndex: 10
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(121, 40, 202, 0.12)',
            border: '1px solid rgba(121, 40, 202, 0.3)',
            borderRadius: '999px',
            padding: '5px 14px',
            color: '#C084FC',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}
        >
          <Network size={13} />
          Intelligence Architecture
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.15
          }}
        >
          How Your Recommendations Are Built
        </h2>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1.05rem',
            maxWidth: '640px',
            margin: '12px auto 0'
          }}
        >
          Demystifying the high-dimensional mathematical engine powering your personalized movie discovery.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '56px'
        }}
      >
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className="glass-panel"
            style={{
              padding: '36px 30px',
              borderRadius: '24px',
              background: 'rgba(15, 15, 23, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: idx === 0 ? '#FF2A54' : idx === 1 ? '#7928CA' : '#00F2FE',
                    opacity: 0.85
                  }}
                >
                  {step.num}
                </span>

                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-faint)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}
                >
                  {step.tag}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  lineHeight: 1.25
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6
                }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="glass-panel"
        style={{
          padding: '36px',
          borderRadius: '24px',
          background: 'linear-gradient(145deg, rgba(20, 20, 32, 0.7) 0%, rgba(10, 10, 16, 0.9) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#38BDF8' }}>
              High-Dimensional Vector Proximity
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
              Semantic Resonance Map
            </h4>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Hover or click nodes to inspect cosine vector affinity
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}
        >
          {nodes.map((node, i) => {
            const isSeed = i === 0;
            const isSelected = activeNode === i;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(i)}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: isSeed
                    ? 'rgba(255, 42, 84, 0.12)'
                    : isSelected
                    ? 'rgba(121, 40, 202, 0.2)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isSeed
                    ? '1px solid #FF2A54'
                    : isSelected
                    ? '1px solid #7928CA'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: isSeed ? '#FF2A54' : '#38BDF8',
                      textTransform: 'uppercase'
                    }}
                  >
                    {isSeed ? 'Seed Movie' : node.score}
                  </span>
                  <Sparkles size={12} color={isSeed ? '#FF2A54' : '#C084FC'} />
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {node.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {node.genre}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
