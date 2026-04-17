import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Contact = () => {
  const contactMethods = [
    // {
    //   icon: (
    //     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.128a11.042 11.042 0 005.516 5.516l1.128-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    //     </svg>
    //   ),
    //   title: 'Phone',
    //   subtitle: 'Direct call or WhatsApp',
    //   // value: '+91 9960681840',
    //   // link: 'tel:+919960681840',
    //   description: 'Best for quick coordination and interview scheduling'
    // },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      subtitle: 'Send me an email',
      value: 'salwedhananjay01@gmail.com',
      link: 'mailto:salwedhananjay01@gmail.com',
      description: 'Best for detailed inquiries and project discussions'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      title: 'LinkedIn',
      subtitle: 'Professional network',
      value: 'linkedin.com/in/dhananjay-salwe',
      link: 'https://linkedin.com/in/dhananjay-salwe',
      description: 'Connect with me for professional networking'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
      title: 'GitHub',
      subtitle: 'View my code',
      value: 'github.com/dhananjay-salwe',
      link: 'https://github.com/dhananjay-salwe',
      description: 'Explore my projects and open-source contributions'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Location',
      subtitle: 'Based in',
      value: 'Nashik, India',
      link: null,
      description: 'Open to remote, hybrid, and on-site opportunities'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const ContactMethodCard = ({ method }) => {
    const CardContent = (
      <Card hover={!!method.link} className="h-full text-center group cursor-pointer">
        <div className="text-[var(--accent)] mb-4 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {method.icon}
          </motion.div>
        </div>
        <Card.Title className="group-hover:text-[var(--accent)] transition-colors duration-200 mb-2">
          {method.title}
        </Card.Title>
        <Card.Subtitle className="mb-3">
          {method.subtitle}
        </Card.Subtitle>
        <p className="text-[var(--text)] font-mono text-sm mb-3 break-all">
          {method.value}
        </p>
        <p className="text-xs text-[var(--text)]/70">
          {method.description}
        </p>
      </Card>
    );

    if (method.link) {
      return (
        <motion.a
          href={method.link}
          target={method.link.startsWith('mailto:') ? '_self' : '_blank'}
          rel={method.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="block"
        >
          {CardContent}
        </motion.a>
      );
    }

    return (
      <motion.div variants={cardVariants}>
        {CardContent}
      </motion.div>
    );
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[var(--accent-bg)] text-[var(--accent)] rounded-full text-sm font-medium border border-[var(--accent-border)] mb-4">
            📬 Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-h)] mb-6">
            Let's Connect
          </h2>
          <p className="text-lg text-[var(--text)] max-w-3xl mx-auto leading-relaxed">
            If you have a role, project, or collaboration in mind, I would love to connect.
            I usually respond within 24 hours.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16"
        >
          {contactMethods.map((method) => (
            <ContactMethodCard
              key={method.title}
              method={method}
            />
          ))}
        </motion.div>

        {/* Main Contact CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <Card className="text-center bg-gradient-to-br from-[var(--accent-bg)] to-[var(--social-bg)] border-[var(--accent-border)] p-8 lg:p-12">
            <motion.div
              className="text-5xl mb-6"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              👋
            </motion.div>

            <h3 className="text-3xl font-bold text-[var(--text-h)] mb-4">
              Ready to Build Something Impactful?
            </h3>

            <p className="text-lg text-[var(--text)] mb-8 max-w-2xl mx-auto">
              I am actively seeking opportunities where I can contribute as a full stack developer,
              grow with a strong engineering team, and deliver measurable product outcomes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                size="lg"
                href="mailto:salwedhananjay01@gmail.com?subject=Opportunity%20Discussion&body=Hi%20Dhananjay%2C%0D%0A%0D%0AI%20would%20like%20to%20discuss%20an%20opportunity%20with%20you.%0D%0A%0D%0AThanks!"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                className="w-full sm:w-auto"
              >
                Email Me
              </Button>

              {/* <Button
                variant="outline"
                size="lg"
                href="tel:+919960681840"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.128a11.042 11.042 0 005.516 5.516l1.128-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
                className="w-full sm:w-auto"
              >
                Call Me
              </Button> */}
            </div>

            <div className="mt-8 pt-8 border-t border-[var(--accent-border)] text-center">
              <p className="text-sm text-[var(--text)]/70 mb-4">
                Usually responds within 24 hours
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-[var(--text)]/60">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Open to new opportunities</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Remote and on-site friendly</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contact Form Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto p-8 border-dashed border-2 border-[var(--border)]">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-[var(--text-h)] mb-2">Fastest way to connect</h3>
            <p className="text-[var(--text)] text-sm">Email or phone reaches me fastest for interviews and project discussions.</p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;