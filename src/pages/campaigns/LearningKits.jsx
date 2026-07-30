import { Link } from 'react-router-dom'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../../components/JaliDivider/JaliDivider'
import Picture from '../../components/Picture/Picture'
import MediaCarousel from '../../components/MediaCarousel/MediaCarousel'
import Handover from '../../components/Handover/Handover'
import ImpactCounters from '../../components/ImpactCounters/ImpactCounters'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { BY_SLUG, REQUISITIONS, GRADE_DOCS } from '../../data/media'
import '../Home.css'
import './LearningKits.css'

/* Learning Kits.
 *
 * Every factual claim on this page comes from "Sambhav Proof Of Concept",
 * pages 3 to 5. Where the page structure asks for something the document does
 * not contain, the section carries a visible [NEEDS INPUT] marker rather than
 * plausible filler.
 */

/* Source: page 4, "After doing our due diligence..." through
 * "...rolled them through the streets to the schools." */
const STEPS = [
  {
    n: '01',
    title: 'Teachers say what they need',
    body:
      'We went to each school in person and asked what they were short of. The requests came back handwritten, class by class, from the people who know which grade runs out of what and when. Those sheets are below, exactly as we received them.',
    gallery: 'requisition',
  },
  {
    n: '02',
    title: 'Needs are separated grade by grade',
    body:
      'Each school\'s list was split out grade by grade, so a Class 2 kit and a Class 9 kit are not the same box with a different label. The school kept its own record of what went to which class, and how many sets.',
    img: 'kit-grade-banding',
    extras: 'gradedoc',
  },
  {
    n: '03',
    title: 'Bought at a local wholesale shop',
    body:
      'A local wholesale shop that specialises in school supplies received a fully detailed inventory list. Buying in the same district keeps the cost per student at about $3.50.',
    img: 'kit-wholesale',
  },
  {
    n: '04',
    title: 'Packed by hand',
    body:
      'A team of volunteers spent the day packaging every component by hand. Packing took about five hours before anything moved.',
    img: 'kit-packing',
  },
]

/* Source: page 5, "WHAT WAS IN A KIT". The document notes this is the kit for
 * MPPS Kesanapalli BC in Narasaraopeta, and that it was similar at many of the
 * other schools. It is not presented as a universal standard. */
const KIT_TABLE = [
  {
    grade: 'Classes I to II',
    items: 'Four-ruled, double-ruled, white and check-ruled notebooks. A slate. Colour pencils.',
  },
  {
    grade: 'Classes III to V',
    items: 'Notebooks. Colour pencils. A tables book. A compass box once geometry begins.',
  },
  { grade: 'Classes VI to VII', items: 'Notebooks. A compass box.' },
  { grade: 'Classes VIII to X', items: 'Notebooks. A compass box. An atlas.' },
]

/* Source: page 4 and 5. Two entries are placeholders in the source document
 * itself, so they are shown as unnamed rather than invented. */
const SCHOOLS = {
  Narasaraopet: [
    'Municipal High School, Paturu',
    'Sri Silman Memorial Municipal Primary School, Barampet',
    'National Public School, Sambasivapet',
    'MPPS Kesanapalli BC, Kesanapalli',
    'M.P.P School, Kesanapalli',
    'Shri Lal Bahadur Mpl High School, Narasaraopet',
  ],
  Ammanabrolu: [
    'APRS Girls, Ammanabrolu',
    'M.P.P School, Ammanabrolu',
    'MPP School Urdu (Mandal Parishad Primary School)',
    'Raided Primary School, Ammanabrolu',
    '[NEEDS INPUT: village school 1 is unnamed in the source document]',
    '[NEEDS INPUT: village school 2 is unnamed in the source document]',
  ],
}

export default function LearningKits() {
  useDocumentTitle(
    'Learning Kits | Sambhav',
    'Learning Kits puts the physical tools of learning into a student\'s hands. Twelve schools across Narasaraopet and Ammanabrolu, over 1,200 students, in June 2026.'
  )

  return (
    <>
      {/* ── 1. OPENING ─────────────────────────────────────── */}
      <section className="lk-hero">
        <div className="container lk-hero__inner">
          <p className="eyebrow eyebrow--light">Campaign, running now</p>
          <h1 className="lk-hero__title">Learning kits</h1>
          <p className="lk-hero__lede">
            Learning Kits buys school supplies at local wholesale prices and hands
            them to students at the start of the school year. Teachers say what
            each grade is short of, volunteers pack the boxes, and the kits are
            delivered in person. The first run covered 12 schools in June 2026.
          </p>
        </div>
      </section>

      {/* ── 2. THE GAP ─────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">The gap</p>
            <h2 className="lk-h2">The state scheme exists. It runs short.</h2>
            <div className="lk-prose">
              <p>
                Andhra Pradesh runs a welfare scheme called Sarvepalli Radhakrishnan
                Vidyarthi Mitra, launched by the state School Education Department.
                It provides free education kits to students in Classes 1 to 10 at
                government schools.
              </p>
              <p>
                In Narasaraopet and Ammanabrolu, teachers told us the same thing at
                several schools. The government materials arrive, but they do not
                last the students as long as they need them to. That is the gap
                Learning Kits fills: not a replacement for the scheme, a top up
                where it runs out.
              </p>
              <p className="lk-needs-input">
                [NEEDS INPUT: the source document states that the scheme's materials
                &ldquo;often did not last them as long as they needed&rdquo; but does
                not list which specific items the scheme covers and which it does
                not. An itemised covered / not covered comparison would make this
                the sharpest argument on the site. It cannot be written without
                that detail.]
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <figure className="lk-break">
        <Picture img={BY_SLUG['kit-courtyard']} sizes="100vw" />
      </figure>

      {/* ── 3. HOW A KIT IS BUILT ──────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">How a kit is built</p>
            <h2 className="lk-h2">Four steps before it ever reaches a student.</h2>
          </ScrollReveal>

          <ol className="lk-steps">
            {/* ScrollReveal renders the <li> itself via `as`: wrapping it in a
                div would put a non-<li> directly inside the <ol>. */}
            {STEPS.map((step, i) => (
              <ScrollReveal
                key={step.n}
                as="li"
                delay={(i % 2) + 1}
                className={
                  step.gallery
                    ? 'lk-step lk-step--wide'
                    : `lk-step${i % 2 ? ' lk-step--flip' : ''}`
                }
              >
                  {/* A step either leads with one photograph, or, where the
                      evidence is a stack of documents, with a scrollable strip. */}
                  {step.gallery ? null : (
                    <div className="lk-step__media">
                      <Picture img={BY_SLUG[step.img]} sizes="(max-width: 860px) 100vw, 46vw" />
                      {step.extras && (
                        <div className="lk-step__extras">
                          {GRADE_DOCS.map((d) => (
                            <Picture key={d.slug} img={d} sizes="(max-width: 860px) 45vw, 22vw" />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="lk-step__text">
                    <span className="lk-step__n">{step.n}</span>
                    <h3 className="lk-step__title">{step.title}</h3>
                    <p>{step.body}</p>
                    {step.gallery === 'requisition' && (
                      <MediaCarousel
                        items={REQUISITIONS}
                        label="Teacher requisition sheets"
                      />
                    )}
                  </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── THE HANDOVER ───────────────────────────────────── */}
      <Handover />

      <JaliDivider />

      {/* ── 4. WHAT IS IN A KIT ────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">What is in a kit</p>
            <h2 className="lk-h2">Designed by the teachers, not by us.</h2>
            <p className="lk-prose lk-prose--tight">
              This is the kit built for MPPS Kesanapalli BC in Narasaraopet. The
              document records it as similar to many of the other schools, not as a
              fixed standard every school received.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="lk-table-wrap">
              <table className="lk-table">
                <caption className="lk-table__caption">
                  Kit contents by grade band, MPPS Kesanapalli BC
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Grade band</th>
                    <th scope="col">What the kit held</th>
                  </tr>
                </thead>
                <tbody>
                  {KIT_TABLE.map((r) => (
                    <tr key={r.grade}>
                      <th scope="row">{r.grade}</th>
                      <td>{r.items}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="lk-table__note">
              Water bottles, writing pads, pencils, erasers and sharpeners went to
              schools that asked for them.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="lk-kit-photos">
              <Picture img={BY_SLUG['kit-contents']} sizes="(max-width: 860px) 100vw, 40vw" />
              <Picture img={BY_SLUG['kit-textbook-stacks']} sizes="(max-width: 860px) 100vw, 40vw" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 5. VERIFICATION ────────────────────────────────── */}
      <section className="section section--dark">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">How it is documented</p>
            <h2 className="lk-h2 lk-h2--light">Every delivery leaves a paper trail.</h2>
            <div className="lk-prose lk-prose--light">
              <p>
                Three things are kept for each school: the written request from the
                teachers, the receipt from the wholesale shop, and the letter from
                the school confirming what arrived.
              </p>
              <p className="lk-needs-input lk-needs-input--light">
                [NEEDS INPUT: the build spec asks for a five step verification
                chain. The source document describes three artefacts (requests,
                receipts, letters) and does not define five steps. The remaining two
                steps need to be written down before they can be published.]
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 6. WHERE IT HAPPENED ───────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">Where it happened</p>
            <h2 className="lk-h2">Twelve schools, two towns.</h2>
            <p className="lk-prose lk-prose--tight">
              Narasaraopet is in Palnadu district and Ammanabrolu is in Prakasam
              district. Both are places our founder's parents grew up in, which is
              why the first run started there.
            </p>
          </ScrollReveal>

          <div className="lk-schools">
            {Object.entries(SCHOOLS).map(([town, list], i) => (
              <ScrollReveal key={town} delay={i + 1}>
                <div className="lk-schools__col">
                  <h3 className="lk-schools__town">{town}</h3>
                  <ul>
                    {list.map((s) => (
                      <li
                        key={s}
                        className={s.startsWith('[NEEDS INPUT') ? 'lk-needs-input' : undefined}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <Link to="/impact" className="btn btn--outline-dark lk-map-link">
              See both places on the map
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/*
        VIDEO SLOT B (after "Where it happened").
        Reserved for a short clip shot at one of the two towns, to sit between
        the school list and the numbers.
        [NEEDS INPUT: video for slot B]
      */}
      <div className="lk-video-slot" data-slot="B" aria-hidden="true" />

      {/* ── 7. THE NUMBERS ─────────────────────────────────── */}
      <ImpactCounters />

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="section section--indigo">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ color: 'var(--cream)', marginBottom: '1rem' }}>
              Run this at your school.
            </h2>
            <p
              style={{
                color: 'rgba(251,246,238,0.65)',
                marginBottom: '2rem',
                maxWidth: '46ch',
                marginInline: 'auto',
              }}
            >
              A chapter runs the same way: ask the teachers, band by grade, buy
              local, pack by hand, deliver in person.
            </p>
            <Link to="/start" className="btn btn--primary">Start a Chapter</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
