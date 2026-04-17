import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Initialize with saved theme or default to system
    return localStorage.getItem('theme') || 'system';
  });

  const [isDark, setIsDark] = useState(() => {
    // Initialize dark mode state
    const savedTheme = localStorage.getItem('theme') || 'system';
    if (savedTheme === 'dark') {
      return true;
    } else if (savedTheme === 'light') {
      return false;
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  useEffect(() => {
    // Function to update theme based on preference and system
    const updateTheme = (themeValue) => {
      let shouldBeDark = false;

      if (themeValue === 'dark') {
        shouldBeDark = true;
      } else if (themeValue === 'light') {
        shouldBeDark = false;
      } else {
        // System preference
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      setIsDark(shouldBeDark);

      // Update document class for CSS
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Initial theme setup
    updateTheme(theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        updateTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  const setThemeMode = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // Update immediately
    let shouldBeDark = false;
    if (newTheme === 'dark') {
      shouldBeDark = true;
    } else if (newTheme === 'light') {
      shouldBeDark = false;
    } else {
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setThemeMode(newTheme);
  };

  return {
    theme,
    isDark,
    setTheme: setThemeMode,
    toggleTheme
  };
};

export default useTheme;