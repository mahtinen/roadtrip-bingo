import { useState } from 'react'

/**
 * Props:
 *   seed    string
 *   onClose () => void
 */
export default function SeedModal({ seed, onClose }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(seed)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: select the text
      const el = document.getElementById('seed-display')
      el?.select?.()
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Pelin koodi">
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Sulje">
          <i className="fa-solid fa-xmark" />
        </button>

        <h2><i className="fa-solid fa-hashtag" /> Pelin koodi</h2>
        <p className="modal-hint">Jaa tämä koodi toiselle laitteelle pelataksesi samalla laudalla.</p>

        <div className="seed-display-row">
          <span id="seed-display" className="seed-big">{seed}</span>
          <button className={`btn-copy${copied ? ' copied' : ''}`} onClick={handleCopy}>
            {copied
              ? <><i className="fa-solid fa-check" /> Kopioitu!</>
              : <><i className="fa-solid fa-copy" /> Kopioi</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
