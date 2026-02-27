/**
 * mulberry32 — tiny, fast, deterministic PRNG.
 * Same seed always produces the same sequence across all browsers.
 *
 * @param {number} seed  32-bit unsigned integer
 * @returns {() => number}  function that returns a float in [0, 1)
 */
export function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Convert a 6-char alphanumeric seed string into a 32-bit unsigned integer
 * (djb2 hash variant).
 *
 * @param {string} str
 * @returns {number}
 */
export function seedStringToInt(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
  }
  return hash >>> 0  // unsigned 32-bit
}

/**
 * Deterministic Fisher-Yates shuffle.
 *
 * @template T
 * @param {T[]} array
 * @param {() => number} rand  PRNG function returning [0, 1)
 * @returns {T[]}  new shuffled array (original not mutated)
 */
export function shuffleWithRng(array, rand) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Generate a random 6-char alphanumeric seed string.
 *
 * @returns {string}
 */
export function generateSeed() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no O/0/I/1 to avoid confusion
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}
