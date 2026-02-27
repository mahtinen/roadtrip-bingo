/**
 * Full-screen win overlay.
 * Props:
 *   winMode     'line' | 'blackout'
 *   onNewGame   () => void
 */
export default function WinBanner({ winMode, onNewGame }) {
  return (
    <div className="win-overlay" role="dialog" aria-modal="true" aria-label="Voitit!">
      <div className="win-card">
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="confetti-piece" style={{ '--i': i }} />
          ))}
        </div>

        <div className="win-icon">
          <i className="fa-solid fa-trophy" />
        </div>

        <h1 className="win-title">BINGO!</h1>

        <p className="win-sub">
          {winMode === 'blackout'
            ? 'Täysi lauta — mahtavaa!'
            : 'Sait rivin täyteen!'}
        </p>

        <button className="btn-start" onClick={onNewGame}>
          <i className="fa-solid fa-rotate-right" /> Uusi peli
        </button>
      </div>
    </div>
  )
}
