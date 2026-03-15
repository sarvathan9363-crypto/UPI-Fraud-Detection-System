import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <BinaryRain />

      {/* Glowing orb behind title */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Shield icon */}
      <div style={{
        marginBottom: '1.75rem',
        animation: 'iconFloat 3s ease-in-out infinite',
        position: 'relative',
        zIndex: 1,
      }}>
        <svg width="72" height="72" viewBox="0 0 48 48" fill="none"
          style={{ filter: 'drop-shadow(0 0 16px rgba(0,255,136,0.8))' }}>
          <path d="M24 4L6 12V24C6 33.6 14 42.4 24 44C34 42.4 42 33.6 42 24V12L24 4Z"
            stroke="#00ff88" strokeWidth="1.5" fill="rgba(0,255,136,0.07)" />
          <path d="M24 10L10 17V24C10 31.2 16.4 37.9 24 39.5C31.6 37.9 38 31.2 38 24V17L24 10Z"
            stroke="#00ff88" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.4" />
          <path d="M17 24L22 29L31 20"
            stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Eyebrow tag */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '1rem',
        padding: '0.35rem 1rem',
        border: '1px solid rgba(0,255,136,0.2)',
        borderRadius: '4px',
        background: 'rgba(0,255,136,0.04)',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: '#00ff88',
          boxShadow: '0 0 6px #00ff88',
          animation: 'dotBlink 1.8s ease-in-out infinite',
          display: 'inline-block',
        }} />
        <span style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: '0.6rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(0,255,136,0.55)',
        }}>
          System Online — AI Monitoring Active
        </span>
      </div>

      {/* Main title */}
      <h1 style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: 'clamp(1.4rem, 4vw, 2.6rem)',
        fontWeight: 700,
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: '#00ff88',
        textShadow: '0 0 20px rgba(0,255,136,0.6), 0 0 60px rgba(0,255,136,0.2)',
        textAlign: 'center',
        marginBottom: '0.85rem',
        lineHeight: 1.2,
        position: 'relative',
        zIndex: 1,
      }}>
        UPI Fraud Detection System
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.82rem',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color: 'rgba(0,255,136,0.4)',
        textAlign: 'center',
        marginBottom: '0.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        Secure AI-based fraud monitoring platform
      </p>
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.72rem',
        letterSpacing: '1.5px',
        color: 'rgba(0,255,136,0.25)',
        textAlign: 'center',
        marginBottom: '2.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        Powered by XGBoost · Real-time UPI transaction analysis
      </p>

      {/* Divider */}
      <div style={{
        width: '280px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)',
        marginBottom: '2.5rem',
        position: 'relative',
        zIndex: 1,
      }} />

      {/* CTA Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <CyberButton
          primary
          onClick={() => navigate('/login')}
          label="⬡  Access Terminal"
        />
        <CyberButton
          onClick={() => navigate('/signup')}
          label="◈  Create Account"
        />
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        marginTop: '3rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {[
          { value: '97.4%',  label: 'Model Accuracy'   },
          { value: '~120ms', label: 'Scan Latency'      },
          { value: '24 / 7', label: 'Live Monitoring'   },
          { value: 'AES-256',label: 'Encryption'        },
        ].map(({ value, label }) => (
          <div key={label} style={{
            textAlign: 'center',
            padding: '0.75rem 1.25rem',
            border: '1px solid rgba(0,255,136,0.1)',
            borderRadius: '8px',
            background: 'rgba(0,255,136,0.03)',
            minWidth: '100px',
          }}>
            <span style={{
              display: 'block',
              fontFamily: "'Orbitron', monospace",
              fontSize: '1rem',
              fontWeight: 700,
              color: '#00ff88',
              textShadow: '0 0 10px rgba(0,255,136,0.5)',
              marginBottom: '0.35rem',
            }}>
              {value}
            </span>
            <span style={{
              display: 'block',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(0,255,136,0.35)',
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Corner brackets on the whole page */}
      {['tl','tr','bl','br'].map(pos => (
        <span key={pos} style={{
          position: 'fixed',
          width: '20px', height: '20px',
          borderColor: 'rgba(0,255,136,0.3)',
          borderStyle: 'solid',
          ...(pos === 'tl' ? { top:'16px', left:'16px',  borderWidth:'1.5px 0 0 1.5px' } :
              pos === 'tr' ? { top:'16px', right:'16px', borderWidth:'1.5px 1.5px 0 0' } :
              pos === 'bl' ? { bottom:'16px', left:'16px',  borderWidth:'0 0 1.5px 1.5px' } :
                             { bottom:'16px', right:'16px', borderWidth:'0 1.5px 1.5px 0' }),
        }} />
      ))}
    </div>
  );
}

/* ── Cyber Button ── */
function CyberButton({ label, onClick, primary = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        padding: '0.85rem 2rem',
        borderRadius: '6px',
        border: `1px solid ${primary ? '#00ff88' : 'rgba(0,255,136,0.35)'}`,
        background: primary ? 'rgba(0,255,136,0.08)' : 'transparent',
        color: primary ? '#00ff88' : 'rgba(0,255,136,0.6)',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: primary ? '0 0 18px rgba(0,255,136,0.2)' : 'none',
        animation: primary ? 'cyberPulse 2.5s ease-in-out infinite' : 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background  = '#00ff88';
        e.currentTarget.style.color       = '#000';
        e.currentTarget.style.boxShadow   = '0 0 28px rgba(0,255,136,0.6)';
        e.currentTarget.style.borderColor = '#00ff88';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background  = primary ? 'rgba(0,255,136,0.08)' : 'transparent';
        e.currentTarget.style.color       = primary ? '#00ff88' : 'rgba(0,255,136,0.6)';
        e.currentTarget.style.boxShadow   = primary ? '0 0 18px rgba(0,255,136,0.2)' : 'none';
        e.currentTarget.style.borderColor = primary ? '#00ff88' : 'rgba(0,255,136,0.35)';
      }}
    >
      {label}
    </button>
  );
}

/* ── Binary Rain ── */
function BinaryRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols  = Math.floor(canvas.width / 18);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(5,10,5,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff88';
      ctx.font = '12px Share Tech Mono, monospace';
      drops.forEach((y, i) => {
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * 18, y * 18);
        if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const id = setInterval(draw, 80);
    return () => clearInterval(id);
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0,
      opacity: 0.07, pointerEvents: 'none', zIndex: 0,
    }} />
  );
}

export default Home;