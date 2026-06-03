import { useState } from 'react'

function AccordionItem({ question, answer, isOpen, onToggle, index }) {
  const panelId = `accordion-panel-${index}`
  const btnId = `accordion-btn-${index}`

  return (
    <div className="accordion__item">
      <button
        id={btnId}
        className="accordion__btn"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {question}
        <svg
          className={`accordion__icon${isOpen ? ' accordion__icon--open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`accordion__panel${isOpen ? ' accordion__panel--open' : ''}`}
      >
        <p className="accordion__content">{answer}</p>
      </div>
    </div>
  )
}

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          index={i}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  )
}
