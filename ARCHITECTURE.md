# Matka-Bingo — Code Architecture

A React + Vite single-page application that compiles to static files.  
Deployable to Azure Static Web Apps, AWS S3, GitHub Pages, or any static host.

---

## Directory structure

```
roadtrip-bingo/
├── index.html                    ← HTML entry point, FA CDN link
├── vite.config.js                ← Vite config (base: './' for relative asset paths)
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                  ← React root mount
    ├── App.jsx                   ← Top-level state, routing between views
    ├── index.css                 ← All styles (single global CSS file)
    ├── data/
    │   └── items.js              ← Built-in icon catalogue (~52 items)
    ├── utils/
    │   ├── seededRng.js          ← PRNG, seed hashing, shuffle
    │   ├── boardGenerator.js     ← Board construction, win detection
    │   └── itemStore.js          ← Merged item pool, localStorage persistence
    └── components/
        ├── SetupScreen.jsx       ← Pre-game settings + seed entry
        ├── BingoBoard.jsx        ← Grid renderer + tap handler
        ├── BingoCell.jsx         ← Single cell (icon, label, states)
        ├── WinBanner.jsx         ← Win overlay with confetti
        ├── SeedModal.jsx         ← Seed display + copy for co-op
        └── ItemEditor.jsx        ← Add/remove custom icons at runtime
```

---

## Entry points

### `index.html`
The only HTML file. Contains:
- A `<div id="root">` that React mounts into.
- A `<link>` tag loading **Font Awesome 6 Free** from the Cloudflare CDN.  
  This means every valid `fa-solid fa-*` / `fa-regular fa-*` class name will render without any bundler involvement — which is why the live icon preview in `ItemEditor` works instantly.

### `src/main.jsx`
Standard React 18 bootstrap: wraps `<App>` in `<StrictMode>` and calls `createRoot().render()`.

### `vite.config.js`
Sets `base: './'` so all asset URLs in the compiled `dist/` folder are relative paths.  
This is required for S3 and Azure Static Web Apps because the app may be served from a subfolder rather than the domain root. Without it, the compiled JS/CSS references `/assets/…` which breaks on subfolder deployments.

---

## Data layer

### `src/data/items.js`
A plain JS array of **52 built-in road-trip items**. Each entry has the shape:

```js
{ id: string, label: string, faClass: string }
```

- `id` — unique string key (e.g. `'car'`, `'rainbow'`).
- `label` — Finnish display name shown under the icon on the bingo cell.
- `faClass` — full Font Awesome 6 class string (e.g. `'fa-solid fa-car'`).

This file is **read-only at runtime** — items here cannot be removed through the UI.  
It is imported both by `itemStore.js` (to seed the merged pool) and by `ItemEditor.jsx` (to render the locked built-in list).

---

## Utilities

### `src/utils/seededRng.js`
Three exported functions that together make deterministic board generation possible:

#### `mulberry32(seed: number) → () => number`
Implements the **mulberry32** pseudo-random number generator algorithm.  
Takes a 32-bit unsigned integer seed and returns a *closure* (a stateful function) that, each time it is called, advances the internal state and returns a float in `[0, 1)`.  
The key property: the same seed always produces the exact same sequence of numbers, on every browser and device. This is what makes two tablets show an identical board when they share the same seed code.

#### `seedStringToInt(str: string) → number`
Converts the 6-character alphanumeric seed string the player types (e.g. `"AB3K7X"`) into a 32-bit unsigned integer using a **djb2 hash**:

```
hash = 5381
for each character:  hash = (hash * 33) XOR charCode
return hash as unsigned 32-bit
```

The result is fed directly into `mulberry32`.

#### `shuffleWithRng(array, rand) → array`
A **deterministic Fisher-Yates shuffle**. Iterates backwards through a copy of the array; at each position `i`, picks a random index `j ≤ i` using the provided PRNG function and swaps elements. Because `rand` is the seeded mulberry32 closure, the same seed always produces the same shuffle order.

#### `generateSeed() → string`
Produces a random 6-character code using `Math.random()` (non-deterministic, used only when starting a fresh game). Characters are drawn from the alphabet `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` — letters O and I and digits 0 and 1 are omitted to avoid visual confusion on tablets.

---

### `src/utils/boardGenerator.js`
Imports from `seededRng.js` and exports two functions:

#### `generateBoard(seedStr, gridSize, freeCenter, itemPool) → Cell[][]`
The core board-creation function:

1. Hashes `seedStr` → integer → creates a `mulberry32` PRNG instance.
2. Calculates how many item slots are needed: `N²`, minus 1 if a free center is used on an odd-sized grid.
3. Throws a Finnish error if the item pool is too small (prevents silent empty cells).
4. Calls `shuffleWithRng(itemPool, rand)` to get a fully shuffled copy of the pool.
5. Slices the first `N` items from the shuffle.
6. Builds a flat array of cell objects, inserting a hardcoded `{ id: '__free__', label: 'VAPAA', isFree: true }` cell at position `Math.floor(N² / 2)` when the free center is enabled (only for odd grid sizes — even grids have no true center).
7. Breaks the flat array into a 2D `N×N` array (rows of `N` cells each) and returns it.

Each non-free cell has shape `{ id, label, faClass, isFree: false }`.

#### `checkWin(marked: boolean[][], winMode) → { won, winningCells }`
Called after every cell tap in `BingoBoard`.

- **Blackout mode**: checks `marked.every(row => row.every(v => v))`. Returns `won: true` and an empty `Set` (no specific cells to highlight).
- **Line mode**: checks all N rows, all N columns, and both main diagonals. Any fully-marked line adds its cell coordinates (`"row-col"` strings) to the `winningCells` Set. Returns `won: true` if the Set is non-empty. Multiple simultaneous winning lines are handled correctly (e.g. a corner cell completing both a row and a diagonal will be in the set from both checks).

---

### `src/utils/itemStore.js`
Manages the **merged item pool** at runtime and persists custom items to `localStorage` under the key `bingo_custom_items`.

| Export | What it does |
|---|---|
| `getItems()` | Returns `[...BUILTIN_ITEMS, ...readCustom()]` — the full pool used by `generateBoard` |
| `getCustomItems()` | Returns only the custom items array from localStorage |
| `addItem(label, faClass)` | Validates inputs (non-empty label, class starts with `"fa"`, no duplicate faClass), appends to the custom list, returns `{ ok, item }` or `{ ok: false, error }` |
| `removeItem(id)` | Filters the custom array by id and writes back; guards against removing built-in items |

Custom items are stored as a JSON array. They persist across page refreshes and survive the browser being closed because `localStorage` is not session-scoped.

---

## Components

### `src/App.jsx`
The top-level component. Owns all cross-view state and manages two **views**:

- **`'setup'`** → renders `<SetupScreen>`
- **`'playing'`** → renders the game header, `<BingoBoard>`, and conditionally `<WinBanner>` and `<SeedModal>`

**State owned by App:**

| State | Type | Purpose |
|---|---|---|
| `view` | `'setup' \| 'playing'` | Which screen is shown |
| `settings` | object | `{ gridSize, freeCenter, winMode, seed }` — passed down to board gen and child components |
| `grid` | `Cell[][]` | The 2D board generated from seed; stays stable during a game |
| `marked` | `boolean[][]` | Which cells have been tapped; updated on every tap |
| `won` | boolean | Whether the player has won (triggers WinBanner) |
| `showSeed` | boolean | Whether the SeedModal is open |

**localStorage persistence** — on every `setMarked` call, App serialises `{ settings, grid, marked }` to `localStorage` under `bingo_game_state`. On mount, it reads this key and restores the game in progress if it exists. `handleNewGame` clears this key.

**`handleStart(settings)`** — called by SetupScreen; calls `generateBoard`, builds the initial `marked` 2D array (all `false` except free-center cells which start `true`), saves to localStorage, and switches view to `'playing'`.

---

### `src/components/SetupScreen.jsx`
The pre-game configuration screen. Local state only (no lifting until Start is pressed).

**Controls:**
- **Board size** (4×4 / 5×5 / 6×6) — options that would leave fewer icons than cells are shown disabled with a tooltip.
- **Free center toggle** — shown but has no visual effect for even grid sizes (a note explains why: even grids have no single center cell).
- **Win condition** — "Rivi" (line) or "Täysi lauta" (blackout).
- **Seed field** — initialized with `generateSeed()` on first render, or with the last used seed if returning from a finished game. The user can overwrite it to match a friend's code. A 🔄 button calls `generateSeed()` to randomise it.
- **Pool counter** — reads `getItems().length` and compares against the cells needed for the selected grid size. Re-reads whenever `ItemEditor` closes (via `useEffect` on `showEditor`).
- **"Muokkaa kuvakkeita"** button — replaces the entire screen with `<ItemEditor>` (conditional render, not a modal).

---

### `src/components/BingoBoard.jsx`
Renders the N×N CSS Grid and handles tap logic.

**Props:** `grid`, `winMode`, `onWin`, `marked`, `setMarked`

The `marked` state lives in `App` (not here) so it can be persisted to localStorage. `BingoBoard` receives it as a prop and calls `setMarked` with the updated 2D array on each tap.

After updating marked, it immediately calls `checkWin`. If won, it stores the `winningCells` Set in local state (used to apply the `:winning` CSS class) and calls `onWin` after a 320 ms delay — the delay lets the final tap's marked animation render before the WinBanner overlays everything.

The board size is passed to CSS via the inline style `--grid-size: N`, which the CSS Grid rule `grid-template-columns: repeat(var(--grid-size), 1fr)` uses to create the correct number of columns automatically.

---

### `src/components/BingoCell.jsx`
A purely presentational component (no internal state). Renders a `<button>` with:
- An `<i>` tag carrying the `faClass` — Font Awesome renders the icon via CSS.
- A `<span>` label below the icon.
- A `check-overlay` checkmark `<i>` that appears when `marked` is true and the cell is not free.

CSS classes applied based on props:

| Class | Condition |
|---|---|
| `marked` | `marked === true` — green tint, green icon colour |
| `free` | `item.isFree === true` — purple tint, pre-marked, `disabled` attribute set so tapping does nothing |
| `winning` | `winning === true` — gold tint + pulse animation |

The component is `disabled` for free cells so the button is not interactive. For all other cells, clicking fires `onToggle` which bubbles up through `BingoBoard` to `App`'s state.

---

### `src/components/WinBanner.jsx`
A fixed full-screen overlay (z-index 100) that appears when `App.won` becomes true.

Contains:
- 30 `<span class="confetti-piece">` elements. Each has a CSS custom property `--i` set to its index (0–29). The CSS animation `fall` uses `--i` to vary each piece's horizontal drift, fall duration, and rotation, producing a spread-out confetti effect without any JS or external library.
- A trophy icon with a `bounce-in` CSS keyframe animation.
- The "BINGO!" word with a `zoom-in` animation.
- A subtitle that changes based on `winMode`.
- A "Uusi peli" button that calls `onNewGame` → `App.handleNewGame()` → clears localStorage and returns to setup.

---

### `src/components/SeedModal.jsx`
A centred modal (z-index 50) triggered by the `#` button in the game header.

Displays the current `seed` prop in large monospace text. The **Kopioi** button calls `navigator.clipboard.writeText(seed)`. On success, the button text changes to "Kopioitu!" for 2 seconds. On failure (clipboard API not available — common in some WebViews), it falls back to selecting the seed text element so the user can long-press copy manually.

Clicking the backdrop (`.modal-backdrop`) closes the modal; clicking inside the card stops propagation so the card itself doesn't close it.

---

### `src/components/ItemEditor.jsx`
A full-page view (replaces SetupScreen, not a modal overlay) for managing the icon pool.

**Add form:**
1. User types a label into the first input.
2. User types a Font Awesome class (e.g. `fa-solid fa-guitar`) into the second input.
3. As they type, `handleClassChange` checks if the value starts with `"fa"` and updates `previewClass` state, which is bound to the `className` of the preview `<i>` tag. The icon renders live in the preview box via the already-loaded FA CDN stylesheet — no API call needed.
4. Clicking "Lisää" calls `itemStore.addItem()`. On success, the local `customItems` state is refreshed from `getCustomItems()` and the form resets. On failure, the error string is shown in red below the inputs.

**Item list:**
- Custom items section (only shown if there are custom items) — each row has a 🗑️ remove button that calls `itemStore.removeItem(id)` and refreshes local state.
- Built-in items section — always shown, always locked (🔒 icon), no remove button. Styled at 70% opacity to visually distinguish them from custom items.

---

## Styling (`src/index.css`)

Single flat CSS file with no preprocessor. Key design decisions:

- **CSS custom properties** on `:root` define the entire colour palette (`--clr-bg`, `--clr-marked`, `--clr-winning`, etc.), making it easy to retheme.
- **`--grid-size`** is a CSS custom property set inline by `BingoBoard`. The grid layout rule `grid-template-columns: repeat(var(--grid-size), 1fr)` reads it to support 4×4, 5×5, and 6×6 without hard-coded media queries.
- **Cell sizing** uses `min(calc(100dvh - 80px), 100dvw - 20px)` — the board square is always the largest square that fits the viewport, accounting for the header height. On tablets held in landscape, it fills the height; in portrait, the width.
- **Icon and label font sizes** use `clamp(min, viewport-unit, max)` to scale fluidly across different tablet screen sizes without JS.
- **Tap targets** are styled to fill their grid cell entirely (no fixed pixel size), ensuring even the smallest 6×6 grid produces adequately large tap areas on a tablet.
- All animations (cell pulse, win bounce, confetti fall) are pure CSS keyframes — no animation library dependency.

---

## Data flow diagram

```
SetupScreen
  │  (settings + seed)
  ▼
App.handleStart()
  ├─ getItems()          ← itemStore: BUILTIN_ITEMS + localStorage custom items
  └─ generateBoard()     ← boardGenerator: seed → PRNG → shuffle → 2D grid
       └─ seededRng:  seedStringToInt → mulberry32 → shuffleWithRng

App (playing view)
  ├─ grid (stable, never changes during a game)
  ├─ marked (boolean[][], updated on tap)
  │     └── saved to localStorage on every change
  │
  ├─── BingoBoard
  │      └─ BingoCell × N²  (tap → toggles marked[r][c])
  │           └─ checkWin() after each tap
  │                 └─ won → WinBanner
  │
  ├─── SeedModal (shown on # button tap)
  └─── WinBanner (shown when won === true)
            └─ "Uusi peli" → App.handleNewGame() → SetupScreen
```

---

## Co-op / rivalry mechanics

When two players want to compete on **identical boards**:

1. Player A starts a game — a random seed (e.g. `AB3K7X`) is auto-generated.
2. Player A taps the `#` button → SeedModal shows the seed → taps "Kopioi".
3. Player B opens the app → on SetupScreen, types `AB3K7X` into the seed field with the same grid size and settings.
4. Both boards are generated by the same `mulberry32(seedStringToInt("AB3K7X"))` PRNG with the same item pool, producing a byte-for-byte identical grid.

Each player's `marked` state is entirely local — tapping on one tablet does not affect the other. There is no network layer; the only shared artefact is the seed string.

---

## Building for deployment

```bash
npm run build       # outputs dist/
```

The `dist/` folder contains:
- `index.html` — the single HTML page
- `assets/index-[hash].js` — all React + app code bundled and minified
- `assets/index-[hash].css` — all styles

Font Awesome is loaded from the CDN at runtime (not bundled), so the JS bundle stays small (~159 KB minified / ~51 KB gzipped).

Upload the entire `dist/` folder to:
- **Azure Static Web Apps** — point the app artifact path to `dist`
- **AWS S3** — enable static website hosting, upload `dist/` contents to the bucket root
- **GitHub Pages** — use the `gh-pages` package or a GitHub Actions workflow to publish `dist/`
