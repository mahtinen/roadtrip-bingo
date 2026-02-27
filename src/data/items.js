/**
 * Built-in road-trip bingo items.
 * Each entry has: { id: string, faClass: string }
 *
 * Labels are NOT stored here — they come from the translations file.
 * See src/i18n/ for translations.
 * To add a new built-in item: add an entry here AND a matching key in every translations file.
 */

export const BUILTIN_ITEM_DEFS = [
  // --- Ajoneuvot ---
  { id: 'car',           faClass: 'fa-solid fa-car' },
  { id: 'truck',         faClass: 'fa-solid fa-truck' },
  { id: 'bus',           faClass: 'fa-solid fa-bus' },
  { id: 'motorcycle',    faClass: 'fa-solid fa-motorcycle' },
  { id: 'bicycle',       faClass: 'fa-solid fa-bicycle' },
  { id: 'tractor',       faClass: 'fa-solid fa-tractor' },
  { id: 'rv',            faClass: 'fa-solid fa-caravan' },
  { id: 'ambulance',     faClass: 'fa-solid fa-truck-medical' },
  { id: 'firetruck',     faClass: 'fa-solid fa-fire-extinguisher' },
  { id: 'police',        faClass: 'fa-solid fa-shield-halved' },

  // --- Liikenneinfrastruktuuri ---
  { id: 'traffic-light', faClass: 'fa-solid fa-traffic-light' },
  { id: 'gas-pump',      faClass: 'fa-solid fa-gas-pump' },
  { id: 'road',          faClass: 'fa-solid fa-road' },
  { id: 'bridge',        faClass: 'fa-solid fa-bridge' },
  { id: 'parking',       faClass: 'fa-solid fa-square-parking' },

  // --- Ilma ja raide ---
  { id: 'plane',         faClass: 'fa-solid fa-plane' },
  { id: 'train',         faClass: 'fa-solid fa-train' },
  { id: 'helicopter',    faClass: 'fa-solid fa-helicopter' },

  // --- Luonto ---
  { id: 'tree',          faClass: 'fa-solid fa-tree' },
  { id: 'mountain',      faClass: 'fa-solid fa-mountain' },
  { id: 'water',         faClass: 'fa-solid fa-water' },
  { id: 'campground',    faClass: 'fa-solid fa-campground' },
  { id: 'leaf',          faClass: 'fa-solid fa-leaf' },
  { id: 'paw',           faClass: 'fa-solid fa-paw' },

  // --- Eläimet ---
  { id: 'dog',           faClass: 'fa-solid fa-dog' },
  { id: 'horse',         faClass: 'fa-solid fa-horse' },
  { id: 'crow',          faClass: 'fa-solid fa-crow' },
  { id: 'fish',          faClass: 'fa-solid fa-fish' },
  { id: 'spider',        faClass: 'fa-solid fa-spider' },

  // --- Sää ---
  { id: 'sun',           faClass: 'fa-solid fa-sun' },
  { id: 'cloud',         faClass: 'fa-solid fa-cloud' },
  { id: 'cloud-rain',    faClass: 'fa-solid fa-cloud-rain' },
  { id: 'snowflake',     faClass: 'fa-solid fa-snowflake' },
  { id: 'wind',          faClass: 'fa-solid fa-wind' },
  { id: 'rainbow',       faClass: 'fa-solid fa-rainbow' },
  { id: 'bolt',          faClass: 'fa-solid fa-bolt' },

  // --- Rakennukset ja maamerkit ---
  { id: 'church',        faClass: 'fa-solid fa-church' },
  { id: 'school',        faClass: 'fa-solid fa-school' },
  { id: 'hospital',      faClass: 'fa-solid fa-hospital' },
  { id: 'store',         faClass: 'fa-solid fa-store' },
  { id: 'flag',          faClass: 'fa-solid fa-flag' },
  { id: 'monument',      faClass: 'fa-solid fa-monument' },
  { id: 'windmill',      faClass: 'fa-solid fa-wind' },
  { id: 'tower',         faClass: 'fa-solid fa-tower-observation' },

  // --- Ruoka ja hauskanpito ---
  { id: 'hamburger',     faClass: 'fa-solid fa-burger' },
  { id: 'ice-cream',     faClass: 'fa-solid fa-ice-cream' },
  { id: 'pizza',         faClass: 'fa-solid fa-pizza-slice' },
  { id: 'utensils',      faClass: 'fa-solid fa-utensils' },

  // --- Sekalaista ---
  { id: 'camera',        faClass: 'fa-solid fa-camera' },
  { id: 'moon',          faClass: 'fa-solid fa-moon' },
  { id: 'star',          faClass: 'fa-solid fa-star' },
  { id: 'map-pin',       faClass: 'fa-solid fa-location-dot' },
  { id: 'suitcase',      faClass: 'fa-solid fa-suitcase' },
  { id: 'music',         faClass: 'fa-solid fa-music' },
]
