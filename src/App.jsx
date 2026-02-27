import { useState, useCallback, useEffect } from 'react'
import SetupScreen from './components/SetupScreen.jsx'
import BingoBoard from './components/BingoBoard.jsx'
import WinBanner from './components/WinBanner.jsx'
import SeedModal from './components/SeedModal.jsx'
import { generateBoard } from './utils/boardGenerator.js'
import { getItems } from './utils/itemStore.js'
import { t } from './i18n/index.js'

const GAME_STATE_KEY = 'bingo_game_state'

function loadSavedState() {
  try {
    const raw = localStorage.getItem(GAME_STATE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveGameState(state) {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state))
  } catch { /* ignore quota errors */ }
}

function clearGameState() {
  localStorage.removeItem(GAME_STATE_KEY)
}

export default function App() {
  const [view, setView] = useState(() => {
    const saved = loadSavedState()
    return saved ? 'playing' : 'setup'
  })

  const [settings, setSettings] = useState(() => {
    const saved = loadSavedState()
    return saved?.settings ?? null
  })

  const [grid, setGrid] = useState(() => {
    const saved = loadSavedState()
    return saved?.grid ?? null
  })

  const [marked, setMarkedState] = useState(() => {
    const saved = loadSavedState()
    return saved?.marked ?? null
  })

  const [won, setWon] = useState(false)
  const [showSeed, setShowSeed] = useState(false)

  // Force re-render when the language changes so all t() calls update
  const [, forceUpdate] = useState(0)
  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1)
    window.addEventListener('bingo-language-change', handler)
    return () => window.removeEventListener('bingo-language-change', handler)
  }, [])

  function handleStart(newSettings) {
    const itemPool = getItems()
    let board
    try {
      board = generateBoard(
        newSettings.seed,
        newSettings.gridSize,
        newSettings.gridSize % 2 !== 0 && newSettings.freeCenter,
        itemPool
      )
    } catch (e) {
      alert(e.message)
      return
    }

    // Build initial marked state — free center starts marked
    const initMarked = board.map(row => row.map(cell => cell.isFree))

    const state = { settings: newSettings, grid: board, marked: initMarked }
    saveGameState(state)
    setSettings(newSettings)
    setGrid(board)
    setMarkedState(initMarked)
    setWon(false)
    setView('playing')
  }

  const handleSetMarked = useCallback((nextMarked) => {
    setMarkedState(nextMarked)
    saveGameState({ settings, grid, marked: nextMarked })
  }, [settings, grid])

  function handleWin() {
    setWon(true)
  }

  function handleNewGame() {
    clearGameState()
    setWon(false)
    setGrid(null)
    setMarkedState(null)
    // Clear the seed so SetupScreen generates a fresh one; preserve other settings
    setSettings(prev => prev ? { ...prev, seed: null } : null)
    setView('setup')
  }

  if (view === 'setup') {
    return <SetupScreen onStart={handleStart} lastSettings={settings} />
  }

  return (
    <div className="game-screen">
      {/* Top bar */}
      <header className="game-header">
        <button className="btn-icon" onClick={handleNewGame} title={t('backToSetup')} aria-label={t('backToSetup')}>
          <i className="fa-solid fa-house" />
        </button>

        <div className="game-title">
          <i className="fa-solid fa-car" /> {t('headerBingo')}
        </div>

        <div className="header-actions">
          <button
            className="btn-icon"
            onClick={() => setShowSeed(true)}
            title={t('showSeedTooltip')}
            aria-label={t('showSeedTooltip')}
          >
            <i className="fa-solid fa-hashtag" />
          </button>
        </div>
      </header>

      {/* Board */}
      <main className="board-wrapper">
        {grid && marked && (
          <BingoBoard
            grid={grid}
            winMode={settings.winMode}
            onWin={handleWin}
            marked={marked}
            setMarked={handleSetMarked}
          />
        )}
      </main>

      {/* Win overlay */}
      {won && (
        <WinBanner winMode={settings.winMode} onNewGame={handleNewGame} />
      )}

      {/* Seed modal */}
      {showSeed && (
        <SeedModal seed={settings.seed} onClose={() => setShowSeed(false)} />
      )}
    </div>
  )
}
