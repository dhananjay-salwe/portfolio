import { useEffect } from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      id="privacy-policy"
      className="min-h-screen bg-[var(--bg)] py-20 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-h)]">
            Privacy Policy
          </h1>
          <p className="text-[var(--text)] opacity-75">
            Last updated: April 17, 2026
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div variants={itemVariants} className="space-y-4 text-[var(--text)]">
          <p>
            Dhananjay Salwe ("we", "us", "our") operates the portfolio website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.
          </p>
          <p>
            We use your data to provide and improve the website. By using the website, you agree to the collection and use of information in accordance with this policy.
          </p>
        </motion.div>

        {/* Information Collection */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            1. Information Collection And Use
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>
              We collect different types of information for various purposes to provide and improve our website:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Personal Data:</strong> While using our website, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (email address, name, etc.).</li>
              <li><strong>Usage Data:</strong> We may also collect information on how the website is accessed and used (analytics).</li>
              <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our website and hold certain information.</li>
            </ul>
          </div>
        </motion.div>

        {/* Use of Data */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            2. Use Of Data
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>Dhananjay Salwe uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain our website</li>
              <li>To notify you about changes to our website</li>
              <li>To allow you to participate in interactive features of our website when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our website</li>
              <li>To monitor the usage of our website</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            3. Security Of Data
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </div>
        </motion.div>

        {/* Contact Us */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            4. Contact Us
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>By email: salwedhananjay01@gmail.com</li>
              <li>Through our contact form on the website</li>
            </ul>
          </div>
        </motion.div>

        {/* Compliance */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            5. Compliance With Laws
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>
              This website complies with applicable data protection and privacy laws including but not limited to the Information Technology Act, 2000 (India) and international privacy standards.
            </p>
          </div>
        </motion.div>

        {/* Changes */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            6. Changes To This Privacy Policy
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
