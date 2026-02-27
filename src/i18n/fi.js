/**
 * Finnish translations (fi)
 *
 * All user-visible strings live here.
 * To translate the app to another language:
 *   1. Copy this file, rename it (e.g. en.js)
 *   2. Replace all the string values below
 *   3. Change the import in src/i18n/index.js to point at your new file
 */

const fi = {
  // ── App / header ───────────────────────────────────────────────
  appTitle:               'Matka-Bingo',
  headerBingo:            'Bingo',
  backToSetup:            'Takaisin asetuksiin',
  showSeedTooltip:        'Näytä pelin koodi',

  // ── SetupScreen ────────────────────────────────────────────────
  boardSizeLegend:        'Laudan koko',
  gridOption4:            '4×4  (16 ruutua)',
  gridOption5:            '5×5  (25 ruutua)',
  gridOption6:            '6×6  (36 ruutua)',
  // {needs} and {pool} are replaced at runtime
  gridDisabledTitle:      'Tarvitaan {needs} kohdetta, vain {pool} saatavilla',
  gridNeedMoreIcons:      'tarvitaan lisää kuvakkeita',

  freeCenterLegend:       'Vapaa keskiruutu',
  freeCenterYes:          'Kyllä',
  freeCenterNo:           'Ei',
  // {size} is replaced at runtime
  freeCenterEvenNote:     'Vapaa ruutu toimii vain parittomilla ruudukoilla (5×5). Poistettu käytöstä {size}×{size}:lle.',

  winModeLegend:          'Voittoehto',
  winModeLine:            'Rivi',
  winModeBlackout:        'Täysi lauta',

  seedLegend:             'Pelin koodi',
  seedLegendHint:         'jaa kaverille samaa lautaa varten',
  seedAriaLabel:          'Pelin koodi',
  seedNewTooltip:         'Luo uusi koodi',

  // {pool} and {needs} and {size} are replaced at runtime
  poolBarInfo:            '{pool} kuvaketta · tarvitaan {needs} ({size}×{size})',
  editIconsButton:        'Muokkaa kuvakkeita',
  startGameButton:        'Aloita peli',

  // ── WinBanner ──────────────────────────────────────────────────
  winAriaLabel:           'Voitit!',
  winTitle:               'BINGO!',
  winSubLine:             'Sait rivin täyteen!',
  winSubBlackout:         'Täysi lauta — mahtavaa!',
  newGameButton:          'Uusi peli',

  // ── SeedModal ──────────────────────────────────────────────────
  seedModalAriaLabel:     'Pelin koodi',
  seedModalTitle:         'Pelin koodi',
  seedModalHint:          'Jaa tämä koodi toiselle laitteelle pelataksesi samalla laudalla.',
  seedModalCloseAriaLabel:'Sulje',
  copyButton:             'Kopioi',
  copiedButton:           'Kopioitu!',

  // ── ItemEditor ─────────────────────────────────────────────────
  editorBackAriaLabel:    'Takaisin',
  editorTitle:            'Muokkaa kuvakkeita',
  // {count} is replaced at runtime
  editorTotalCount:       '{count} yhteensä',
  editorAddTitle:         'Lisää uusi kuvake',
  editorAddHintPre:       'Käytä mitä tahansa',
  editorAddHintLink:      'Font Awesome 6 Free',
  editorAddHintPost:      '-kuvakeluokkaa, esim.',
  editorPreviewTitle:     'Kuvakkeen esikatselu',
  editorLabelPlaceholder: 'Nimi, esim. "Kitara"',
  editorClassPlaceholder: 'FA-luokka, esim. "fa-solid fa-guitar"',
  editorAddButton:        'Lisää',
  editorAddedSuccess:     'Kuvake lisätty!',
  // {count} is replaced at runtime
  customIconsTitle:       'Omat kuvakkeet ({count})',
  // {id} is for aria-label, replaced at runtime
  removeAriaLabel:        'Poista {label}',
  // {count} is replaced at runtime
  builtinIconsTitle:      'Valmiit kuvakkeet ({count} — ei voi poistaa)',
  builtinLockAriaLabel:   'Valmis kuvake',

  // ── Validation errors (itemStore) ──────────────────────────────
  errorLabelEmpty:        'Nimi ei voi olla tyhjä.',
  errorClassInvalid:      'Kuvakeluokan täytyy alkaa "fa"-kirjaimilla (esim. fa-solid fa-guitar).',
  errorDuplicate:         'Tämä kuvake on jo olemassa.',

  // ── boardGenerator error ────────────────────────────────────────
  // {pool}, {size}, {needs} replaced at runtime
  errorNotEnoughItems:    'Liian vähän kuvakkeita ({pool}) {size}×{size}-laudalle (tarvitaan {needs}).',

  // ── Free center cell label (on the board) ──────────────────────
  freeCellLabel:          'VAPAA',

  // ── Built-in item labels ────────────────────────────────────────
  items: {
    car:            'Auto',
    truck:          'Rekka',
    bus:            'Bussi',
    motorcycle:     'Moottoripyörä',
    bicycle:        'Polkupyörä',
    tractor:        'Traktori',
    rv:             'Matkailuauto',
    ambulance:      'Ambulanssi',
    firetruck:      'Paloauto',
    police:         'Poliisiauto',
    'traffic-light':'Liikennevalo',
    'gas-pump':     'Huoltoasema',
    road:           'Tienvitta',
    bridge:         'Silta',
    parking:        'Parkkipaikka',
    plane:          'Lentokone',
    train:          'Juna',
    helicopter:     'Helikopteri',
    tree:           'Puu',
    mountain:       'Vuori',
    water:          'Joki / Järvi',
    campground:     'Leirintäalue',
    leaf:           'Metsä',
    paw:            'Villieläin',
    dog:            'Koira',
    horse:          'Hevonen',
    crow:           'Lintu',
    fish:           'Kala',
    spider:         'Hyönteinen',
    sun:            'Aurinkoinen',
    cloud:          'Pilviä',
    'cloud-rain':   'Sade',
    snowflake:      'Lumi',
    wind:           'Tuulinen',
    rainbow:        'Sateenkaari',
    bolt:           'Salama',
    church:         'Kirkko',
    school:         'Koulu',
    hospital:       'Sairaala',
    store:          'Kauppa',
    flag:           'Lippu',
    monument:       'Muistomerkki',
    windmill:       'Tuulivoimala',
    tower:          'Torni',
    hamburger:      'Pikaruoka',
    'ice-cream':    'Jäätelö',
    pizza:          'Pizza',
    utensils:       'Ravintola',
    camera:         'Valokuvaus',
    moon:           'Yöajelu',
    star:           'Tähdet',
    'map-pin':      'Karttatappi',
    suitcase:       'Matkalaukku',
    music:          'Automusiikki',
  },
}

export default fi
