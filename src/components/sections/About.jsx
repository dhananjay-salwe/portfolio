import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import resumePdf from '../../assets/resume.pdf';

const SECTION_HEADER_VIEWPORT = { once: true, margin: '0px 0px -33% 0px' };

const stats = [
  { value: 1, suffix: '+', label: 'Year Experience', icon: '💼', type: 'single' },
  { value: 200, suffix: '+', label: 'Users Served', icon: '👥', type: 'single' },
  { from: 15, to: 30, suffix: ' FPS', label: 'Face Recognition Speed', icon: '🎯', type: 'range' },
  { value: 85, suffix: '%', label: 'Resume Match Accuracy', icon: '📄', type: 'single' }
];

const AnimatedStatValue = ({ stat, start }) => {
  const [displayValue, setDisplayValue] = useState(() => {
    if (stat.type === 'range') {
      return { from: 0, to: 0 };
    }

    return 0;
  });

  useEffect(() => {
    if (!start) {
      return undefined;
    }

    const durationMs = 850;
    const startTime = performance.now();
    let frameId;

    const tick = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / durationMs, 1);

      if (stat.type === 'range') {
        setDisplayValue({
          from: Math.round(stat.from * progress),
          to: Math.round(stat.to * progress)
        });
      } else {
        setDisplayValue(Math.round(stat.value * progress));
      }

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [start, stat.from, stat.to, stat.type, stat.value]);

  if (stat.type === 'range') {
    return (
      <>
        {displayValue.from}-{displayValue.to}
        {stat.suffix}
      </>
    );
  }

  return (
    <>
      {displayValue}
      {stat.suffix}
    </>
  );
};

const About = () => {
  const interests = [
    { name: 'Full Stack Development', icon: '💻', description: 'Building complete web applications' },
    { name: 'API Engineering', icon: '⚡', description: 'Designing secure and scalable REST APIs' },
    { name: 'Computer Vision', icon: '👁️', description: 'Liveness and anti-spoofing systems' },
    { name: 'Database Optimization', icon: '🗄️', description: 'Fast queries and reliable persistence' }
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
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: 'easeOut'
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: 'easeOut'
      }
    }
  };

  const statsTriggerRef = useRef(null);
  const statsInView = useInView(statsTriggerRef, {
    once: true,
    margin: '0px 0px -33% 0px'
  });

  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          viewport={SECTION_HEADER_VIEWPORT}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[var(--accent-bg)] text-[var(--accent)] rounded-full text-sm font-medium border border-[var(--accent-border)] mb-4">
            👤 About Me
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-h)] mb-5 sm:mb-6">
            Get to Know Me
          </h2>
          <p className="text-base sm:text-lg text-[var(--text)] max-w-3xl mx-auto leading-relaxed">
            A recent B.Tech graduate and full stack developer shipping production-ready
            web apps across Java, Python, PHP, React, and Angular ecosystems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start">
          {/* Left Column - Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {/* Professional Summary */}
            <motion.div variants={itemVariants}>
              <Card className="p-5 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-h)] mb-5 sm:mb-6">
                  My Story
                </h3>
                <div className="space-y-4 text-[var(--text)] leading-relaxed">
                  <p>
                    I am Dhananjay Salwe, a motivated full stack developer currently working as a
                    Trainee Software Developer at aPLS Web Development. I graduated with a B.Tech in
                    CSE (Cyber Security and Forensics) from Sandip University with a 9.00/10 GPA.
                  </p>
                  <p>
                    My core stack includes Java (Spring Boot), Python (Flask, Django, FastAPI),
                    PHP (Laravel), React.js, and Angular. I have built systems that cut manual
                    data entry by 70%, improved API response by 40%, and enabled real-time face
                    recognition at 15-30 FPS with anti-spoofing.
                  </p>
                  <p>
                    I care deeply about maintainable code, measurable outcomes, and user-first product quality.
                    Whether I am implementing secure APIs, building bilingual interfaces, or optimizing databases,
                    I focus on solutions that are practical in production environments.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Interests & Passions */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-h)] mb-5 sm:mb-6">
                What I'm Passionate About
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                  >
                    <Card
                      hover={false}
                      padding="md"
                      className="group h-full transition-all duration-300 hover:shadow-[var(--shadow)] hover:border-[var(--accent-border)]"
                    >
                      <div className="text-2xl mb-2">{interest.icon}</div>
                      <h4 className="font-semibold text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-1">
                        {interest.name}
                      </h4>
                      <p className="text-sm text-[var(--text)]">
                        {interest.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-[var(--accent-bg)] to-[var(--social-bg)] border-[var(--accent-border)] text-center p-6 sm:p-8">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-[var(--text-h)] mb-3">
                  Let's Work Together
                </h3>
                <p className="text-[var(--text)] mb-6">
                  Open to full-time roles, impactful projects, and collaborative teams.
                  Let's connect and build products that solve real problems.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="primary"
                    href="mailto:salwedhananjay01@gmail.com"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                  >
                    Get In Touch
                  </Button>
                  <Button
                    variant="outline"
                    href={resumePdf}
                    target="_blank"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    }
                  >
                    View Resume
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {/* Statistics */}
            <motion.div variants={itemVariants} ref={statsTriggerRef}>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-h)] mb-5 sm:mb-6">
                By the Numbers
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={statVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="group"
                  >
                    <Card hover={true} className="text-center group-hover:bg-[var(--accent-bg)] transition-colors duration-200">
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-[var(--accent)] mb-1">
                        <AnimatedStatValue stat={stat} start={statsInView} />
                      </div>
                      <div className="text-sm text-[var(--text)] font-medium">
                        {stat.label}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Facts */}
            <motion.div variants={itemVariants}>
              <Card className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-[var(--text-h)] mb-6">
                  Quick Facts
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full flex-shrink-0"></div>
                    <span className="text-[var(--text)]">
                      <strong className="text-[var(--text-h)]">Location:</strong> Nashik, Maharashtra, India
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full flex-shrink-0"></div>
                    <span className="text-[var(--text)]">
                      <strong className="text-[var(--text-h)]">Degree:</strong> B.Tech in CSE (Cyber Security and Forensics), Sandip University - GPA 9.00/10.0
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full flex-shrink-0"></div>
                    <span className="text-[var(--text)]">
                      <strong className="text-[var(--text-h)]">Diploma:</strong> Information Technology, Sandip Foundation (2019-2022)
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full flex-shrink-0"></div>
                    <span className="text-[var(--text)]">
                      <strong className="text-[var(--text-h)]">Currently:</strong> Trainee Software Developer at aPLS Web Development
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full flex-shrink-0"></div>
                    <span className="text-[var(--text)]">
                      <strong className="text-[var(--text-h)]">Languages:</strong> English, Marathi, Hindi
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Availability Status */}
            <motion.div variants={itemVariants}>
              <Card className="border-green-300 bg-green-50/50 dark:bg-green-900/20 dark:border-green-700 p-5 sm:p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-green-800 dark:text-green-300">
                    Available for Work
                  </span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Currently open to full-time opportunities and high-impact projects.
                  Feel free to reach out for collaboration.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
