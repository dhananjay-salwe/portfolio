import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { skillsData } from '../../data/skills';
import Card from '../ui/Card';

const SECTION_HEADER_VIEWPORT = { once: true, margin: '0px 0px -33% 0px' };

const Skills = () => {
  const categories = useMemo(() => {
    return Object.entries(skillsData).map(([key, category]) => ({
      key,
      ...category,
      skills: [...category.skills].sort((left, right) => left.name.localeCompare(right.name))
    }));
  }, []);

  const [activeCategory, setActiveCategory] = useState('all');

  const totalSkills = useMemo(() => {
    return categories.reduce((sum, category) => sum + category.skills.length, 0);
  }, [categories]);

  const visibleCategories = useMemo(() => {
    if (activeCategory === 'all') {
      return categories;
    }

    return categories.filter((category) => category.key === activeCategory);
  }, [activeCategory, categories]);

  const categoryGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.04
      }
    }
  };

  const categoryCardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  const skillsGroupVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.028,
        delayChildren: 0.03
      }
    }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, y: 11 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.22,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          viewport={SECTION_HEADER_VIEWPORT}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-block px-4 py-2 bg-[var(--accent-bg)] text-[var(--accent)] rounded-full text-sm font-medium border border-[var(--accent-border)] mb-4">
            🧰 Tech Stack
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-h)] mb-4 sm:mb-5">
            Skills & Technologies
          </h2>
          <p className="text-base sm:text-lg text-[var(--text)] max-w-3xl mx-auto leading-relaxed">
            A clean overview of my tools and frameworks grouped by category, focused only on what I use.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          viewport={{ once: true, margin: '0px 0px -25% 0px' }}
          className="mb-6 sm:mb-8"
        >
          <Card className="bg-[var(--bg)]/75 backdrop-blur-sm border-[var(--accent-border)]/20 p-4 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--text)]/70 mb-1">Skill Library</p>
                <p className="text-xl sm:text-2xl font-bold text-[var(--text-h)] mb-1">
                  {totalSkills} technologies across {categories.length} categories
                </p>
                <p className="text-[var(--text)] text-sm">
                  Filter by category or browse the full stack below.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                    activeCategory === 'all'
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                      : 'bg-[var(--bg)] text-[var(--text-h)] border-[var(--border)] hover:border-[var(--accent-border)]'
                  }`}
                >
                  All Skills
                </button>

                {categories.map((category) => (
                  <button
                    key={category.key}
                    type="button"
                    onClick={() => setActiveCategory(category.key)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                      activeCategory === category.key
                        ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                        : 'bg-[var(--bg)] text-[var(--text-h)] border-[var(--border)] hover:border-[var(--accent-border)]'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          key={activeCategory}
          variants={categoryGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {visibleCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              variants={categoryCardVariants}
              transition={{ delay: categoryIndex * 0.06 }}
            >
              <Card hover={true} className="h-full bg-[var(--bg)]/70 backdrop-blur-sm border-[var(--accent-border)]/20 p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-h)]">{category.title}</h3>
                      <p className="text-sm text-[var(--text)]">{category.skills.length} skills</p>
                    </div>
                  </div>
                </div>

                <motion.div variants={skillsGroupVariants} className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill.name}
                      variants={skillItemVariants}
                      transition={{ delay: skillIndex * 0.01 }}
                      whileHover={{ y: -4 }}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 text-xs sm:text-sm font-medium text-[var(--text-h)]"
                    >
                      <span>{skill.icon}</span>
                      <span>{skill.name}</span>
                    </motion.span>
                  ))}
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;