import { motion } from 'framer-motion';
import { workExperience, education, certifications } from '../../data/experience';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const SECTION_HEADER_VIEWPORT = { once: true, margin: '0px 0px -33% 0px' };

const Experience = () => {
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

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const ExperienceCard = ({ experience, index, isLast }) => (
    <motion.div
      variants={timelineItemVariants}
      className="relative flex items-start space-x-6 pb-8"
    >
      {/* Timeline Line */}
      <div className="relative flex flex-col items-center">
        {/* Timeline Dot */}
        <motion.div
          className="w-6 h-6 rounded-full bg-[var(--accent)] border-4 border-[var(--bg)] shadow-lg z-10"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        />

        {/* Connecting Line */}
        {!isLast && (
          <motion.div
            className="w-0.5 h-full bg-[var(--border)] mt-2 absolute top-6"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            viewport={{ once: true }}
          />
        )}
      </div>

      {/* Content Card */}
      <div className="flex-1 min-w-0">
        <Card hover={true} className="group">
          <Card.Header>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <Card.Title className="group-hover:text-[var(--accent)] transition-colors duration-200">
                {experience.position}
              </Card.Title>
              <Badge variant="primary" size="sm">
                {experience.type}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h4 className="text-lg font-semibold text-[var(--accent)]">
                {experience.company}
              </h4>
              <div className="text-sm text-[var(--text)] flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2v1" />
                </svg>
                <span>{experience.duration}</span>
              </div>
            </div>
            {experience.location && (
              <div className="text-sm text-[var(--text)] flex items-center space-x-1 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{experience.location}</span>
              </div>
            )}
          </Card.Header>

          <Card.Content>
            <Card.Description className="mb-4">
              {experience.description}
            </Card.Description>

            {/* Achievements */}
            {experience.achievements && experience.achievements.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-[var(--text-h)] mb-2">Key Achievements</h5>
                <ul className="space-y-1">
                  {experience.achievements.map((achievement, achIndex) => (
                    <motion.li
                      key={achIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: achIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-2 text-sm text-[var(--text)]"
                    >
                      <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {experience.tech && experience.tech.length > 0 && (
              <div>
                <h5 className="text-sm font-semibold text-[var(--text-h)] mb-2">Technologies Used</h5>
                <div className="flex flex-wrap gap-1.5">
                  {experience.tech.map((tech, techIndex) => (
                    <Badge.Tech key={techIndex} tech={tech} />
                  ))}
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    </motion.div>
  );

  const EducationCard = ({ edu }) => (
    <motion.div
      variants={timelineItemVariants}
      className="mb-6"
    >
      <Card hover={true} className="group">
        <Card.Header>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <Card.Title className="group-hover:text-[var(--accent)] transition-colors duration-200">
                {edu.degree}
              </Card.Title>
              <Card.Subtitle>{edu.field}</Card.Subtitle>
              <h4 className="text-base font-medium text-[var(--text)] mt-1">
                {edu.institution}
              </h4>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-[var(--accent)]">
                {edu.duration}
              </div>
              <div className="text-sm text-[var(--text)]">
                {edu.grade}
              </div>
            </div>
          </div>
        </Card.Header>

        {edu.achievements && (
          <Card.Content>
            <ul className="space-y-1">
              {edu.achievements.map((achievement, achIndex) => (
                <li key={achIndex} className="flex items-start space-x-2 text-sm text-[var(--text)]">
                  <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </Card.Content>
        )}
      </Card>
    </motion.div>
  );

  const CertificationCard = ({ cert }) => (
    <motion.div
      variants={timelineItemVariants}
      className="mb-4"
    >
      <Card hover={true} className="group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Card.Title className="text-base group-hover:text-[var(--accent)] transition-colors duration-200 mb-1">
              {cert.title}
            </Card.Title>
            <p className="text-sm text-[var(--text)] mb-1">{cert.issuer}</p>
            <p className="text-xs text-[var(--text)]/70">{cert.date}</p>
          </div>
          <Badge variant="success" size="xs">
            Certified
          </Badge>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          viewport={SECTION_HEADER_VIEWPORT}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[var(--accent-bg)] text-[var(--accent)] rounded-full text-sm font-medium border border-[var(--accent-border)] mb-4">
            🚀 Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-h)] mb-6">
            Experience, Education & Certifications
          </h2>
          <p className="text-lg text-[var(--text)] max-w-3xl mx-auto leading-relaxed">
            A concise timeline of professional impact, technical growth, and formal training
            aligned with production-grade full-stack development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Work Experience Timeline */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold text-[var(--text-h)] mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2h4a2 2 0 00-2-2V6z" />
                </svg>
                Work Experience
              </h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {workExperience.map((experience, index) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  index={index}
                  isLast={index === workExperience.length - 1}
                />
              ))}
            </motion.div>
          </div>

          {/* Education & Certifications Sidebar */}
          <div className="space-y-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-[var(--text-h)] mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Education
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {education.map((edu) => (
                  <EducationCard key={edu.id} edu={edu} />
                ))}
              </motion.div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-[var(--text-h)] mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Certifications
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {certifications.map((cert) => (
                  <CertificationCard key={cert.id} cert={cert} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;