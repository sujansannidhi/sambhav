/* Media manifest. Generated from sambhav_media/ by the build-time image pipeline.
 *
 * Every displayed photograph is listed here once, so no component hardcodes a
 * file path. Derivatives live in public/media/ as <slug>-<width>.<avif|webp|jpg>
 * at 480 / 960 / 1440 / 2000 px wide (a width only exists if the source was at
 * least that wide: nothing is upscaled past its native resolution). Document
 * scans additionally get their native width so the handwriting stays readable.
 * No single derivative exceeds 400 KB.
 *
 * `w` / `h` are the intrinsic dimensions of the LARGEST derivative, so every
 * <img> can reserve its space before it loads. `alt` describes what is actually
 * in the photograph.
 */

const BASE = '/media'

/** srcSet string for one format, e.g. srcSet(img, 'webp'). */
export function srcSet(img, ext) {
  return img.widths.map((w) => `${BASE}/${img.slug}-${w}.${ext} ${w}w`).join(', ')
}

/** Largest jpg, used as the <img src> fallback. */
export function fallback(img) {
  return `${BASE}/${img.slug}-${img.widths[img.widths.length - 1]}.jpg`
}

/** A specific width, for preload links and posters. */
export function at(img, width, ext = 'jpg') {
  return `${BASE}/${img.slug}-${width}.${ext}`
}

/* Hero carousel frames, in rotation order. The first is the LCP element:
 * it is preloaded and never lazy loaded. Later frames load just ahead of their turn. */
export const HERO = [
  {
    slug: 'hero-01-courtyard',
    alt: "Students seated on the ground in the courtyard of Sri Silman Memorial Municipal Primary School as supplies are handed out.",
    widths: [480, 960],
    w: 960, h: 720,
    objectPosition: 'center 45%',
  },
  {
    slug: 'hero-02-corridor',
    alt: "Students and volunteers gathered together in a school corridor, the children holding their new supplies.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1125,
    objectPosition: 'center 40%',
  },
  {
    slug: 'hero-03-gate',
    alt: "The decorated entrance archway of Shri Lal Bahadur Municipal High School, the school name painted in Telugu across the arch.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1500,
    objectPosition: 'center 45%',
  },
  {
    slug: 'hero-04-kit-pack',
    alt: "A wrapped kit with a Sambhav label on it: ruled notebooks and a geometry box.",
    widths: [480, 960, 1440],
    w: 1440, h: 1920,
    objectPosition: 'center 40%',
  },
  {
    slug: 'hero-05-kits-laid',
    alt: "Several wrapped kits laid out on a purple cloth, each holding notebooks and a geometry box.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1500,
    objectPosition: 'center 45%',
  },
  {
    slug: 'hero-06-bunting',
    alt: "Volunteers and teachers handing kits to students under coloured bunting outside a school.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1125,
    objectPosition: 'center 40%',
  },
  {
    slug: 'hero-07-textbooks',
    alt: "Stacks of new Class 10 Biology textbooks and notebooks piled on a chair and table before packing.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1500,
    objectPosition: 'center 45%',
  },
  {
    slug: 'hero-08-waiting',
    alt: "Students in uniform crowded into a school corridor, waiting for the distribution to begin.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1251,
    objectPosition: 'center 40%',
  },
  {
    slug: 'hero-09-seated',
    alt: "A large group of younger students seated on the ground outside a classroom during the distribution.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1120,
    objectPosition: 'center 40%',
  },
  {
    slug: 'hero-10-holding-up',
    alt: "Students at their desks holding up new notebook sets, one standing and waving.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1120,
    objectPosition: 'center 40%',
  },
  {
    slug: 'hero-11-from-box',
    alt: "A volunteer lifting kits out of a cardboard box and handing them to students crowding around the table.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1125,
    objectPosition: 'center 40%',
  },
  {
    slug: 'hero-12-bundles',
    alt: "Bundled stacks of notebooks and stationery piled on a desk, ready to be handed out.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1117,
    objectPosition: 'center 45%',
  },
  {
    slug: 'hero-13-table',
    alt: "Volunteers handing kits across a table to a queue of students at a school.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1125,
    objectPosition: 'center 40%',
  },
]

/* The written requests the teachers gave us, school by school. These are the
 * source documents step one of the campaign is built on. */
export const REQUISITIONS = [
  {
    slug: 'req-1',
    alt: "A handwritten requisition from MPPS (BC) Kesanapalli, listing class by class the four ruled, double ruled, white and check ruled notebooks, a slate, colour pencils and a tables book.",
    widths: [480, 763],
    w: 763, h: 1094,
    objectPosition: 'center',
  },
  {
    slug: 'req-2',
    alt: "A handwritten requisition from M.P.P School, Barampet, breaking the same notebook types down class by class.",
    widths: [480, 761],
    w: 761, h: 1088,
    objectPosition: 'center',
  },
  {
    slug: 'req-3',
    alt: "A handwritten requisition covering classes IV and V, ending with a request for 30 water bottles.",
    widths: [480, 759],
    w: 759, h: 696,
    objectPosition: 'center',
  },
  {
    slug: 'req-4',
    alt: "A handwritten sheet totalling how many sets each class needs.",
    widths: [480, 782],
    w: 782, h: 1084,
    objectPosition: 'center',
  },
  {
    slug: 'req-5',
    alt: "A handwritten sheet listing items and set counts for the higher classes, with writing pads and water bottles totalled at the bottom.",
    widths: [480, 636],
    w: 636, h: 906,
    objectPosition: 'center',
  },
  {
    slug: 'req-6',
    alt: "A priced inventory sheet for MPPS (BC) Kesanapally: quantities and unit prices for notebooks, water bottles, exam pads, slates, colour pencils, geometry boxes and book bags.",
    widths: [480, 763],
    w: 763, h: 706,
    objectPosition: 'center',
  },
]

/* The school's own distribution record, listing items per set and sets per class. */
export const GRADE_DOCS = [
  {
    slug: 'grade-doc-1',
    alt: "A typed distribution record listing, for each class, the items in a set and the number of sets handed out.",
    widths: [480, 720],
    w: 720, h: 1312,
    objectPosition: 'center',
  },
  {
    slug: 'grade-doc-2',
    alt: "The second page of the school distribution record, covering classes 8 to 10 and signed by the headmaster of Sri Lal Bahadur Mpl High School.",
    widths: [480, 763],
    w: 763, h: 812,
    objectPosition: 'center',
  },
]

/* Photographs used across the Learning Kits campaign page. */
export const KITS = [
  {
    slug: 'kit-grade-banding',
    alt: "A single kit laid out flat: Telugu, Mathematics and Biology textbooks with a notebook and stationery.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1500,
    objectPosition: 'center',
  },
  {
    slug: 'kit-wholesale',
    alt: "Stacks of new textbooks and notebooks piled up before packing.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1500,
    objectPosition: 'center',
  },
  {
    slug: 'kit-packing',
    alt: "An assembled kit laid out on a purple cloth: notebooks, a geometry box and coloured stationery packs.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1500,
    objectPosition: 'center',
  },
  {
    slug: 'kit-contents',
    alt: "A geometry box and a shrink wrapped set of notebooks laid out on a purple cloth.",
    widths: [480, 960, 1440],
    w: 1440, h: 1920,
    objectPosition: 'center',
  },
  {
    slug: 'kit-textbook-stacks',
    alt: "Stacks of new textbooks waiting to be sorted into kits.",
    widths: [480, 960, 1440],
    w: 1440, h: 1080,
    objectPosition: 'center',
  },
  {
    slug: 'kit-courtyard',
    alt: "Students standing in a school courtyard holding newly received notebooks and supplies.",
    widths: [480, 960],
    w: 960, h: 720,
    objectPosition: 'center',
  },
]

/* Photographs for the handover section, the day the kits reach the students. */
export const HANDOVER = [
  {
    slug: 'hand-1',
    alt: "A boy in school uniform carrying his wrapped kit away from the stack, with volunteers and other students behind him.",
    widths: [480, 960, 1440],
    w: 1440, h: 1440,
    objectPosition: 'center',
  },
  {
    slug: 'hand-2',
    alt: "A volunteer handing a wrapped kit to a girl in a classroom while other children wait their turn.",
    widths: [480, 960, 1440],
    w: 1440, h: 1440,
    objectPosition: 'center',
  },
  {
    slug: 'hand-3',
    alt: "Volunteers and a teacher handing supplies to students beside a classroom window.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1125,
    objectPosition: 'center',
  },
  {
    slug: 'hand-4',
    alt: "Volunteers and teachers passing supplies to students gathered in a school corridor.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1125,
    objectPosition: 'center',
  },
  {
    slug: 'hand-5',
    alt: "Kits handed across a table under coloured bunting in a school courtyard.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1125,
    objectPosition: 'center',
  },
  {
    slug: 'hand-6',
    alt: "Students seated on the floor of a school room, each with a new set of books.",
    widths: [480, 960, 1440],
    w: 1440, h: 1440,
    objectPosition: 'center',
  },
]

/* Photographs shown in the Narasaraopet act of the impact map. */
export const NARASARAOPET = [
  {
    slug: 'nrp-corridor',
    alt: "Students holding new supplies standing with volunteers and teachers in a school corridor.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1125,
    objectPosition: 'center',
  },
  {
    slug: 'nrp-doorway',
    alt: "Volunteers handing out notebooks to a crowd of students in a classroom doorway.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1125,
    objectPosition: 'center',
  },
  {
    slug: 'nrp-classroom',
    alt: "A volunteer passing notebooks to a student in a classroom of waiting children.",
    widths: [480, 960, 1440],
    w: 1440, h: 1440,
    objectPosition: 'center',
  },
]

/* Photographs shown in the Ammanabrolu act of the impact map. */
export const AMMANABROLU = [
  {
    slug: 'amm-school-front',
    alt: "The front of a school building in Ammanabrolu, its name painted in Telugu above the veranda, with people standing in the doorway.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1500,
    objectPosition: 'center',
  },
  {
    slug: 'amm-school-road',
    alt: "A school building in Ammanabrolu seen from the roadside, with a blue Telugu signboard, palm trees behind and a fenced lawn in front.",
    widths: [480, 960, 1440, 2000],
    w: 2000, h: 1500,
    objectPosition: 'center',
  },
]

/* Keyed lookup for one-off use. */
export const BY_SLUG = Object.fromEntries(
  [...HERO, ...REQUISITIONS, ...GRADE_DOCS, ...KITS, ...HANDOVER, ...NARASARAOPET, ...AMMANABROLU]
    .map((i) => [i.slug, i])
)

/* Promotional video. 1280x720 h264 + AAC, 28.4s, self hosted. The poster frame
 * comes from the video itself (at 19s) so there is no jump when playback starts. */
export const PROMO_VIDEO = {
  src: '/media/sambhav-promo.mp4',
  poster: '/media/promo-poster-1440.jpg',
  width: 1280,
  height: 720,
  durationSeconds: 28,
}

/* Handover footage. All transcoded to H.264 with faststart, so playback can begin
 * before the file finishes downloading. Each carries a poster pulled from its own
 * first seconds. Nothing loads until the viewer presses play. */
export function videoPoster(video, width = 960, ext = 'jpg') {
  /* Two of the clips are only 816px wide, so a 960 poster was never generated
     for them. Clamp to the largest width that actually exists rather than
     pointing at a 404. */
  const available = video.posterWidths || [480]
  const best = available.filter((w) => w <= width).pop() ?? available[0]
  return `/media/video/${video.slug}-poster-${best}.${ext}`
}

export const HANDOVER_VIDEOS = [
  {
    slug: 'handover-classroom',
    posterWidths: [480, 960],
    src: '/media/video/handover-classroom.mp4',
    alt: "Volunteers handing kits across a table to students queuing in a school courtyard.",
    seconds: 20, w: 1024, h: 576,
  },
  {
    slug: 'handover-line',
    posterWidths: [480, 960],
    src: '/media/video/handover-line.mp4',
    alt: "Students filing past the supply table one by one to collect their kit.",
    seconds: 81, w: 1280, h: 720,
  },
  {
    slug: 'handover-whatsapp-1',
    posterWidths: [480],
    src: '/media/video/handover-whatsapp-1.mp4',
    alt: "Kits being passed out to students inside a classroom.",
    seconds: 18, w: 816, h: 464,
  },
  {
    slug: 'handover-whatsapp-2',
    posterWidths: [480],
    src: '/media/video/handover-whatsapp-2.mp4',
    alt: "A full distribution session at one of the Narasaraopet schools.",
    seconds: 354, w: 816, h: 464,
  },
  {
    slug: 'handover-amm-1',
    posterWidths: [480, 960],
    src: '/media/video/handover-amm-1.mp4',
    alt: "A student receiving a bundle of notebooks at Ammanabrolu.",
    seconds: 3, w: 1280, h: 720,
  },
  {
    slug: 'handover-amm-2',
    posterWidths: [480, 960],
    src: '/media/video/handover-amm-2.mp4',
    alt: "Kits stacked and ready to hand out at Ammanabrolu.",
    seconds: 2, w: 1280, h: 720,
  },
]
