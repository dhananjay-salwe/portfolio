import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

// Function to get initial banner state
const getInitialBannerState = () => {
  if (typeof window === 'undefined') return false;
  const savedConsent = localStorage.getItem('cookie_consent');
  return !savedConsent; // Show if no consent saved
};

// Function to get initial preferences
const getInitialPreferences = () => {
  if (typeof window === 'undefined') {
    return {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
  }

  const savedConsent = localStorage.getItem('cookie_consent');
  if (savedConsent) {
    try {
      return JSON.parse(savedConsent);
    } catch {
      return {
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false,
      };
    }
  }

  return {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  };
};

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(getInitialBannerState);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(getInitialPreferences);

  // Initialize analytics if consent is given
  const initializeAnalytics = () => {
    // Initialize Google Analytics or other tracking here
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  useEffect(() => {
    // Initialize analytics if consent is already given
    const savedConsent = localStorage.getItem('cookie_consent');
    if (savedConsent) {
      try {
        const saved = JSON.parse(savedConsent);
        if (saved.analytics) {
          initializeAnalytics();
        }
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    savePreferences(minimalConsent);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs) => {
    localStorage.setItem('cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    
    // Apply preferences
    if (prefs.analytics) {
      initializeAnalytics();
    }
    
    setPreferences(prefs);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handlePreferenceChange = (key) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AnimatePresence>
      {showBanner && !showPreferences && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-[var(--code-bg)] border border-[var(--border)] rounded-lg shadow-2xl p-4 md:p-6 space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[var(--text-h)]">
                🍪 Cookie Preferences
              </h3>
              <p className="text-sm text-[var(--text)]">
                We use cookies to enhance your experience, analyze site traffic, and serve personalized content. 
                By continuing to use this site, you agree to our use of cookies.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-2 text-xs text-[var(--text)]">
              <a 
                href="/#privacy-policy" 
                className="hover:text-[var(--accent)] hover:underline transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-[var(--border)]">•</span>
              <a 
                href="/#cookie-policy" 
                className="hover:text-[var(--accent)] hover:underline transition-colors"
              >
                Cookie Policy
              </a>
            </div>

            {/* Button Group */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium text-[var(--text)] border border-[var(--border)] rounded-lg hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-all duration-200 flex-1"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 text-sm font-medium text-[var(--text)] border border-[var(--border)] rounded-lg hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-all duration-200 flex-1"
              >
                Customize
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-all duration-200 flex-1"
              >
                Accept All
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-[var(--text)] opacity-75">
              Necessary cookies are always enabled. You can manage your preferences below or reset anytime from your browser settings.
            </p>
          </div>
        </motion.div>
      )}

      {showPreferences && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-[var(--code-bg)] border border-[var(--border)] rounded-lg shadow-2xl p-4 md:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[var(--text-h)]">
                Cookie Preferences
              </h3>
              <p className="text-sm text-[var(--text)]">
                Manage your cookie consent preferences. You can change these settings anytime.
              </p>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border)]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--text-h)] mb-1">
                      Necessary Cookies
                    </h4>
                    <p className="text-sm text-[var(--text)] opacity-75">
                      Required for basic site functionality. These are always enabled and cannot be disabled.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="w-5 h-5 accent-[var(--accent)] cursor-not-allowed opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border)]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--text-h)] mb-1">
                      Analytics Cookies
                    </h4>
                    <p className="text-sm text-[var(--text)] opacity-75">
                      Help us understand how you use the site. Completely anonymous and secure.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => handlePreferenceChange('analytics')}
                      className="w-5 h-5 accent-[var(--accent)] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border)]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--text-h)] mb-1">
                      Functional Cookies
                    </h4>
                    <p className="text-sm text-[var(--text)] opacity-75">
                      Enable enhanced features and personalization based on your preferences.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => handlePreferenceChange('functional')}
                      className="w-5 h-5 accent-[var(--accent)] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border)]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--text-h)] mb-1">
                      Marketing Cookies
                    </h4>
                    <p className="text-sm text-[var(--text)] opacity-75">
                      Used to track your activity and show relevant advertisements and content.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => handlePreferenceChange('marketing')}
                      className="w-5 h-5 accent-[var(--accent)] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Button Group */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-sm font-medium text-[var(--text)] border border-[var(--border)] rounded-lg hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-all duration-200 flex-1"
              >
                Back
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium text-[var(--text)] border border-[var(--border)] rounded-lg hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-all duration-200 flex-1"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-all duration-200 flex-1"
              >
                Accept All
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-all duration-200 flex-1"
              >
                Save Preferences
              </button>
            </div>

            {/* Info */}
            <p className="text-xs text-[var(--text)] opacity-75">
              Your preferences are saved locally in your browser and are not stored on our servers.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
