export default function JaliDivider({ dark = false }) {
  return (
    <div className="jali-divider" role="separator" aria-hidden="true">
      <div className="jali-divider__line" style={dark ? { opacity: 0.2 } : {}} />
      <div className="jali-divider__motif">
        <div className="jali-diamond jali-diamond--sm" />
        <div className="jali-diamond" />
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1" fill="none" style={{color: 'var(--gold-line)'}} />
          <rect x="6.5" y="6.5" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="0.75" fill="none" style={{color: 'var(--gold-line)'}} />
          <circle cx="9" cy="9" r="1" fill="currentColor" style={{color: 'var(--gold-line)'}} />
        </svg>
        <div className="jali-diamond" />
        <div className="jali-diamond jali-diamond--sm" />
      </div>
      <div className="jali-divider__line" style={dark ? { opacity: 0.2 } : {}} />
    </div>
  )
}
