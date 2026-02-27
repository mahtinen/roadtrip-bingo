import { t } from '../i18n/index.js'

/**
 * Full-screen win overlay.
 * Props:
 *   winMode     'line' | 'blackout'
 *   onNewGame   () => void
 */
export default function WinBanner({ winMode, onNewGame }) {
  return (
    <div className="win-overlay" role="dialog" aria-modal="true" aria-label={t('winAriaLabel')}>
      <div className="win-card">
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="confetti-piece" style={{ '--i': i }} />
          ))}
        </div>

        <div className="win-icon">
          <i className="fa-solid fa-trophy" />
        </div>

        <h1 className="win-title">{t('winTitle')}</h1>

        <p className="win-sub">
          {winMode === 'blackout' ? t('winSubBlackout') : t('winSubLine')}
        </p>

        <button className="btn-start" onClick={onNewGame}>
          <i className="fa-solid fa-rotate-right" /> {t('newGameButton')}
        </button>
      </div>
    </div>
  )
}
