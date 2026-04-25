import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { featuredProjects } from '../../data/projects';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const SECTION_HEADER_VIEWPORT = { once: true, margin: '0px 0px -33% 0px' };

const Projects = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const priorityProjectIds = ['flask-face-recognition', 'f-widget', 'swayamsiddh'];
  const orderedProjects = [
    ...priorityProjectIds
      .map((id) => featuredProjects.find((project) => project.id === id))
      .filter(Boolean),
    ...featuredProjects.filter((project) => !priorityProjectIds.includes(project.id))
  ];
  const visibleProjects = showAllProjects ? orderedProjects : orderedProjects.slice(0, 3);
  const hasMoreProjects = orderedProjects.length > 3;

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

  const cardVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: 'easeOut'
      }
    }
  };

  const ProjectCard = ({ project }) => {
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
      const syncTouchMode = () => setIsTouchDevice(mediaQuery.matches);

      syncTouchMode();

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', syncTouchMode);
      } else {
        mediaQuery.addListener(syncTouchMode);
      }

      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', syncTouchMode);
        } else {
          mediaQuery.removeListener(syncTouchMode);
        }
      };
    }, []);

    return (
    <motion.div
      variants={cardVariants}
      className="group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card hover={true} className="h-full flex flex-col overflow-hidden">
        {/* Project Image */}
        <div className="relative h-40 sm:h-48 bg-gradient-to-br from-[var(--accent-bg)] to-[var(--social-bg)] rounded-lg mb-5 sm:mb-6 overflow-hidden">
          {!imageError && project.image ? (
            <motion.img
              src={project.image}
              alt={`${project.title} preview`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
              animate={{ scale: isTouchDevice ? 1 : isHovered ? 1.03 : 1 }}
              transition={{ duration: 0.95, ease: 'easeOut' }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-[var(--accent)]/20">
                {project.title.charAt(0)}
              </div>
            </div>
          )}

          {/* Project category badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="primary" size="xs">
              {project.category}
            </Badge>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge.Status status="featured" />
            </div>
          )}

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </div>

        {/* Project Content */}
        <div className="flex-grow">
          <Card.Header>
            <Card.Subtitle>{project.subtitle}</Card.Subtitle>
            <Card.Title className="text-lg sm:text-xl group-hover:text-[var(--accent)] transition-colors duration-200">
              {project.title}
            </Card.Title>
          </Card.Header>

          <Card.Content>
            <Card.Description className="mb-4 text-sm sm:text-base">
              {project.description}
            </Card.Description>

            {/* Impact */}
            <div className="mb-4 p-3 bg-[var(--accent-bg)]/50 rounded-lg border border-[var(--accent-border)]/30">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-[var(--text)] font-medium">
                  {project.impact}
                </span>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-[var(--text-h)] mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    initial={false}
                    animate={{
                      opacity: isTouchDevice ? 1 : isHovered ? 1 : 0.52,
                      y: isTouchDevice ? 0 : isHovered ? 0 : 5
                    }}
                    transition={{
                      duration: 0.18,
                      delay: !isTouchDevice && isHovered ? techIndex * 0.045 : 0
                    }}
                  >
                    <Badge.Tech tech={tech} animated={false} />
                  </motion.div>
                ))}
              </div>
            </div>
          </Card.Content>
        </div>

        {/* Project Actions */}
        <Card.Footer className="pt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="sm"
              href={project.live}
              target="_blank"
              className="flex-1 justify-center sm:justify-start"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              }
            >
              Live Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              href={project.github}
              target="_blank"
              className="flex-1 justify-center sm:justify-start"
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              }
            >
              GitHub
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </motion.div>
    );
  };

  return (
    <section id="projects" className="py-16 sm:py-24 relative z-20">
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
            💼 Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-h)] mb-5 sm:mb-6">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-[var(--text)] max-w-3xl mx-auto leading-relaxed">
            Selected projects from production, internship, and academic work across full-stack,
            SaaS, and AI/computer-vision use cases.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12"
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center relative z-30 pb-2"
        >
          <p className="text-[var(--text)] mb-6">
            {showAllProjects ? 'Showing all projects.' : 'Interested in seeing more of my work?'}
          </p>
          {hasMoreProjects && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAllProjects((prev) => !prev)}
            >
              {showAllProjects ? 'View Less' : 'View More'}
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;