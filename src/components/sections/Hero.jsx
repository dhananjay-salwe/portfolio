import { motion } from 'framer-motion';
import Button from '../ui/Button';
import resumePdf from '../../assets/resume.pdf';

const Hero = () => {
  const highlights = [
    'Trainee Software Developer at aPLS Web Development',
    'Built systems serving 200+ users',
    '15-30 FPS face recognition with anti-spoofing'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/dhananjay-salwe',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/dhananjay-salwe',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:salwedhananjay01@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const handleViewJourney = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--accent)]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--accent)]/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-[var(--accent-bg)] text-[var(--accent)] rounded-full text-sm font-medium border border-[var(--accent-border)]">
              👋 Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--text-h)] mb-6"
          >
            Dhananjay
            <span className="block text-[var(--accent)]">Salwe</span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--text)] mb-6"
          >
            Full Stack Developer
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[var(--text)] max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Motivated full stack developer with hands-on experience in Java (Spring Boot),
            Python (Flask, Django, FastAPI), PHP (Laravel), React.js, and Angular.
            I build clean, production-ready applications with measurable business impact.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-10">
            {highlights.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full bg-[var(--bg)]/70 border border-[var(--accent-border)] text-sm text-[var(--text-h)]"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={buttonVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleViewJourney}
              className="w-full sm:w-auto"
            >
              Explore My Journey
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>

            <Button
              variant="outline"
              size="lg"
              href={resumePdf}
              target="_blank"
              className="w-full sm:w-auto"
            >
              Download Resume
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={containerVariants}
            className="flex items-center justify-center space-x-4"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="p-3 text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--code-bg)] rounded-lg transition-all duration-200 group"
                variants={buttonVariants}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={social.name}
              >
                <motion.div
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {social.icon}
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              className="flex flex-col items-center space-y-2 text-[var(--text)] cursor-pointer"
              onClick={handleViewJourney}
              whileHover={{ scale: 1.1 }}
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
