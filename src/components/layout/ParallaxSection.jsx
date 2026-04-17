import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ParallaxSection = ({ children, tone = 'neutral' }) => {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 0, 18]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.998, 1, 0.998]);
  const motionStyle = prefersReducedMotion ? undefined : { y, scale };

  return (
    <div ref={sectionRef} className={`parallax-panel parallax-${tone}`}>
      <motion.div className="parallax-panel-inner" style={motionStyle}>
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
