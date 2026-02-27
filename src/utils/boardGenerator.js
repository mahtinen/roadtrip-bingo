import { mulberry32, seedStringToInt, shuffleWithRng } from './seededRng.js'
import { t } from '../i18n/index.js'

/**
 * Generate a bingo board.
 *
 * @param {string}   seedStr     6-char seed string
 * @param {number}   gridSize    N for an NxN board (4, 5, or 6)
 * @param {boolean}  freeCenter  whether the center cell is a free square
 * @param {Array}    itemPool    merged array of { id, label, faClass } objects
 *
 * @returns {Array<Array<{id, label, faClass, isFree}>>}  2D NxN grid
 */
export function generateBoard(seedStr, gridSize, freeCenter, itemPool) {
  const rand = mulberry32(seedStringToInt(seedStr))
  const totalCells = gridSize * gridSize
  const centerIndex = Math.floor(totalCells / 2) // only meaningful for odd grids
  const needItems = freeCenter && gridSize % 2 !== 0 ? totalCells - 1 : totalCells

  if (itemPool.length < needItems) {
    throw new Error(t('errorNotEnoughItems', { pool: itemPool.length, size: gridSize, needs: needItems }))
  }

  const shuffled = shuffleWithRng(itemPool, rand)
  const picked = shuffled.slice(0, needItems)

  // Build flat cell array, inserting FREE center if needed
  const cells = []
  let pickedIndex = 0
  for (let i = 0; i < totalCells; i++) {
    const usesFreeCenter = freeCenter && gridSize % 2 !== 0 && i === centerIndex
    if (usesFreeCenter) {
      cells.push({ id: '__free__', label: t('freeCellLabel'), faClass: 'fa-solid fa-star', isFree: true })
    } else {
      cells.push({ ...picked[pickedIndex++], isFree: false })
    }
  }

  // Convert flat array to 2D grid
  const grid = []
  for (let row = 0; row < gridSize; row++) {
    grid.push(cells.slice(row * gridSize, row * gridSize + gridSize))
  }
  return grid
}

/**
 * Check win conditions on the current marked state.
 *
 * @param {boolean[][]} marked   2D array matching grid dimensions
 * @param {'line'|'blackout'} winMode
 * @returns {{ won: boolean, winningCells: Set<string> }}
 *   winningCells contains "row-col" keys of the completing line (empty for blackout)
 */
export function checkWin(marked, winMode) {
  const n = marked.length

  if (winMode === 'blackout') {
    const won = marked.every(row => row.every(cell => cell))
    return { won, winningCells: new Set() }
  }

  // Line win: rows, columns, diagonals
  const winning = new Set()

  // Check rows
  for (let r = 0; r < n; r++) {
    if (marked[r].every(v => v)) {
      for (let c = 0; c < n; c++) winning.add(`${r}-${c}`)
    }
  }
  // Check columns
  for (let c = 0; c < n; c++) {
    if (marked.every(row => row[c])) {
      for (let r = 0; r < n; r++) winning.add(`${r}-${c}`)
    }
  }
  // Main diagonal (top-left → bottom-right)
  if (Array.from({ length: n }, (_, i) => marked[i][i]).every(v => v)) {
    for (let i = 0; i < n; i++) winning.add(`${i}-${i}`)
  }
  // Anti-diagonal (top-right → bottom-left)
  if (Array.from({ length: n }, (_, i) => marked[i][n - 1 - i]).every(v => v)) {
    for (let i = 0; i < n; i++) winning.add(`${i}-${n - 1 - i}`)
  }

  return { won: winning.size > 0, winningCells: winning }
}
