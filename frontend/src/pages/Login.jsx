import { useState, useEffect, useRef } from 'react';
import { loginUser } from '../api/fraudApi';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) { setError('All fields are required.'); return; }
    setLoading(true);
    setError('');
    try {
      await loginUser({ email, password });
      navigate('/fraud-check');
    } catch {
      setError('⚠ Invalid credentials. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleLogin(); };

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
          <LockIcon />
        </div>

        {/* Title block */}
        <h2 style={{
          fontFamily: 'var(--font-hud)', fontSize: '1rem', fontWeight: 700,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          color: 'var(--neon-green)', textShadow: '0 0 12px var(--neon-green-glow)',
          textAlign: 'center', marginBottom: '0.35rem'
        }}>
          Secure Access
        </h2>
        <p style={{
          fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'rgba(0,255,136,0.35)', textAlign: 'center', marginBottom: '1.75rem'
        }}>
          UPI Fraud Detection System
        </p>

        {/* Status bar */}
        <div className="status-bar" style={{ marginBottom: '1.5rem' }}>
          <div className="status-dot" />
          <span className="status-text">System Online — Authentication Ready</span>
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
              onKeyDown={handleKeyDown}
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
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="pw-toggle"
              type="button"
              onClick={() => setShowPass(v => !v)}
            >
              {showPass ? '🔒' : '👁'}
            </button>
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

        {/* Login button */}
        <button
          className={`cyber-btn pulse ${loading ? 'loading' : ''}`}
          style={{ width: '100%', marginTop: '0.5rem' }}
          onClick={handleLogin}
          disabled={loading}
        >
          <span className="cyber-btn-text">
            {loading ? '[ AUTHENTICATING... ]' : '⬡  Authenticate'}
          </span>
        </button>

        {/* Progress bar */}
        {loading && (
          <div className="progress-bar" style={{ marginTop: '0.75rem' }}>
            <div className="progress-fill" />
          </div>
        )}

        {/* Divider */}
        <div style={{
          height: '1px', margin: '1.5rem 0',
          background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.2), transparent)'
        }} />

        {/* Signup link */}
        <p style={{
          textAlign: 'center', fontSize: '0.7rem',
          color: 'rgba(0,255,136,0.32)', letterSpacing: '1.5px'
        }}>
          No account?{' '}
          <Link to="/signup" style={{
            color: 'var(--neon-green)', textDecoration: 'none',
            textShadow: '0 0 6px rgba(0,255,136,0.45)'
          }}>
            Create Access →
          </Link>
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

/* ── Lock Icon ── */
function LockIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 48 48" fill="none"
      style={{ filter:'drop-shadow(0 0 10px rgba(0,255,136,0.75))', animation:'iconFloat 3s ease-in-out infinite' }}>
      <rect x="9" y="22" width="30" height="22" rx="3"
        stroke="#00ff88" strokeWidth="1.5" fill="rgba(0,255,136,0.05)" />
      <path d="M16 22V16C16 10.477 20.477 6 26 6C31.523 6 36 10.477 36 16V22"
        stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="33" r="3.5"
        fill="rgba(0,255,136,0.15)" stroke="#00ff88" strokeWidth="1.2" />
      <line x1="24" y1="36.5" x2="24" y2="40"
        stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="9" y="22" width="30" height="22" rx="3"
        stroke="#00ff88" strokeWidth=".5" strokeDasharray="3 3" fill="none" opacity=".2" />
    </svg>
  );
}

export default Login;