const en = {
  // ── App / header ───────────────────────────────────────────────
  appTitle:               'Road Trip Bingo',
  headerBingo:            'Bingo',
  backToSetup:            'Back to setup',
  showSeedTooltip:        'Show game seed',

  // ── Language selector ──────────────────────────────────────────
  languageLabel:          'Language',

  // ── SetupScreen ────────────────────────────────────────────────
  boardSizeLegend:        'Board Size',
  gridOption4:            '4×4  (16 squares)',
  gridOption5:            '5×5  (25 squares)',
  gridOption6:            '6×6  (36 squares)',
  // {needs} and {pool} are replaced at runtime
  gridDisabledTitle:      'Need {needs} items, only {pool} available',
  gridNeedMoreIcons:      'need more icons',

  freeCenterLegend:       'Free Center Square',
  freeCenterYes:          'Yes',
  freeCenterNo:           'No',
  // {size} is replaced at runtime
  freeCenterEvenNote:     'Free square only works on odd grid sizes (5×5). Disabled for {size}×{size}.',

  winModeLegend:          'Win Condition',
  winModeLine:            'Line',
  winModeBlackout:        'Blackout',

  seedLegend:             'Game Seed',
  seedLegendHint:         'share with friends for the same board',
  seedAriaLabel:          'Game seed code',
  seedNewTooltip:         'Generate new seed',

  // {pool}, {needs} and {size} are replaced at runtime
  poolBarInfo:            '{pool} icons · need {needs} ({size}×{size})',
  editIconsButton:        'Edit Icons',
  startGameButton:        'Start Game',

  // ── WinBanner ──────────────────────────────────────────────────
  winAriaLabel:           'You won!',
  winTitle:               'BINGO!',
  winSubLine:             'You completed a line!',
  winSubBlackout:         'Full card — amazing!',
  newGameButton:          'New Game',

  // ── SeedModal ──────────────────────────────────────────────────
  seedModalAriaLabel:     'Game seed',
  seedModalTitle:         'Game Seed',
  seedModalHint:          'Share this code with another device to play on the same board.',
  seedModalCloseAriaLabel:'Close',
  copyButton:             'Copy',
  copiedButton:           'Copied!',

  // ── ItemEditor ─────────────────────────────────────────────────
  editorBackAriaLabel:    'Back',
  editorTitle:            'Edit Icons',
  // {count} is replaced at runtime
  editorTotalCount:       '{count} total',
  editorAddTitle:         'Add a New Icon',
  editorAddHintPre:       'Use any',
  editorAddHintLink:      'Font Awesome 6 Free',
  editorAddHintPost:      'icon class, e.g.',
  editorPreviewTitle:     'Icon preview',
  editorLabelPlaceholder: 'Label, e.g. "Guitar"',
  editorClassPlaceholder: 'FA class, e.g. "fa-solid fa-guitar"',
  editorAddButton:        'Add',
  editorAddedSuccess:     'Icon added!',
  // {count} is replaced at runtime
  customIconsTitle:       'Custom Icons ({count})',
  // {label} is replaced at runtime
  removeAriaLabel:        'Remove {label}',
  // {count} is replaced at runtime
  builtinIconsTitle:      'Built-in Icons ({count} — cannot be removed)',
  builtinLockAriaLabel:   'Built-in',

  // ── Validation errors (itemStore) ──────────────────────────────
  errorLabelEmpty:        'Label cannot be empty.',
  errorClassInvalid:      'Icon class must start with "fa" (e.g. fa-solid fa-guitar).',
  errorDuplicate:         'An item with that icon class already exists.',

  // ── boardGenerator error ────────────────────────────────────────
  // {pool}, {size}, {needs} replaced at runtime
  errorNotEnoughItems:    'Not enough icons ({pool}) for a {size}×{size} board (need {needs}).',

  // ── Free center cell label (on the board) ──────────────────────
  freeCellLabel:          'FREE',

  // ── Built-in item labels ────────────────────────────────────────
  items: {
    car:            'Car',
    truck:          'Truck',
    bus:            'Bus',
    motorcycle:     'Motorcycle',
    bicycle:        'Bicycle',
    tractor:        'Tractor',
    rv:             'Camper Van',
    ambulance:      'Ambulance',
    firetruck:      'Fire Truck',
    police:         'Police Car',
    'traffic-light':'Traffic Light',
    'gas-pump':     'Gas Station',
    road:           'Road Sign',
    bridge:         'Bridge',
    parking:        'Parking Lot',
    plane:          'Airplane',
    train:          'Train',
    helicopter:     'Helicopter',
    tree:           'Tree',
    mountain:       'Mountain',
    water:          'River / Lake',
    campground:     'Campsite',
    leaf:           'Forest',
    paw:            'Wild Animal',
    dog:            'Dog',
    horse:          'Horse',
    crow:           'Bird',
    fish:           'Fish',
    spider:         'Bug',
    sun:            'Sunny Sky',
    cloud:          'Clouds',
    'cloud-rain':   'Rain',
    snowflake:      'Snow',
    wind:           'Windy',
    rainbow:        'Rainbow',
    bolt:           'Lightning',
    church:         'Church',
    school:         'School',
    hospital:       'Hospital',
    store:          'Shop',
    flag:           'Flag',
    monument:       'Monument',
    windmill:       'Wind Turbine',
    tower:          'Tower',
    hamburger:      'Fast Food',
    'ice-cream':    'Ice Cream',
    pizza:          'Pizza',
    utensils:       'Restaurant',
    camera:         'Photo Stop',
    moon:           'Night Drive',
    star:           'Stars',
    'map-pin':      'Map Pin',
    suitcase:       'Luggage',
    music:          'Car Music',
  },
}

export default en
