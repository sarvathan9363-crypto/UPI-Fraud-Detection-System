import { useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700&display=swap');

  .result-card {
    position: relative;
    width: 100%;
    max-width: 480px;
    background: rgba(10, 20, 10, 0.85);
    border-radius: 12px;
    padding: 2rem 2.5rem;
    text-align: center;
    overflow: hidden;
    font-family: 'Share Tech Mono', monospace;
    transition: box-shadow 0.4s ease;
  }

  .result-card.safe {
    border: 1.5px solid #00ff88;
    box-shadow: 0 0 18px rgba(0,255,136,0.35), inset 0 0 30px rgba(0,255,136,0.05);
    animation: safeGlow 2.5s ease-in-out infinite alternate;
  }

  .result-card.fraud {
    border: 1.5px solid #ff2244;
    box-shadow: 0 0 18px rgba(255,34,68,0.4), inset 0 0 30px rgba(255,34,68,0.07);
    animation: fraudGlow 1.8s ease-in-out infinite alternate;
  }

  @keyframes safeGlow {
    from { box-shadow: 0 0 12px rgba(0,255,136,0.25); }
    to   { box-shadow: 0 0 30px rgba(0,255,136,0.55); }
  }

  @keyframes fraudGlow {
    from { box-shadow: 0 0 12px rgba(255,34,68,0.3); }
    to   { box-shadow: 0 0 30px rgba(255,34,68,0.65); }
  }

  .scan-line {
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 2px;
    animation: scanMove 2.5s linear infinite;
  }

  .safe .scan-line  { background: linear-gradient(90deg, transparent, #00ff88, transparent); }
  .fraud .scan-line { background: linear-gradient(90deg, transparent, #ff2244, transparent); }

  @keyframes scanMove {
    0%   { top: -5%; opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 105%; opacity: 0; }
  }

  .result-icon {
    font-size: 42px;
    margin-bottom: 0.6rem;
    animation: iconPulse 2s ease-in-out infinite;
  }

  @keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.1); }
  }

  .safe  .result-icon { color: #00ff88; filter: drop-shadow(0 0 8px #00ff88); }
  .fraud .result-icon { color: #ff2244; filter: drop-shadow(0 0 8px #ff2244); }

  .result-label {
    font-family: 'Orbitron', monospace;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
  }

  .safe  .result-label { color: #00ff88; text-shadow: 0 0 12px #00ff88; }
  .fraud .result-label { color: #ff2244; text-shadow: 0 0 12px #ff2244; }

  .result-sublabel {
    font-size: 0.75rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.5;
    color: #aaa;
  }

  .result-divider {
    width: 60%;
    height: 1px;
    margin: 1rem auto;
    opacity: 0.3;
  }

  .safe  .result-divider { background: #00ff88; }
  .fraud .result-divider { background: #ff2244; }

  .result-detail {
    font-size: 0.72rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .safe  .result-detail { color: rgba(0,255,136,0.5); }
  .fraud .result-detail { color: rgba(255,34,68,0.5); }

  .corner {
    position: absolute;
    width: 10px;
    height: 10px;
    border-style: solid;
    opacity: 0.6;
  }
  .corner-tl { top: 6px; left: 6px;   border-width: 1.5px 0 0 1.5px; }
  .corner-tr { top: 6px; right: 6px;  border-width: 1.5px 1.5px 0 0; }
  .corner-bl { bottom: 6px; left: 6px;  border-width: 0 0 1.5px 1.5px; }
  .corner-br { bottom: 6px; right: 6px; border-width: 0 1.5px 1.5px 0; }

  .safe  .corner { border-color: #00ff88; }
  .fraud .corner { border-color: #ff2244; }
`;

function ResultCard({ result }) {
  const isFraud = result?.toLowerCase().includes("fraud");
  const type    = isFraud ? "fraud" : "safe";

  return (
    <>
      <style>{styles}</style>
      <div className={`result-card ${type}`}>
        <div className="scan-line" />
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        <div className="result-icon">{isFraud ? "✖" : "✔"}</div>
        <div className="result-label">
          {isFraud ? "Fraud Detected" : "Safe Transaction"}
        </div>
        <div className="result-sublabel">UPI Fraud Detection System</div>
        <div className="result-divider" />
        <div className="result-detail">
          {isFraud
            ? "Suspicious pattern found · Flagged for review"
            : "No anomalies detected · Risk level: low"}
        </div>
      </div>
    </>
  );
}

export default ResultCard;