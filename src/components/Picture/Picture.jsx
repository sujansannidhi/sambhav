import { srcSet, fallback } from '../../data/media'

/* Responsive <picture> for anything in the media manifest.
 *
 * Serves avif, then webp, then the jpg fallback. Always emits intrinsic
 * width/height so the browser reserves the space and the layout does not shift
 * while the image loads.
 *
 * `priority` marks the one image that is the largest contentful paint (the first
 * hero frame). Everything else lazy loads.
 */
export default function Picture({
  img,
  sizes = '100vw',
  className = '',
  priority = false,
  decorative = false,
  style,
}) {
  if (!img) return null

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(img, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(img, 'webp')} sizes={sizes} />
      <img
        src={fallback(img)}
        srcSet={srcSet(img, 'jpg')}
        sizes={sizes}
        /* Decorative images repeated from elsewhere on the page take alt="" so
           screen readers do not hear the same description twice. */
        alt={decorative ? '' : img.alt}
        width={img.w}
        height={img.h}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        /* Lowercase: React 18 does not recognise the camelCase `fetchPriority`
           prop and drops the attribute entirely. */
        fetchpriority={priority ? 'high' : undefined}
        style={{ objectPosition: img.objectPosition, ...style }}
      />
    </picture>
  )
}
