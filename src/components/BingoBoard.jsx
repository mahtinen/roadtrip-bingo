import { useState, useCallback } from 'react'
import BingoCell from './BingoCell.jsx'
import { checkWin } from '../utils/boardGenerator.js'

/**
 * Props:
 *   grid      2D array of cell objects
 *   winMode   'line' | 'blackout'
 *   onWin     () => void
 *   marked    boolean[][]   — controlled from parent
 *   setMarked (newMarked: boolean[][]) => void
 */
export default function BingoBoard({ grid, winMode, onWin, marked, setMarked }) {
  const [winningCells, setWinningCells] = useState(new Set())

  const handleToggle = useCallback((row, col) => {
    const next = marked.map((r, ri) =>
      r.map((v, ci) => (ri === row && ci === col ? !v : v))
    )
    setMarked(next)

    const { won, winningCells: wc } = checkWin(next, winMode)
    if (won) {
      setWinningCells(wc)
      // Small delay so the last tap registers visually before the banner appears
      setTimeout(onWin, 320)
    }
  }, [marked, setMarked, winMode, onWin])

  const n = grid.length

  return (
    <div
      className="bingo-board"
      style={{ '--grid-size': n }}
    >
      {grid.map((row, ri) =>
        row.map((cell, ci) => (
          <BingoCell
            key={`${ri}-${ci}`}
            item={cell}
            marked={marked[ri][ci]}
            winning={winningCells.has(`${ri}-${ci}`)}
            onToggle={() => handleToggle(ri, ci)}
          />
        ))
      )}
    </div>
  )
}
