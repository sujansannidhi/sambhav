import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Mission from './pages/Mission'
import Impact from './pages/Impact'
import About from './pages/About'
import StartChapter from './pages/StartChapter'
import Donate from './pages/Donate'
import Partnerships from './pages/Partnerships'
import Contact from './pages/Contact'
import LearningKits from './pages/campaigns/LearningKits'
import NotFound from './pages/NotFound'

/* Reset scroll position to the top on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/impact" element={<Impact />} />
          {/* Campaigns. Learning Kits is the only one running, so /campaigns
              redirects to it rather than serving an index page for a list of one.
              Teaching and Access have no routes until they exist. */}
          <Route path="/campaigns/learning-kits" element={<LearningKits />} />
          <Route path="/campaigns" element={<Navigate to="/campaigns/learning-kits" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/start" element={<StartChapter />} />
          {/* Convenience alias: printed flyers and QR codes use /start. Keep in sync. */}
          <Route path="/start-a-chapter" element={<Navigate to="/start" replace />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
