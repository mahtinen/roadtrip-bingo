import BUILTIN_ITEMS from '../data/items.js'

const STORAGE_KEY = 'bingo_custom_items'

/** Read custom items from localStorage */
function readCustom() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/** Write custom items to localStorage */
function writeCustom(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

/** Returns the merged list of built-in + custom items */
export function getItems() {
  return [...BUILTIN_ITEMS, ...readCustom()]
}

/** Returns only the custom items */
export function getCustomItems() {
  return readCustom()
}

/**
 * Add a new custom item.
 * @param {string} label
 * @param {string} faClass  e.g. "fa-solid fa-guitar"
 * @returns {{ ok: boolean, error?: string, item?: object }}
 */
export function addItem(label, faClass) {
  const trimLabel = label.trim()
  const trimClass = faClass.trim()

  if (!trimLabel) return { ok: false, error: 'Nimi ei voi olla tyhjä.' }
  if (!trimClass.startsWith('fa')) return { ok: false, error: 'Kuvakeluokan täytyy alkaa "fa"-kirjaimilla (esim. fa-solid fa-guitar).' }

  const all = getItems()
  if (all.some(i => i.faClass === trimClass && !i.id.startsWith('__'))) {
    return { ok: false, error: 'Tämä kuvake on jo olemassa.' }
  }

  const custom = readCustom()
  const id = `custom_${Date.now()}`
  const item = { id, label: trimLabel, faClass: trimClass }
  custom.push(item)
  writeCustom(custom)
  return { ok: true, item }
}

/**
 * Remove a custom item by id.
 * Built-in items cannot be removed.
 * @param {string} id
 * @returns {boolean}
 */
export function removeItem(id) {
  if (BUILTIN_ITEMS.some(i => i.id === id)) return false // guard built-ins
  const custom = readCustom().filter(i => i.id !== id)
  writeCustom(custom)
  return true
}
