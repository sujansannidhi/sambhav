// Curated Unsplash stock images
// Replace any of these with real project photos before launch.
// Format: https://images.unsplash.com/photo-{ID}?w={W}&q=75&auto=format&fit=crop

const U = (id, w = 900, crop = '') =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop${crop}`

// ── Education / Students ────────────────────────────────────
export const IMG_CLASSROOM_HERO   = U('1503676260728-1c00da094a0b', 1200)  // kids in school
export const IMG_CLASSROOM_2      = U('1580582932707-520aed937b7b', 900)   // students at desks
export const IMG_CHILDREN_SMILING = U('1488521787991-ed7bbaae773c', 900)   // children smiling
export const IMG_CHILD_READING    = U('1452570053594-1b985d6ea890', 900)   // kid with book
export const IMG_STUDYING         = U('1516979187457-637abb4f9353', 900)   // desk & study

// ── Supplies ────────────────────────────────────────────────
export const IMG_PENCILS          = U('1456735190-dc3463dea171', 900)      // coloured pencils
export const IMG_BOOKS            = U('1497633762265-9d179a990aa6', 900)   // stacked books
export const IMG_NOTEBOOK         = U('1434030216411-0b793f4b4173', 900)   // notebook + pen

// ── Field / Market ──────────────────────────────────────────
export const IMG_MARKET           = U('1543158994-6cf1421cd7f2', 900)     // vibrant market

// ── Portraits ───────────────────────────────────────────────
export const IMG_FOUNDER          = U('1529156069898-49953e39b3ac', 600, '&crop=faces')

// ── Documents / Receipts ────────────────────────────────────
export const IMG_RECEIPT          = U('1554224155-6726b3ff858f', 500)
export const IMG_LETTER           = U('1606107557195-0e29a4b5b4aa', 600)

// ── Coming-soon programs ────────────────────────────────────
export const IMG_WATER            = U('1559827291-72ee739d0d9a', 900)     // water / hands
export const IMG_HEALTH           = U('1576091160550-2173dba999ef', 900)  // medical

// ── Delivery-day gallery (Impact page) ──────────────────────
export const IMG_DELIVERY = [
  U('1503676260728-1c00da094a0b', 1100),   // large hero - classroom
  U('1456735190-dc3463dea171', 900),        // supplies packed
  U('1488521787991-ed7bbaae773c', 900),     // children
  U('1580582932707-520aed937b7b', 900),     // classroom 2
  U('1452570053594-1b985d6ea890', 900),     // reading
  U('1516979187457-637abb4f9353', 900),     // studying
]

// ── Receipt thumbnails ──────────────────────────────────────
export const IMG_RECEIPTS = [
  U('1554224155-6726b3ff858f', 500),
  U('1554224155-6726b3ff858f', 500, '&crop=bottom'),
  U('1554224155-6726b3ff858f', 500, '&crop=top'),
  U('1554224155-6726b3ff858f', 500, '&crop=left'),
  U('1554224155-6726b3ff858f', 500, '&crop=right'),
  U('1554224155-6726b3ff858f', 500, '&crop=center'),
]

// ── School letters ──────────────────────────────────────────
export const IMG_LETTERS = [
  U('1606107557195-0e29a4b5b4aa', 600),
  U('1606107557195-0e29a4b5b4aa', 600, '&crop=bottom'),
]
