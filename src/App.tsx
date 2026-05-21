import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import Nav from './components/Nav'
import IntroAnimation from './components/IntroAnimation'
import Home from './pages/Home'
import Card from './pages/Card'
import BlogList from './pages/Blog/BlogList'
import BlogPost from './pages/Blog/BlogPost'

export default function App() {
  const [introVisible, setIntroVisible] = useState(
    () => !sessionStorage.getItem('introSeen')
  )

  const handleIntroDone = () => {
    sessionStorage.setItem('introSeen', '1')
    setIntroVisible(false)
  }

  return (
    <BrowserRouter>
      <LayoutGroup>
        <AnimatePresence>
          {introVisible && (
            <IntroAnimation key="intro" onDone={handleIntroDone} />
          )}
        </AnimatePresence>

        <Nav showLogo={!introVisible} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<Card />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </LayoutGroup>
    </BrowserRouter>
  )
}
