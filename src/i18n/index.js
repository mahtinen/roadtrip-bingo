/**
 * i18n entry point — supports multiple languages with runtime switching.
 *
 * Usage:
 *   import { t, tItem, setLanguage, getLanguage, SUPPORTED_LANGUAGES, LANGUAGE_NAMES } from './i18n/index.js'
 *
 * Language change fires a 'bingo-language-change' window event so React
 * components can re-render.
 */
import fi from './fi.js'
import en from './en.js'

export const SUPPORTED_LANGUAGES = ['fi', 'en']
export const LANGUAGE_NAMES = { fi: 'Suomi', en: 'English' }
export const LANGUAGE_FLAGS = { fi: '🇫🇮', en: '🇬🇧' }

const LOCALES = { fi, en }

const LANG_STORAGE_KEY = 'bingo_language'

/** Detect initial language: localStorage → browser → 'en' */
function detectLanguage() {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY)
    if (stored && LOCALES[stored]) return stored
  } catch { /* SSR / private mode */ }
  const browser = (typeof navigator !== 'undefined' ? navigator.language : '').slice(0, 2).toLowerCase()
  return LOCALES[browser] ? browser : 'en'
}

let currentLang = detectLanguage()

/** Returns the active language code e.g. 'en' or 'fi'. */
export function getLanguage() {
  return currentLang
}

/**
 * Switch language at runtime.
 * Dispatches 'bingo-language-change' on window so React can re-render.
 * @param {string} lang  e.g. 'en' or 'fi'
 */
export function setLanguage(lang) {
  if (!LOCALES[lang]) return
  currentLang = lang
  try { localStorage.setItem(LANG_STORAGE_KEY, lang) } catch { /* ignore */ }
  window.dispatchEvent(new Event('bingo-language-change'))
}

/**
 * Returns the translation for a given key.
 *
 * Supports simple token replacement:
 *   t('gridDisabledTitle', { needs: 5, pool: 3 })
 *
 * @param {string} key
 * @param {Record<string, string|number>} [tokens]
 * @returns {string}
 */
export function t(key, tokens) {
  const locale = LOCALES[currentLang] ?? LOCALES.en
  let str = locale[key]
  if (str === undefined) {
    // Fall back to English before giving up
    str = LOCALES.en[key]
    if (str === undefined) {
      console.warn(`[i18n] Missing translation key: "${key}"`)
      return key
    }
  }
  if (tokens) {
    Object.entries(tokens).forEach(([k, v]) => {
      str = str.replaceAll(`{${k}}`, String(v))
    })
  }
  return str
}

/**
 * Shortcut for item labels from the translations.items map.
 *
 * @param {string} id  item id from items.js
 * @returns {string}
 */
export function tItem(id) {
  const locale = LOCALES[currentLang] ?? LOCALES.en
  const label = locale.items?.[id] ?? LOCALES.en.items?.[id]
  if (label === undefined) {
    console.warn(`[i18n] Missing item translation: "${id}"`)
    return id
  }
  return label
}
