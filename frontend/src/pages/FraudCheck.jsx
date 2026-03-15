import { useState } from 'react';
import { checkFraud } from '../api/fraudApi';
import ResultCard from '../components/ResultCard';

const FIELDS = [
  { key: 'trans_hour',  label: 'Transaction Hour',   icon: '⏱', placeholder: '0 – 23',          type: 'number' },
  { key: 'trans_day',   label: 'Transaction Day',    icon: '📅', placeholder: '1 – 31',          type: 'number' },
  { key: 'trans_month', label: 'Transaction Month',  icon: '🗓', placeholder: '1 – 12',          type: 'number' },
  { key: 'trans_year',  label: 'Transaction Year',   icon: '📆', placeholder: 'e.g. 2024',       type: 'number' },
  { key: 'category',    label: 'Category Code',      icon: '🏷', placeholder: 'e.g. 3',          type: 'number' },
  { key: 'upi_number',  label: 'UPI Number',         icon: '💳', placeholder: 'e.g. 9876543210', type: 'number' },
  { key: 'trans_amt',   label: 'Transaction Amount', icon: '₹',  placeholder: 'Amount in ₹',     type: 'number' },
  { key: 'state_code',  label: 'State Code',         icon: '📍', placeholder: 'e.g. 27',         type: 'number' },
  { key: 'zip',         label: 'ZIP Code',           icon: '🗺', placeholder: 'e.g. 400001',     type: 'number' },
];

const INITIAL_FORM = Object.fromEntries(FIELDS.map(f => [f.key, '']));

/* ── Shared inline style tokens ── */
const S = {
  fieldLabel: {
    display: 'block',
    fontSize: '0.62rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'rgba(0,255,136,0.5)',
    marginBottom: '0.4rem',
  },
  sectionGap:  { marginBottom: '1.25rem' },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '0.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(0,255,136,0.08)',
  },
  panelSub: {
    fontSize: '0.67rem',
    letterSpacing: '1.5px',
    color: 'rgba(0,255,136,0.32)',
    textTransform: 'uppercase',
    marginBottom: '1.4rem',
    marginTop: '0.35rem',
  },
};

function FraudCheck() {
  const [form,    setForm]    = useState(INITIAL_FORM);
  const [result,  setResult]  = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [scanned, setScanned] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value === '' ? '' : Number(e.target.value),
    }));
  };

  const handleCheck = async () => {
    const empty = FIELDS.filter(f => form[f.key] === '');
    if (empty.length > 0) {
      setError(`⚠ Missing: ${empty.map(f => f.label).join(', ')}`);
      return;
    }
    setError('');
    setLoading(true);
    setScanned(false);
    setResult('');
    try {
      const res = await checkFraud(form);
      setResult(res.prediction);
      setScanned(true);
    } catch {
      setError('⚠ Scan failed. Check server connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setResult('');
    setError('');
    setScanned(false);
  };

  const isFraud = result?.toLowerCase().includes('fraud');

  return (
    <div className="fraud-page" style={{ padding: '1.5rem', gap: '1.5rem' }}>

      {/* ════════════════════════════════
          LEFT PANEL — Input form
      ════════════════════════════════ */}
      <div className="fraud-panel panel-left fade-in" style={{ padding: '1.5rem' }}>

        {/* Header */}
        <div style={S.panelHeader}>
          <div style={{ display:'flex', gap:'5px', alignItems:'center' }}>
            {[0, 0.3, 0.6].map(d => (
              <span key={d} className="panel-dot" style={{ animationDelay:`${d}s` }} />
            ))}
          </div>
          <h2 className="panel-title" style={{ margin: 0, flex: 1 }}>
            Transaction Scanner
          </h2>
          <span className="panel-badge">LIVE</span>
        </div>

        <p style={S.panelSub}>
          Enter transaction parameters to initiate fraud analysis
        </p>

        {/* Input grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}>
          {FIELDS.map(({ key, label, icon, placeholder, type }, idx) => (
            <div
              key={key}
              className="fade-in"
              style={{ animationDelay:`${idx * 0.05}s`, opacity: 0 }}
            >
              {/* Field label */}
              <label style={S.fieldLabel}>
                <span style={{ marginRight:'5px', fontSize:'11px' }}>{icon}</span>
                {label}
              </label>
              {/* Input */}
              <input
                name={key}
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={handleChange}
                autoComplete="off"
                style={{
                  width: '100%',
                  background: 'rgba(0,255,136,0.04)',
                  border: '1px solid rgba(0,255,136,0.18)',
                  borderRadius: '6px',
                  color: '#e0ffe0',
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.82rem',
                  padding: '0.6rem 0.85rem',
                  outline: 'none',
                  letterSpacing: '1px',
                  transition: 'border-color .25s, box-shadow .25s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#00ff88';
                  e.target.style.boxShadow   = '0 0 0 3px rgba(0,255,136,0.1)';
                  e.target.style.background  = 'rgba(0,255,136,0.07)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(0,255,136,0.18)';
                  e.target.style.boxShadow   = 'none';
                  e.target.style.background  = 'rgba(0,255,136,0.04)';
                }}
              />
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p style={{
            color: '#ff2244', fontSize: '0.7rem', letterSpacing: '1.5px',
            textShadow: '0 0 6px rgba(255,34,68,0.5)', marginBottom: '1rem',
            textAlign: 'center',
          }}>
            {error}
          </p>
        )}

        {/* Action buttons */}
        <div style={{ display:'flex', gap:'0.75rem', alignItems:'center', marginTop: '0.25rem' }}>
          <button
            className={`cyber-btn pulse ${loading ? 'loading' : ''}`}
            style={{ flex: 1 }}
            onClick={handleCheck}
            disabled={loading}
          >
            <span style={{ position:'relative', zIndex:1 }}>
              {loading ? '[ SCANNING... ]' : '⬡  Initiate Fraud Scan'}
            </span>
          </button>

          <button
            onClick={handleReset}
            disabled={loading}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '0.7rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '0.75rem 1.1rem',
              borderRadius: '6px',
              border: '1px solid rgba(0,255,136,0.25)',
              background: 'transparent',
              color: 'rgba(0,255,136,0.5)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all .25s',
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = 'rgba(0,255,136,0.6)';
              e.target.style.color       = '#00ff88';
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = 'rgba(0,255,136,0.25)';
              e.target.style.color       = 'rgba(0,255,136,0.5)';
            }}
          >
            ↺ Reset
          </button>
        </div>

        {/* Progress bar */}
        {loading && (
          <div style={{
            width:'100%', height:'2px', background:'rgba(0,255,136,0.08)',
            borderRadius:'1px', overflow:'hidden', marginTop:'0.85rem',
          }}>
            <div className="progress-fill" style={{ height:'100%' }} />
          </div>
        )}
      </div>

      {/* ════════════════════════════════
          RIGHT PANEL — Monitor + Result
      ════════════════════════════════ */}
      <div
        className="fraud-panel panel-right fade-in"
        style={{ padding: '1.5rem', animationDelay: '.15s' }}
      >

        {/* Shield monitor box */}
        <div style={{
          border: '1px solid rgba(0,255,136,0.14)',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '1.25rem',
          background: 'rgba(0,255,136,0.02)',
        }}>
          {/* Monitor header */}
          <div style={{
            display:'flex', justifyContent:'space-between',
            alignItems:'center', marginBottom:'0.85rem',
          }}>
            <span style={S.fieldLabel}>⬡ &nbsp;Security Monitor</span>
            <span style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '0.58rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '3px 8px',
              borderRadius: '3px',
              ...(scanned
                ? isFraud
                  ? { color:'#ff2244', background:'rgba(255,34,68,0.07)', border:'1px solid rgba(255,34,68,0.3)' }
                  : { color:'#00ff88', background:'rgba(0,255,136,0.07)', border:'1px solid rgba(0,255,136,0.3)' }
                : { color:'rgba(0,207,255,0.6)', background:'rgba(0,207,255,0.07)', border:'1px solid rgba(0,207,255,0.2)' }
              ),
            }}>
              {scanned ? (isFraud ? '● THREAT DETECTED' : '● SYSTEM CLEAR') : '● IDLE'}
            </span>
          </div>

          {/* Shield icon */}
          <div style={{ display:'flex', justifyContent:'center', padding:'0.75rem 0' }}>
            <ShieldMonitor
              state={loading ? 'scanning' : scanned ? (isFraud ? 'fraud' : 'safe') : 'idle'}
            />
          </div>
        </div>

        {/* Result card */}
        {scanned ? (
          <div className="fade-in" style={{ marginBottom:'1.25rem', display:'flex', justifyContent:'center' }}>
            <ResultCard result={result} />
          </div>
        ) : (
          <div style={{ padding:'1.5rem 0', textAlign:'center', opacity:0.45, marginBottom:'1.25rem' }}>
            <p style={{
              fontSize:'.72rem', letterSpacing:'2px',
              textTransform:'uppercase', color:'rgba(0,255,136,0.4)',
            }}>
              Awaiting transaction data…
            </p>
          </div>
        )}

        {/* Stats strip */}
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(4,1fr)',
          gap:'0.5rem', marginBottom:'1.25rem',
        }}>
          {[
            { label:'Model',    value:'XGBoost v2' },
            { label:'Accuracy', value:'97.4%'      },
            { label:'Latency',  value:'~120ms'     },
            { label:'Status',   value:'ACTIVE'     },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background:'rgba(0,255,136,0.03)',
              border:'1px solid rgba(0,255,136,0.1)',
              borderRadius:'6px',
              padding:'0.5rem 0.35rem',
              textAlign:'center',
            }}>
              <span style={{
                display:'block', fontSize:'.55rem', letterSpacing:'1.5px',
                color:'rgba(0,255,136,0.35)', textTransform:'uppercase', marginBottom:'4px',
              }}>
                {label}
              </span>
              <span style={{
                display:'block', fontFamily:"'Orbitron',monospace",
                fontSize:'.65rem', color:'#00ff88',
                textShadow:'0 0 6px rgba(0,255,136,0.4)',
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Graph panel */}
        <div style={{
          border:'1px solid rgba(0,255,136,0.12)',
          borderRadius:'8px',
          padding:'0.9rem',
          background:'rgba(0,255,136,0.02)',
        }}>
          <span style={{ ...S.fieldLabel, display:'block', marginBottom:'0.65rem' }}>
            ⬡ &nbsp;Fraud Signal Activity
          </span>
          <FraudGraph active={loading} triggered={scanned && isFraud} />
        </div>

      </div>
    </div>
  );
}

/* ── Animated Shield ── */
function ShieldMonitor({ state }) {
  const colors = {
    idle:     { stroke:'#00cfff', glow:'rgba(0,207,255,0.5)',  fill:'rgba(0,207,255,0.05)' },
    scanning: { stroke:'#f0c040', glow:'rgba(240,192,64,0.5)', fill:'rgba(240,192,64,0.05)' },
    safe:     { stroke:'#00ff88', glow:'rgba(0,255,136,0.6)',  fill:'rgba(0,255,136,0.07)' },
    fraud:    { stroke:'#ff2244', glow:'rgba(255,34,68,0.6)',  fill:'rgba(255,34,68,0.07)'  },
  };
  const c = colors[state] || colors.idle;

  return (
    <svg width="110" height="120" viewBox="0 0 48 54" fill="none"
      style={{
        filter:`drop-shadow(0 0 14px ${c.glow})`,
        animation: state === 'scanning'
          ? 'iconFloat .6s ease-in-out infinite alternate'
          : 'iconFloat 3s ease-in-out infinite',
        transition:'filter .5s',
      }}
    >
      <path d="M24 2L4 10V24C4 35.2 13 44.8 24 47C35 44.8 44 35.2 44 24V10L24 2Z"
        stroke={c.stroke} strokeWidth="1.5" fill={c.fill} />
      <path d="M24 7L8 14V24C8 33 15.6 41 24 43C32.4 41 40 33 40 24V14L24 7Z"
        stroke={c.stroke} strokeWidth=".7" strokeDasharray="3 2" fill="none" opacity=".35" />
      {state === 'fraud' ? (
        <path d="M17 17L31 31M31 17L17 31"
          stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" />
      ) : state === 'scanning' ? (
        <path d="M14 24H34M24 14V34"
          stroke={c.stroke} strokeWidth="1.5" strokeLinecap="round" opacity=".7"
          style={{ animation:'scanCross 1s ease-in-out infinite alternate' }} />
      ) : (
        <path d="M15 24L21 30L33 18"
          stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

/* ── Mini Fraud Graph ── */
function FraudGraph({ active, triggered }) {
  const bars  = [18, 32, 14, 45, 22, 38, 12, 55, 28, 20, 42, 16];
  const color = triggered ? '#ff2244' : '#00ff88';
  const glow  = triggered ? 'rgba(255,34,68,0.4)' : 'rgba(0,255,136,0.4)';

  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:'4px', height:'50px' }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          flex: 1,
          height: `${active ? Math.random() * 55 + 10 : h}%`,
          background: color,
          borderRadius: '2px 2px 0 0',
          opacity: 0.65,
          boxShadow: `0 0 5px ${glow}`,
          transition: 'height .4s ease, background .5s',
        }} />
      ))}
    </div>
  );
}

export default FraudCheck;