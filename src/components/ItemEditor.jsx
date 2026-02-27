import { useState } from 'react'
import { BUILTIN_ITEM_DEFS } from '../data/items.js'
import { getCustomItems, addItem, removeItem } from '../utils/itemStore.js'
import { t, tItem } from '../i18n/index.js'

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

  const totalCount = BUILTIN_ITEM_DEFS.length + customItems.length

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
        <button className="btn-icon" onClick={onClose} aria-label={t('editorBackAriaLabel')}>
          <i className="fa-solid fa-arrow-left" />
        </button>
        <h2><i className="fa-solid fa-icons" /> {t('editorTitle')}</h2>
        <span className="pool-count">{t('editorTotalCount', { count: totalCount })}</span>
      </div>

      {/* Add new icon form */}
      <div className="editor-add-card">
        <h3>{t('editorAddTitle')}</h3>
        <p className="modal-hint">
          {t('editorAddHintPre')}{' '}
          <a href="https://fontawesome.com/search?o=r&m=free" target="_blank" rel="noreferrer">
            {t('editorAddHintLink')}
          </a>{' '}
          {t('editorAddHintPost')}{' '}
          <code>fa-solid fa-guitar</code>
        </p>

        <div className="add-form">
          {/* Live preview */}
          <div className="preview-box" title={t('editorPreviewTitle')}>
            {previewClass
              ? <i className={previewClass} />
              : <span className="preview-placeholder"><i className="fa-regular fa-image" /></span>
            }
          </div>

          <div className="add-inputs">
            <input
              className="add-input"
              type="text"
              placeholder={t('editorLabelPlaceholder')}
              value={labelInput}
              onChange={e => { setLabelInput(e.target.value); setError('') }}
              maxLength={24}
            />
            <input
              className="add-input"
              type="text"
              placeholder={t('editorClassPlaceholder')}
              value={classInput}
              onChange={e => handleClassChange(e.target.value)}
            />
            {error && <p className="add-error"><i className="fa-solid fa-triangle-exclamation" /> {error}</p>}
            {added && <p className="add-success"><i className="fa-solid fa-check" /> {t('editorAddedSuccess')}</p>}
          </div>

          <button
            className="btn-start add-btn"
            onClick={handleAdd}
            disabled={!labelInput.trim() || !classInput.trim()}
          >
            <i className="fa-solid fa-plus" /> {t('editorAddButton')}
          </button>
        </div>
      </div>

      {/* Scrollable item list */}
      <div className="item-list">
        {/* Custom items first (removable) */}
        {customItems.length > 0 && (
          <div className="item-section">
            <h4>{t('customIconsTitle', { count: customItems.length })}</h4>
            {customItems.map(item => (
              <div key={item.id} className="item-row custom">
                <i className={item.faClass} />
                <span className="item-label">{item.label}</span>
                <code className="item-class">{item.faClass}</code>
                <button
                  className="btn-remove"
                  onClick={() => handleRemove(item.id)}
                  aria-label={t('removeAriaLabel', { label: item.label })}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Built-in items (read-only) */}
        <div className="item-section">
          <h4>{t('builtinIconsTitle', { count: BUILTIN_ITEM_DEFS.length })}</h4>
          {BUILTIN_ITEM_DEFS.map(def => (
            <div key={def.id} className="item-row builtin">
              <i className={def.faClass} />
              <span className="item-label">{tItem(def.id)}</span>
              <code className="item-class">{def.faClass}</code>
              <span className="item-lock" aria-label={t('builtinLockAriaLabel')}>
                <i className="fa-solid fa-lock" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
