/* Media manifest. Generated from sambhav_media/ by the build-time image pipeline.
 *
 * Every displayed photograph is listed here once, so no component hardcodes a
 * file path. Derivatives live in public/media/ as <slug>-<width>.<avif|webp|jpg>
 * at 480 / 960 / 1440 / 2000 px wide (a width is only present if the source was
 * at least that wide: nothing is upscaled past its native resolution).
 * No single derivative exceeds 400 KB.
 *
 * `w` / `h` are the intrinsic dimensions of the LARGEST derivative and exist so
 * every <img> can carry width/height and reserve its space before it loads.
 * `alt` describes what is actually in the photograph.
 */

const BASE = '/media'

/** Build a srcSet string for one format, e.g. srcSet(img, 'webp'). */
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
 * it is preloaded and never lazy loaded. */
export const HERO = [
    {
      slug: 'hero-school-gate',
      alt: "A decorated entrance archway at a school in Narasaraopet, the school name painted in Telugu across the arch.",
      widths: [480, 960, 1440, 2000],
      w: 2000, h: 1500,
      objectPosition: 'center 45%',
    },
    {
      slug: 'hero-ammanabrolu-school',
      alt: "A single storey school building in Ammanabrolu with a blue Telugu signboard above the entrance, palm trees behind it and a fenced lawn in front.",
      widths: [480, 960, 1440, 2000],
      w: 2000, h: 1500,
      objectPosition: 'center 40%',
    },
    {
      slug: 'hero-supply-table',
      alt: "Volunteers and teachers standing behind a table covered in purple cloth, stacked with boxes of school supplies ready to hand out.",
      widths: [480, 960, 1440, 2000],
      w: 2000, h: 1500,
      objectPosition: 'center 35%',
    },
    {
      slug: 'hero-distribution-bunting',
      alt: "Students and volunteers gathered under coloured bunting outside a school as supply kits are handed across a table.",
      widths: [480, 960, 1440, 2000],
      w: 2000, h: 1125,
      objectPosition: 'center 40%',
    },
    {
      slug: 'hero-students-waiting',
      alt: "Students waiting beside a supply table under a canopy during a school distribution.",
      widths: [480, 960, 1440, 2000],
      w: 2000, h: 1125,
      objectPosition: 'center 40%',
    },
]

/* Photographs used on the Learning Kits campaign page. */
export const KITS = [
    {
      slug: 'kit-request',
      alt: "A teacher and volunteers talking beside stacks of notebooks in a school room, working out what each grade needs.",
      widths: [480, 960, 1440],
      w: 1440, h: 1440,
      objectPosition: 'center',
    },
    {
      slug: 'kit-grade-banding',
      alt: "A single kit laid out flat: Telugu, Mathematics and Biology textbooks with a notebook and stationery.",
      widths: [480, 960, 1440],
      w: 1440, h: 1920,
      objectPosition: 'center',
    },
    {
      slug: 'kit-wholesale',
      alt: "Stacks of new textbooks and notebooks piled on a chair and table before packing.",
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
      slug: 'kit-delivery',
      alt: "A volunteer handing a bundle of notebooks to a student in a classroom, with more stacks waiting on the table.",
      widths: [480, 960, 1440],
      w: 1440, h: 1440,
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
      alt: "Three stacks of Class 10 Biology textbooks on a tiled floor.",
      widths: [480, 960, 1440, 2000],
      w: 2000, h: 1500,
      objectPosition: 'center',
    },
    {
      slug: 'kit-library-floor',
      alt: "Students seated on the floor of a school library sorting through stacks of new notebooks.",
      widths: [480, 960, 1440],
      w: 1440, h: 1440,
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
      alt: "School supplies being handed to students in a classroom doorway.",
      widths: [480, 960, 1440, 2000],
      w: 2000, h: 1125,
      objectPosition: 'center',
    },
    {
      slug: 'nrp-classroom',
      alt: "A volunteer passing a stack of notebooks to a student in a classroom of waiting children.",
      widths: [480, 960, 1440],
      w: 1440, h: 1440,
      objectPosition: 'center',
    },
]

/* Photographs shown in the Ammanabrolu act of the impact map. */
export const AMMANABROLU = [
    {
      slug: 'amm-school-front',
      alt: "The front of a school building in Ammanabrolu with its name painted in Telugu above the veranda.",
      widths: [480, 960, 1440, 2000],
      w: 2000, h: 1500,
      objectPosition: 'center',
    },
    {
      slug: 'amm-school-road',
      alt: "A school building in Ammanabrolu seen from the roadside, with a blue Telugu signboard and palm trees behind.",
      widths: [480, 960, 1440, 2000],
      w: 2000, h: 1500,
      objectPosition: 'center',
    },
]

/* Keyed lookup for one-off use. */
export const BY_SLUG = Object.fromEntries(
  [...HERO, ...KITS, ...NARASARAOPET, ...AMMANABROLU].map((i) => [i.slug, i])
)

/* Promotional video. 1280x720 h264 + AAC, 28.4s, 8.2 MB, self hosted.
 * The poster frame is pulled from the video itself (at 19s) so there is no
 * visual jump when playback starts. */
export const PROMO_VIDEO = {
  src: '/media/sambhav-promo.mp4',
  poster: '/media/promo-poster-1440.jpg',
  posterWidths: [960, 1440],
  posterSlug: 'promo-poster',
  width: 1280,
  height: 720,
  durationSeconds: 28,
  captions: '/media/sambhav-promo.en.vtt',
}
