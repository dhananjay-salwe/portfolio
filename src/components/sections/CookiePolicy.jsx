import { useEffect } from 'react';
import { motion } from 'framer-motion';

const CookiePolicy = () => {
  useEffect(() => {
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
      id="cookie-policy"
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
            Cookie Policy
          </h1>
          <p className="text-[var(--text)] opacity-75">
            Last updated: April 17, 2026
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div variants={itemVariants} className="space-y-4 text-[var(--text)]">
          <p>
            This Cookie Policy explains how Dhananjay Salwe portfolio website uses cookies and similar technologies to recognize you and your device. It explains the types of cookies we use, why we use them, and how you can control them.
          </p>
        </motion.div>

        {/* What Are Cookies */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            1. What Are Cookies?
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>
              Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently and to provide reporting information to website owners.
            </p>
            <p>
              Cookies set by the website owner are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, analytics).
            </p>
          </div>
        </motion.div>

        {/* Types Of Cookies We Use */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            2. Types Of Cookies We Use
          </h2>
          <div className="space-y-4 text-[var(--text)]">
            <div>
              <h3 className="font-semibold text-[var(--text-h)] mb-2">Essential Cookies (Necessary)</h3>
              <p>
                These cookies are necessary for the website to function properly. They include cookies that are required to provide you with services available through our website and to use some of its features, such as accessing secure areas of the website.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--text-h)] mb-2">Analytics Cookies</h3>
              <p>
                We use analytics cookies to understand how visitors interact with our website. These cookies collect information in an aggregate form, such as how many users visit the website, how long they stay, and which pages they visit. This information helps us improve the website and provide better user experience.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--text-h)] mb-2">Functional Cookies</h3>
              <p>
                These cookies are used to enable certain functionality on our website, such as remembering your preferences and settings, keeping you logged in, and providing personalized features.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--text-h)] mb-2">Marketing/Advertising Cookies</h3>
              <p>
                These cookies may be used to build a profile of your interests and show you targeted advertising based on your browsing history. They may also be used by our advertising partners to track your activity across multiple websites.
              </p>
            </div>
          </div>
        </motion.div>

        {/* How Long Cookies Last */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            3. How Long Cookies Last
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>
              Cookies can be either "session cookies" or "persistent cookies." Session cookies are deleted automatically when you close your browser. Persistent cookies remain on your device until they expire or you delete them.
            </p>
          </div>
        </motion.div>

        {/* Control Cookies */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            4. How To Control Cookies
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise this right by:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Cookie Consent Banner:</strong> When you first visit our website, a cookie consent banner will appear. You can accept or reject cookies using the options provided.</li>
              <li><strong>Browser Settings:</strong> You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when a cookie is being sent.</li>
              <li><strong>Third-party Tools:</strong> You can opt out of certain third-party cookies by visiting their opt-out pages.</li>
            </ul>
          </div>
        </motion.div>

        {/* Cookie List */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            5. Cookies Used On This Website
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-2 px-2 font-semibold">Cookie Name</th>
                  <th className="text-left py-2 px-2 font-semibold">Type</th>
                  <th className="text-left py-2 px-2 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--border)]">
                  <td className="py-2 px-2">theme</td>
                  <td className="py-2 px-2">Essential</td>
                  <td className="py-2 px-2">Stores your theme preference (light/dark mode)</td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="py-2 px-2">cookie_consent</td>
                  <td className="py-2 px-2">Essential</td>
                  <td className="py-2 px-2">Stores your cookie preferences</td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="py-2 px-2">cookie_consent_date</td>
                  <td className="py-2 px-2">Essential</td>
                  <td className="py-2 px-2">Records when you gave consent</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">_ga</td>
                  <td className="py-2 px-2">Analytics</td>
                  <td className="py-2 px-2">Google Analytics - tracks unique users</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Do Not Track */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            6. Do Not Track Signals
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>
              Some browsers include a "Do Not Track" feature. Currently, there is no standard regarding how to respond to Do Not Track signals. We do not modify our data collection practices in response to Do Not Track signals from your browser. However, you can use other tools to control cookies and similar technologies as described above.
            </p>
          </div>
        </motion.div>

        {/* Changes */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            7. Changes To This Cookie Policy
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any material changes by posting the updated policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            8. Contact Us
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>If you have any questions about this Cookie Policy, please contact us:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>By email: salwedhananjay01@gmail.com</li>
              <li>Through our contact form on the website</li>
            </ul>
          </div>
        </motion.div>

        {/* Compliance */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-h)]">
            9. Compliance With Indian IT Rules
          </h2>
          <div className="space-y-3 text-[var(--text)]">
            <p>
              This website complies with the Information Technology (Intermediaries Guidelines) Rules, 2021 and the Information Technology Act, 2000 (India). All data collection and processing follows applicable laws and regulations in India.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CookiePolicy;
