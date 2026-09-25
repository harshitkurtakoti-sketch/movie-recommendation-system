import React, { useState, useEffect } from 'react';
import { Brain, ChevronUp, ChevronDown } from 'lucide-react';

interface AIAssistantWidgetProps {
  status: 'idle' | 'analyzing' | 'vectorizing' | 'synthesizing' | 'ready';
  currentMovie?: string;
  totalCorpus?: number;
}

const STATUS_MESSAGES: Record<string, string> = {
  idle: 'Engine Standing By',
  analyzing: 'Understanding your taste...',
  vectorizing: 'Analyzing movie similarity vectors...',
  synthesizing: 'Building your recommendations...',
  ready: 'Recommendations Synthesized'
};

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  status,
  currentMovie,
  totalCorpus = 4806
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progressStep, setProgressStep] = useState(0);

  useEffect(() => {
    if (status === 'analyzing') {
      setProgressStep(1);
    } else if (status === 'vectorizing') {
      setProgressStep(2);
    } else if (status === 'synthesizing') {
      setProgressStep(3);
    } else if (status === 'ready') {
      setProgressStep(4);
    } else {
      setProgressStep(0);
    }
  }, [status]);

  const isBusy = status !== 'idle' && status !== 'ready';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 45,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px'
      }}
    >
      {/* Expanded Intelligence Panel */}
      {isExpanded && (
        <div
          className="glass-panel"
          style={{
            width: '320px',
            padding: '20px',
            borderRadius: '20px',
            background: 'rgba(10, 10, 16, 0.94)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 42, 84, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 42, 84, 0.15)',
            marginBottom: '8px',
            animation: 'fadeInScale 0.2s ease-out'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Brain size={16} color="#FF2A54" />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
                Neural Engine Telemetry
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#10B981',
                background: 'rgba(16, 185, 129, 0.15)',
                padding: '2px 6px',
                borderRadius: '4px'
              }}
            >
              ACTIVE
            </span>
          </div>

          <div style={{ margin: '14px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Corpus Database:</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{totalCorpus.toLocaleString()} Movies</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Vector Space:</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>5,000 Dimensions</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Distance Metric:</span>
              <span style={{ color: '#38BDF8', fontWeight: 600 }}>Cosine Similarity</span>
            </div>

            {currentMovie && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Seed:</span>
                <span style={{ color: '#FF2A54', fontWeight: 600, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentMovie}
                </span>
              </div>
            )}
          </div>

          {/* Stepper Visualization */}
          <div
            style={{
              paddingTop: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Inference Pipeline
            </div>
            <div style={{ display: 'flex', gap: '4px', height: '4px' }}>
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  style={{
                    flex: 1,
                    height: '100%',
                    borderRadius: '2px',
                    background: progressStep >= step ? '#FF2A54' : 'rgba(255, 255, 255, 0.1)',
                    transition: 'background 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px',
          borderRadius: '999px',
          background: isBusy
            ? 'linear-gradient(135deg, rgba(255, 42, 84, 0.25), rgba(121, 40, 202, 0.25))'
            : 'rgba(10, 10, 16, 0.85)',
          backdropFilter: 'blur(20px)',
          border: isBusy ? '1px solid rgba(255, 42, 84, 0.6)' : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isBusy
            ? '0 0 25px rgba(255, 42, 84, 0.4), 0 8px 24px rgba(0,0,0,0.6)'
            : '0 8px 24px rgba(0, 0, 0, 0.6)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ position: 'relative', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '50%',
              border: '2px dashed #FF2A54',
              animation: isBusy ? 'orbitalRotate 1.5s linear infinite' : 'none',
              opacity: isBusy ? 1 : 0.4
            }}
          />
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isBusy ? '#FF2A54' : '#10B981',
              boxShadow: isBusy ? '0 0 8px #FF2A54' : '0 0 8px #10B981'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>
            Movie AI
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              color: isBusy ? '#FF4D73' : 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {STATUS_MESSAGES[status]}
          </span>
        </div>

        {isExpanded ? (
          <ChevronDown size={15} color="var(--text-muted)" />
        ) : (
          <ChevronUp size={15} color="var(--text-muted)" />
        )}
      </button>
    </div>
  );
};
