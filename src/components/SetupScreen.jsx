import { useState, useEffect } from 'react'
import { generateSeed } from '../utils/seededRng.js'
import { getItems } from '../utils/itemStore.js'
import ItemEditor from './ItemEditor.jsx'

const GRID_OPTIONS = [
  { value: 4, label: '4×4  (16 ruutua)' },
  { value: 5, label: '5×5  (25 ruutua)' },
  { value: 6, label: '6×6  (36 ruutua)' },
]

export default function SetupScreen({ onStart, lastSettings }) {
  const [gridSize, setGridSize]     = useState(lastSettings?.gridSize ?? 5)
  const [freeCenter, setFreeCenter] = useState(lastSettings?.freeCenter ?? true)
  const [winMode, setWinMode]       = useState(lastSettings?.winMode ?? 'line')
  const [seed, setSeed]             = useState(lastSettings?.seed ?? generateSeed())
  const [showEditor, setShowEditor] = useState(false)
  const [poolSize, setPoolSize]     = useState(getItems().length)

  // Refresh pool size whenever the ItemEditor closes
  useEffect(() => {
    if (!showEditor) setPoolSize(getItems().length)
  }, [showEditor])

  const needsItems = freeCenter && gridSize % 2 !== 0
    ? gridSize * gridSize - 1
    : gridSize * gridSize

  const canStart = poolSize >= needsItems

  function handleStart() {
    const normSeed = seed.trim().toUpperCase() || generateSeed()
    setSeed(normSeed)
    onStart({ gridSize, freeCenter, winMode, seed: normSeed })
  }

  function handleNewSeed() {
    setSeed(generateSeed())
  }

  if (showEditor) {
    return <ItemEditor onClose={() => setShowEditor(false)} />
  }

  return (
    <div className="setup-screen">
      <div className="setup-card">
        <div className="setup-logo">
          <i className="fa-solid fa-car" />
          <span>Matka-Bingo</span>
          <i className="fa-solid fa-flag" />
        </div>

        {/* Grid size */}
        <fieldset className="setup-field">
          <legend>Laudan koko</legend>
          <div className="button-group">
            {GRID_OPTIONS.map(opt => {
              const needs = freeCenter && opt.value % 2 !== 0
                ? opt.value * opt.value - 1
                : opt.value * opt.value
              const disabled = poolSize < needs
              return (
                <button
                  key={opt.value}
                  className={`btn-option${gridSize === opt.value ? ' active' : ''}${disabled ? ' disabled' : ''}`}
                  onClick={() => !disabled && setGridSize(opt.value)}
                  title={disabled ? `Tarvitaan ${needs} kohdetta, vain ${poolSize} saatavilla` : ''}
                >
                  {opt.label}
                  {disabled && <span className="hint"> (tarvitaan lisää kuvakkeita)</span>}
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* Free center */}
        <fieldset className="setup-field">
          <legend>Vapaa keskiruutu</legend>
          <div className="button-group">
            <button
              className={`btn-option${freeCenter ? ' active' : ''}`}
              onClick={() => setFreeCenter(true)}
            >
              <i className="fa-solid fa-star" /> Kyllä
            </button>
            <button
              className={`btn-option${!freeCenter ? ' active' : ''}`}
              onClick={() => setFreeCenter(false)}
            >
              <i className="fa-solid fa-xmark" /> Ei
            </button>
          </div>
          {gridSize % 2 === 0 && freeCenter && (
            <p className="hint">Vapaa ruutu toimii vain parittomilla ruudukoilla (5×5). Poistettu käytöstä {gridSize}×{gridSize}:lle.</p>
          )}
        </fieldset>

        {/* Win mode */}
        <fieldset className="setup-field">
          <legend>Voittoehto</legend>
          <div className="button-group">
            <button
              className={`btn-option${winMode === 'line' ? ' active' : ''}`}
              onClick={() => setWinMode('line')}
            >
              <i className="fa-solid fa-grip-lines" /> Rivi
            </button>
            <button
              className={`btn-option${winMode === 'blackout' ? ' active' : ''}`}
              onClick={() => setWinMode('blackout')}
            >
              <i className="fa-solid fa-table-cells" /> Täysi lauta
            </button>
          </div>
        </fieldset>

        {/* Seed */}
        <fieldset className="setup-field">
          <legend>Pelin koodi <span className="hint">(jaa kaverille samaa lautaa varten)</span></legend>
          <div className="seed-row">
            <input
              className="seed-input"
              type="text"
              maxLength={8}
              value={seed}
              onChange={e => setSeed(e.target.value.toUpperCase())}
              spellCheck={false}
              aria-label="Pelin koodi"
            />
            <button className="btn-icon" onClick={handleNewSeed} title="Luo uusi koodi">
              <i className="fa-solid fa-rotate" />
            </button>
          </div>
        </fieldset>

        {/* Pool info + editor */}
        <div className="pool-bar">
          <span>
            <i className="fa-solid fa-icons" /> {poolSize} kuvaketta &nbsp;·&nbsp; tarvitaan {needsItems} ({gridSize}×{gridSize})
          </span>
          <button className="btn-edit-items" onClick={() => setShowEditor(true)}>
            <i className="fa-solid fa-pen-to-square" /> Muokkaa kuvakkeita
          </button>
        </div>

        <button className="btn-start" onClick={handleStart} disabled={!canStart}>
          <i className="fa-solid fa-play" /> Aloita peli
        </button>
      </div>
    </div>
  )
}
