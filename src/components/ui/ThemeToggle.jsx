import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ className = '', size = 'md' }) => {
  const [isDark, setIsDark] = useState(() => {
    // Initialize state based on system preference and saved theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;

    return prefersDark;
  });

  useEffect(() => {
    // Apply theme to document with explicit mode class so system media query does not override user choice
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const sizeClasses = {
    sm: 'w-10 h-6',
    md: 'w-12 h-7',
    lg: 'w-14 h-8'
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-between
        ${sizeClasses[size]}
        bg-[var(--code-bg)] border border-[var(--border)]
        rounded-full p-1 transition-all duration-200
        hover:bg-[var(--social-bg)] hover:border-[var(--accent-border)]
        focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background slider */}
      <motion.div
        className={`
          absolute inset-1 bg-[var(--accent)] rounded-full
          ${isDark ? 'translate-x-full' : 'translate-x-0'}
        `}
        initial={false}
        animate={{
          x: isDark ? '100%' : '0%'
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        style={{
          width: `calc(50% - 2px)`
        }}
      />

      {/* Sun icon */}
      <motion.div
        className={`
          relative z-10 flex items-center justify-center
          ${iconSizeClasses[size]} text-yellow-500
        `}
        animate={{
          scale: isDark ? 0.8 : 1,
          opacity: isDark ? 0.5 : 1,
          rotate: isDark ? 180 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full"
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      </motion.div>

      {/* Moon icon */}
      <motion.div
        className={`
          relative z-10 flex items-center justify-center
          ${iconSizeClasses[size]} text-blue-300
        `}
        animate={{
          scale: isDark ? 1 : 0.8,
          opacity: isDark ? 1 : 0.5,
          rotate: isDark ? 0 : -180
        }}
        transition={{ duration: 0.2 }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full"
        >
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;