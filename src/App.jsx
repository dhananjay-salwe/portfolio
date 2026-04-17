import { useEffect, useState } from 'react';

// Layout Components
import Layout from './components/layout/Layout';
import ParallaxSection from './components/layout/ParallaxSection';

// Section Components
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

// Policy Components
import PrivacyPolicy from './components/sections/PrivacyPolicy';
import CookiePolicy from './components/sections/CookiePolicy';

// UI Components
import CookieConsent from './components/ui/CookieConsent';

function App() {
  const [showPage, setShowPage] = useState('home');

  // Initialize theme on app load
  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, []);

  // Handle hash changes for policy pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#privacy-policy') {
        setShowPage('privacy');
      } else if (hash === '#cookie-policy') {
        setShowPage('cookies');
      } else {
        setShowPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Show privacy policy page
  if (showPage === 'privacy') {
    return (
      <Layout>
        <PrivacyPolicy />
      </Layout>
    );
  }

  // Show cookie policy page
  if (showPage === 'cookies') {
    return (
      <Layout>
        <CookiePolicy />
      </Layout>
    );
  }

  // Show home page
  return (
    <>
      <Layout>
        <ParallaxSection tone="hero">
          <Hero />
        </ParallaxSection>
        <ParallaxSection tone="about">
          <About />
        </ParallaxSection>
        <ParallaxSection tone="experience">
          <Experience />
        </ParallaxSection>
        <ParallaxSection tone="projects">
          <Projects />
        </ParallaxSection>
        <ParallaxSection tone="skills">
          <Skills />
        </ParallaxSection>
        <ParallaxSection tone="contact">
          <Contact />
        </ParallaxSection>
      </Layout>
      <CookieConsent />
    </>
  );
}

export default App
