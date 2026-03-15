import { useState, useRef, useEffect } from 'react';
import { signupUser } from '../api/fraudApi';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) { setError('All fields are required.'); return; }
    setLoading(true);
    setError('');
    try {
      await signupUser({ name, email, password });
      navigate('/');
    } catch {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cyber-page">
      <BinaryRain />

      <div className="auth-card fade-in">
        <span className="corner c-tl" />
        <span className="corner c-tr" />
        <span className="corner c-bl" />
        <span className="corner c-br" />
        <div className="scan-line" />

        {/* Icon */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:'1.25rem' }}>
          <ShieldIcon />
        </div>

        {/* Title block */}
        <h2 style={{
          fontFamily: 'var(--font-hud)', fontSize: '1rem', fontWeight: 700,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          color: 'var(--neon-green)', textShadow: '0 0 12px var(--neon-green-glow)',
          textAlign: 'center', marginBottom: '0.35rem'
        }}>
          Create Access
        </h2>
        <p style={{
          fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'rgba(0,255,136,0.35)', textAlign: 'center', marginBottom: '1.75rem'
        }}>
          UPI Fraud Detection System
        </p>

        {/* Name */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block', fontSize: '0.63rem', letterSpacing: '2.5px',
            textTransform: 'uppercase', color: 'rgba(0,255,136,0.5)', marginBottom: '0.45rem'
          }}>
            Agent Name
          </label>
          <div className="input-wrap">
            <span className="input-icon">▸</span>
            <input
              className="cyber-input"
              type="text"
              placeholder="Enter your name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block', fontSize: '0.63rem', letterSpacing: '2.5px',
            textTransform: 'uppercase', color: 'rgba(0,255,136,0.5)', marginBottom: '0.45rem'
          }}>
            Email Address
          </label>
          <div className="input-wrap">
            <span className="input-icon">@</span>
            <input
              className="cyber-input"
              type="email"
              placeholder="agent@domain.com"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block', fontSize: '0.63rem', letterSpacing: '2.5px',
            textTransform: 'uppercase', color: 'rgba(0,255,136,0.5)', marginBottom: '0.45rem'
          }}>
            Access Key
          </label>
          <div className="input-wrap">
            <span className="input-icon">⬡</span>
            <input
              className="cyber-input"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{
            color: 'var(--neon-red)', fontSize: '0.7rem', letterSpacing: '1.5px',
            textShadow: '0 0 6px var(--neon-red-glow)', textAlign: 'center',
            marginBottom: '0.75rem'
          }}>
            {error}
          </p>
        )}

        {/* Signup button */}
        <button
          className={`cyber-btn pulse ${loading ? 'loading' : ''}`}
          style={{ width: '100%', marginTop: '0.5rem' }}
          onClick={handleSignup}
          disabled={loading}
        >
          <span className="cyber-btn-text">
            {loading ? '[ INITIALIZING... ]' : '⬡  Initialize Account'}
          </span>
        </button>

        {/* Divider */}
        <div style={{
          height: '1px', margin: '1.5rem 0',
          background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.2), transparent)'
        }} />

        {/* Login link */}
        <p style={{
          textAlign: 'center', fontSize: '0.7rem',
          color: 'rgba(0,255,136,0.32)', letterSpacing: '1.5px'
        }}>
          Already registered?{' '}
          <span
            onClick={() => navigate('/')}
            style={{
              color: 'var(--neon-green)', cursor: 'pointer',
              textShadow: '0 0 6px rgba(0,255,136,0.45)'
            }}
          >
            Access Terminal →
          </span>
        </p>

      </div>
    </div>
  );
}

/* ── Binary Rain ── */
function BinaryRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
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
      position:'fixed', inset:0, zIndex:0, opacity:0.07, pointerEvents:'none'
    }} />
  );
}

/* ── Shield Icon ── */
function ShieldIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 48 48" fill="none"
      style={{ filter:'drop-shadow(0 0 10px rgba(0,255,136,0.7))', animation:'iconFloat 3s ease-in-out infinite' }}>
      <path d="M24 4L6 12V24C6 33.6 14 42.4 24 44C34 42.4 42 33.6 42 24V12L24 4Z"
        stroke="#00ff88" strokeWidth="1.5" fill="rgba(0,255,136,0.06)" />
      <path d="M24 10L10 17V24C10 31.2 16.4 37.9 24 39.5C31.6 37.9 38 31.2 38 24V17L24 10Z"
        stroke="#00ff88" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.4" />
      <path d="M17 24L22 29L31 20"
        stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Signup;