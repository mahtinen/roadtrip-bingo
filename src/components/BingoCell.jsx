/**
 * A single bingo cell.
 * Props:
 *   item        { id, label, faClass, isFree }
 *   marked      boolean
 *   winning     boolean   — part of the winning line/blackout
 *   onToggle    () => void
 */
export default function BingoCell({ item, marked, winning, onToggle }) {
  const classes = [
    'bingo-cell',
    item.isFree  ? 'free' : '',
    marked       ? 'marked' : '',
    winning      ? 'winning' : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      onClick={item.isFree ? undefined : onToggle}
      aria-pressed={marked}
      aria-label={item.label}
      disabled={item.isFree}
    >
      <i className={item.faClass} aria-hidden="true" />
      <span className="cell-label">{item.label}</span>
      {marked && !item.isFree && (
        <span className="check-overlay" aria-hidden="true">
          <i className="fa-solid fa-check" />
        </span>
      )}
    </button>
  )
}
