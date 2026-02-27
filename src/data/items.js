/**
 * Built-in road-trip bingo items.
 * Each item: { id: string, label: string, faClass: string }
 * faClass follows Font Awesome 6 Free syntax, e.g. "fa-solid fa-car"
 */
const BUILTIN_ITEMS = [
  // --- Ajoneuvot ---
  { id: 'car',          label: 'Auto',           faClass: 'fa-solid fa-car' },
  { id: 'truck',        label: 'Rekka',          faClass: 'fa-solid fa-truck' },
  { id: 'bus',          label: 'Bussi',          faClass: 'fa-solid fa-bus' },
  { id: 'motorcycle',   label: 'Moottoripyörä',  faClass: 'fa-solid fa-motorcycle' },
  { id: 'bicycle',      label: 'Polkupyörä',     faClass: 'fa-solid fa-bicycle' },
  { id: 'tractor',      label: 'Traktori',       faClass: 'fa-solid fa-tractor' },
  { id: 'rv',           label: 'Matkailuauto',   faClass: 'fa-solid fa-caravan' },
  { id: 'ambulance',    label: 'Ambulanssi',     faClass: 'fa-solid fa-truck-medical' },
  { id: 'firetruck',    label: 'Paloauto',       faClass: 'fa-solid fa-fire-extinguisher' },
  { id: 'police',       label: 'Poliisiauto',    faClass: 'fa-solid fa-shield-halved' },

  // --- Liikenneinfrastruktuuri ---
  { id: 'traffic-light',label: 'Liikennevalo',   faClass: 'fa-solid fa-traffic-light' },
  { id: 'gas-pump',     label: 'Huoltoasema',    faClass: 'fa-solid fa-gas-pump' },
  { id: 'road',         label: 'Tienvitta',      faClass: 'fa-solid fa-road' },
  { id: 'bridge',       label: 'Silta',          faClass: 'fa-solid fa-bridge' },
  { id: 'parking',      label: 'Parkkipaikka',   faClass: 'fa-solid fa-square-parking' },

  // --- Ilma ja raide ---
  { id: 'plane',        label: 'Lentokone',      faClass: 'fa-solid fa-plane' },
  { id: 'train',        label: 'Juna',           faClass: 'fa-solid fa-train' },
  { id: 'helicopter',   label: 'Helikopteri',    faClass: 'fa-solid fa-helicopter' },

  // --- Luonto ---
  { id: 'tree',         label: 'Puu',            faClass: 'fa-solid fa-tree' },
  { id: 'mountain',     label: 'Vuori',          faClass: 'fa-solid fa-mountain' },
  { id: 'water',        label: 'Joki / Järvi',   faClass: 'fa-solid fa-water' },
  { id: 'campground',   label: 'Leirintäalue',   faClass: 'fa-solid fa-campground' },
  { id: 'leaf',         label: 'Metsä',          faClass: 'fa-solid fa-leaf' },
  { id: 'paw',          label: 'Villieläin',     faClass: 'fa-solid fa-paw' },

  // --- Eläimet ---
  { id: 'dog',          label: 'Koira',          faClass: 'fa-solid fa-dog' },
  { id: 'horse',        label: 'Hevonen',        faClass: 'fa-solid fa-horse' },
  { id: 'crow',         label: 'Lintu',          faClass: 'fa-solid fa-crow' },
  { id: 'fish',         label: 'Kala',           faClass: 'fa-solid fa-fish' },
  { id: 'spider',       label: 'Hyönteinen',     faClass: 'fa-solid fa-spider' },

  // --- Sää ---
  { id: 'sun',          label: 'Aurinkoinen',    faClass: 'fa-solid fa-sun' },
  { id: 'cloud',        label: 'Pilviä',         faClass: 'fa-solid fa-cloud' },
  { id: 'cloud-rain',   label: 'Sade',           faClass: 'fa-solid fa-cloud-rain' },
  { id: 'snowflake',    label: 'Lumi',           faClass: 'fa-solid fa-snowflake' },
  { id: 'wind',         label: 'Tuulinen',       faClass: 'fa-solid fa-wind' },
  { id: 'rainbow',      label: 'Sateenkaari',    faClass: 'fa-solid fa-rainbow' },
  { id: 'bolt',         label: 'Salama',         faClass: 'fa-solid fa-bolt' },

  // --- Rakennukset ja maamerkit ---
  { id: 'church',       label: 'Kirkko',         faClass: 'fa-solid fa-church' },
  { id: 'school',       label: 'Koulu',          faClass: 'fa-solid fa-school' },
  { id: 'hospital',     label: 'Sairaala',       faClass: 'fa-solid fa-hospital' },
  { id: 'store',        label: 'Kauppa',         faClass: 'fa-solid fa-store' },
  { id: 'flag',         label: 'Lippu',          faClass: 'fa-solid fa-flag' },
  { id: 'monument',     label: 'Muistomerkki',   faClass: 'fa-solid fa-monument' },
  { id: 'windmill',     label: 'Tuulivoimala',   faClass: 'fa-solid fa-wind' },
  { id: 'tower',        label: 'Torni',          faClass: 'fa-solid fa-tower-observation' },

  // --- Ruoka ja hauskanpito ---
  { id: 'hamburger',    label: 'Pikaruoka',      faClass: 'fa-solid fa-burger' },
  { id: 'ice-cream',    label: 'Jäätelö',        faClass: 'fa-solid fa-ice-cream' },
  { id: 'pizza',        label: 'Pizza',          faClass: 'fa-solid fa-pizza-slice' },
  { id: 'utensils',     label: 'Ravintola',      faClass: 'fa-solid fa-utensils' },

  // --- Sekalaista ---
  { id: 'camera',       label: 'Valokuvaus',     faClass: 'fa-solid fa-camera' },
  { id: 'moon',         label: 'Yöajelu',        faClass: 'fa-solid fa-moon' },
  { id: 'star',         label: 'Tähdet',         faClass: 'fa-solid fa-star' },
  { id: 'map-pin',      label: 'Karttatappi',    faClass: 'fa-solid fa-location-dot' },
  { id: 'suitcase',     label: 'Matkalaukku',    faClass: 'fa-solid fa-suitcase' },
  { id: 'music',        label: 'Automusiikki',   faClass: 'fa-solid fa-music' },
]

export default BUILTIN_ITEMS
