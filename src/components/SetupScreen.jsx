import { useState, useEffect } from 'react'
import { generateSeed } from '../utils/seededRng.js'
import { getItems } from '../utils/itemStore.js'
import ItemEditor from './ItemEditor.jsx'
import { t, setLanguage, getLanguage, SUPPORTED_LANGUAGES, LANGUAGE_NAMES, LANGUAGE_FLAGS } from '../i18n/index.js'

export default function SetupScreen({ onStart, lastSettings }) {
  const [gridSize, setGridSize]     = useState(lastSettings?.gridSize ?? 5)
  const [freeCenter, setFreeCenter] = useState(lastSettings?.freeCenter ?? true)
  const [winMode, setWinMode]       = useState(lastSettings?.winMode ?? 'line')
  const [seed, setSeed]             = useState(lastSettings?.seed ?? generateSeed())
  const [showEditor, setShowEditor] = useState(false)
  const [poolSize, setPoolSize]     = useState(getItems().length)

  // Computed every render so labels update when language changes
  const GRID_OPTIONS = [
    { value: 4, label: t('gridOption4') },
    { value: 5, label: t('gridOption5') },
    { value: 6, label: t('gridOption6') },
  ]

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
          <span>{t('appTitle')}</span>
          <i className="fa-solid fa-flag" />
        </div>

        {/* Language selector */}
        <div className="lang-selector">
          {SUPPORTED_LANGUAGES.map(lang => (
            <button
              key={lang}
              className={`btn-lang${getLanguage() === lang ? ' active' : ''}`}
              onClick={() => setLanguage(lang)}
              aria-pressed={getLanguage() === lang}
            >
              <span className="lang-flag">{LANGUAGE_FLAGS[lang]}</span> {LANGUAGE_NAMES[lang]}
            </button>
          ))}
        </div>

        <fieldset className="setup-field">
          <legend>{t('boardSizeLegend')}</legend>
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
                  title={disabled ? t('gridDisabledTitle', { needs, pool: poolSize }) : ''}>
                  {opt.label}
                  {disabled && <span className="hint"> ({t('gridNeedMoreIcons')})</span>}
                </button>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="setup-field">
          <legend>{t('freeCenterLegend')}</legend>
          <div className="button-group">
            <button
              className={`btn-option${freeCenter ? ' active' : ''}`}
              onClick={() => setFreeCenter(true)}
            >
              <i className="fa-solid fa-star" /> {t('freeCenterYes')}
            </button>
            <button
              className={`btn-option${!freeCenter ? ' active' : ''}`}
              onClick={() => setFreeCenter(false)}
            >
              <i className="fa-solid fa-xmark" /> {t('freeCenterNo')}
            </button>
          </div>
          {gridSize % 2 === 0 && freeCenter && (
            <p className="hint">{t('freeCenterEvenNote', { size: gridSize })}</p>
          )}
        </fieldset>

        {/* Win mode */}
        <fieldset className="setup-field">
          <legend>{t('winModeLegend')}</legend>
          <div className="button-group">
            <button
              className={`btn-option${winMode === 'line' ? ' active' : ''}`}
              onClick={() => setWinMode('line')}
            >
              <i className="fa-solid fa-grip-lines" /> {t('winModeLine')}
            </button>
            <button
              className={`btn-option${winMode === 'blackout' ? ' active' : ''}`}
              onClick={() => setWinMode('blackout')}
            >
              <i className="fa-solid fa-table-cells" /> {t('winModeBlackout')}
            </button>
          </div>
        </fieldset>

        {/* Seed */}
        <fieldset className="setup-field">
          <legend>{t('seedLegend')} <span className="hint">({t('seedLegendHint')})</span></legend>
          <div className="seed-row">
            <input
              className="seed-input"
              type="text"
              maxLength={8}
              value={seed}
              onChange={e => setSeed(e.target.value.toUpperCase())}
              spellCheck={false}
              aria-label={t('seedAriaLabel')}
            />
            <button className="btn-icon" onClick={handleNewSeed} title={t('seedNewTooltip')}>
              <i className="fa-solid fa-rotate" />
            </button>
          </div>
        </fieldset>

        {/* Pool info + editor */}
        <div className="pool-bar">
          <span>
            <i className="fa-solid fa-icons" /> {t('poolBarInfo', { pool: poolSize, needs: needsItems, size: gridSize })}
          </span>
          <button className="btn-edit-items" onClick={() => setShowEditor(true)}>
            <i className="fa-solid fa-pen-to-square" /> {t('editIconsButton')}
          </button>
        </div>

        <button className="btn-start" onClick={handleStart} disabled={!canStart}>
          <i className="fa-solid fa-play" /> {t('startGameButton')}
        </button>
      </div>
    </div>
  )
}
