import { useState } from 'react'
import BUILTIN_ITEMS from '../data/items.js'
import { getCustomItems, addItem, removeItem } from '../utils/itemStore.js'

/**
 * Full-page icon editor — add/remove custom icons.
 * Props:
 *   onClose  () => void
 */
export default function ItemEditor({ onClose }) {
  const [customItems, setCustomItems] = useState(() => getCustomItems())
  const [previewClass, setPreviewClass] = useState('')
  const [labelInput, setLabelInput]     = useState('')
  const [classInput, setClassInput]     = useState('')
  const [error, setError]               = useState('')
  const [added, setAdded]               = useState(false)

  const totalCount = BUILTIN_ITEMS.length + customItems.length

  function handleAdd() {
    setError('')
    setAdded(false)
    const result = addItem(labelInput, classInput)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setCustomItems(getCustomItems())
    setLabelInput('')
    setClassInput('')
    setPreviewClass('')
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleRemove(id) {
    removeItem(id)
    setCustomItems(getCustomItems())
  }

  function handleClassChange(val) {
    setClassInput(val)
    setError('')
    // Live preview after user types at least "fa-"
    if (val.trim().startsWith('fa')) {
      setPreviewClass(val.trim())
    } else {
      setPreviewClass('')
    }
  }

  return (
    <div className="editor-screen">
      <div className="editor-header">
        <button className="btn-icon" onClick={onClose} aria-label="Takaisin">
          <i className="fa-solid fa-arrow-left" />
        </button>
        <h2><i className="fa-solid fa-icons" /> Muokkaa kuvakkeita</h2>
        <span className="pool-count">{totalCount} yhteensä</span>
      </div>

      {/* Add new icon form */}
      <div className="editor-add-card">
        <h3>Lisää uusi kuvake</h3>
        <p className="modal-hint">
          Käytä mitä tahansa{' '}
          <a href="https://fontawesome.com/search?o=r&m=free" target="_blank" rel="noreferrer">
            Font Awesome 6 Free
          </a>{' '}
          -kuvakeluokkaa, esim.{' '}
          <code>fa-solid fa-guitar</code>
        </p>

        <div className="add-form">
          {/* Live preview */}
          <div className="preview-box" title="Kuvakkeen esikatselu">
            {previewClass
              ? <i className={previewClass} />
              : <span className="preview-placeholder"><i className="fa-regular fa-image" /></span>
            }
          </div>

          <div className="add-inputs">
            <input
              className="add-input"
              type="text"
              placeholder='Nimi, esim. "Kitara"'
              value={labelInput}
              onChange={e => { setLabelInput(e.target.value); setError('') }}
              maxLength={24}
            />
            <input
              className="add-input"
              type="text"
              placeholder='FA-luokka, esim. "fa-solid fa-guitar"'
              value={classInput}
              onChange={e => handleClassChange(e.target.value)}
            />
            {error && <p className="add-error"><i className="fa-solid fa-triangle-exclamation" /> {error}</p>}
            {added && <p className="add-success"><i className="fa-solid fa-check" /> Kuvake lisätty!</p>}
          </div>

          <button
            className="btn-start add-btn"
            onClick={handleAdd}
            disabled={!labelInput.trim() || !classInput.trim()}
          >
            <i className="fa-solid fa-plus" /> Lisää
          </button>
        </div>
      </div>

      {/* Scrollable item list */}
      <div className="item-list">
        {/* Custom items first (removable) */}
        {customItems.length > 0 && (
          <div className="item-section">
            <h4>Omat kuvakkeet <span className="hint">({customItems.length})</span></h4>
            {customItems.map(item => (
              <div key={item.id} className="item-row custom">
                <i className={item.faClass} />
                <span className="item-label">{item.label}</span>
                <code className="item-class">{item.faClass}</code>
                <button
                  className="btn-remove"
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Poista ${item.label}`}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Built-in items (read-only) */}
        <div className="item-section">
          <h4>Valmiit kuvakkeet <span className="hint">({BUILTIN_ITEMS.length} — ei voi poistaa)</span></h4>
          {BUILTIN_ITEMS.map(item => (
            <div key={item.id} className="item-row builtin">
              <i className={item.faClass} />
              <span className="item-label">{item.label}</span>
              <code className="item-class">{item.faClass}</code>
              <span className="item-lock" aria-label="Valmis kuvake">
                <i className="fa-solid fa-lock" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
