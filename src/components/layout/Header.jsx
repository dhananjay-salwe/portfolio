import { motion } from 'framer-motion';
import { useState } from 'react';
import { useScrollSpy, useScrollTo } from '../../hooks/useScrollSpy';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';
import resumePdf from '../../assets/resume.pdf';

const Header = () => {
  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const activeSection = useScrollSpy(navigationItems.map(item => item.id));
  const { scrollToSection, scrollToTop } = useScrollTo();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    if (sectionId === 'home') {
      scrollToTop();
    } else {
      scrollToSection(sectionId);
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 w-full bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => handleNavClick('home')}
              className="text-2xl font-bold text-[var(--text-h)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              DS
              <span className="text-[var(--accent)]">.</span>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => {
              const isActive = activeSection === item.id ||
                (activeSection === '' && item.id === 'home');

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive
                      ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
                      : 'text-[var(--text)] hover:text-[var(--text-h)] hover:bg-[var(--code-bg)]'
                    }
                  `}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg border border-[var(--accent-border)]"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Resume Button */}
            <Button
              variant="outline"
              size="sm"
              href={resumePdf}
              target="_blank"
              className="hidden sm:inline-flex"
            >
              Resume
            </Button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-[var(--text-h)] hover:text-[var(--accent)] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Hidden by default, would be shown via state */}
      <motion.div
        id="mobile-nav"
        className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-4 py-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                block w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                ${activeSection === item.id
                  ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
                  : 'text-[var(--text)] hover:bg-[var(--code-bg)]'
                }
              `}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-[var(--border)]">
            <Button
              variant="primary"
              size="sm"
              href={resumePdf}
              target="_blank"
              className="w-full justify-center"
            >
              Download Resume
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
