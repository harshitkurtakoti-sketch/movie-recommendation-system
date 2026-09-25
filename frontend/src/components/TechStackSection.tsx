import React from 'react';
import { Cpu, Database, Binary, Code2, LineChart } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const techCards = [
    {
      icon: <Binary size={24} color="#FF2A54" />,
      title: 'Machine Learning',
      subtitle: 'CountVectorizer & Porter Stemming',
      description: 'Transforms textual tags, character metadata, keywords, and directorial credits into 5,000 dense vocabulary frequency vectors.'
    },
    {
      icon: <LineChart size={24} color="#7928CA" />,
      title: 'Content-Based Filtering',
      subtitle: 'Cosine Distance Mathematics',
      description: 'Calculates the angular cosine similarity between high-dimensional vectors, measuring intrinsic conceptual affinity.'
    },
    {
      icon: <Cpu size={24} color="#38BDF8" />,
      title: 'Sub-5ms Inference',
      subtitle: 'In-Memory Matrix Lookups',
      description: 'Pre-computed similarity matrix of 4,806 × 4,806 dimensions enables instantaneous real-time querying without GPU overhead.'
    },
    {
      icon: <Database size={24} color="#10B981" />,
      title: 'TMDB 5000 Corpus',
      subtitle: 'Enriched Cinematic Metadata',
      description: 'Comprehensive dataset of 4,806 films with cast rosters, directors, financial revenues, budgets, and verified audience ratings.'
    }
  ];

  return (
    <section
      id="tech"
      style={{
        position: 'relative',
        padding: '80px 40px 120px',
        maxWidth: '1360px',
        margin: '0 auto',
        zIndex: 10
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '999px',
            padding: '5px 14px',
            color: '#38BDF8',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}
        >
          <Code2 size={13} />
          Engine Specifications
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: '#FFFFFF'
          }}
        >
          Engineered for Pure Performance
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '12px auto 0' }}>
          Built with an enterprise Python REST API layer and ultra-low latency inference.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}
      >
        {techCards.map((card) => (
          <div
            key={card.title}
            className="glass-panel"
            style={{
              padding: '32px 28px',
              borderRadius: '20px',
              background: 'rgba(15, 15, 23, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              transition: 'all 0.3s ease'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {card.icon}
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                {card.title}
              </h3>
              <div
                style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#FF2A54',
                  fontWeight: 600,
                  marginBottom: '10px'
                }}
              >
                {card.subtitle}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
