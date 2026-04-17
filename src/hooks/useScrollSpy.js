import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds, options = {}) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const { offset = 100 } = options;

    const handleScroll = () => {
      const sections = sectionIds
        .map(id => {
          const element = document.getElementById(id);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          return {
            id,
            offsetTop: rect.top + window.scrollY,
            height: rect.height
          };
        })
        .filter(Boolean);

      const scrollPosition = window.scrollY + offset;

      // Find the current section
      let currentSection = '';

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (scrollPosition >= section.offsetTop) {
          currentSection = section.id;
          break;
        }
      }

      // If at the very top, set to first section
      if (window.scrollY < 50 && sections.length > 0) {
        currentSection = sections[0].id;
      }

      setActiveSection(currentSection);
    };

    // Initial call
    handleScroll();

    // Add scroll listener with throttle
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [sectionIds, options]);

  return activeSection;
};

export const useScrollTo = () => {
  const scrollToSection = (sectionId, options = {}) => {
    const { offset = -80, behavior = 'smooth' } = options;

    const element = document.getElementById(sectionId);
    if (!element) return;

    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementTop + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior
    });
  };

  const scrollToTop = (options = {}) => {
    const { behavior = 'smooth' } = options;

    window.scrollTo({
      top: 0,
      behavior
    });
  };

  return { scrollToSection, scrollToTop };
};