import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  className = '',
  hover = true,
  padding = 'md',
  ...props
}, ref) => {

  const baseClasses = "bg-[var(--bg)] border border-[var(--border)] rounded-xl transition-all duration-300";

  const hoverClasses = hover
    ? "hover:shadow-[var(--shadow)] hover:border-[var(--accent-border)] hover:-translate-y-1"
    : "";

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    none: ""
  };

  const combinedClasses = `${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`;

  if (hover) {
    return (
      <motion.div
        ref={ref}
        className={combinedClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -4,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={combinedClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

// Card subcomponents for better organization
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', as: Component = 'h3', ...props }) => (
  <Component className={`text-xl font-semibold text-[var(--text-h)] mb-2 ${className}`} {...props}>
    {children}
  </Component>
);

const CardSubtitle = ({ children, className = '', ...props }) => (
  <p className={`text-[var(--accent)] font-medium text-sm uppercase tracking-wide mb-1 ${className}`} {...props}>
    {children}
  </p>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-[var(--text)] leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-[var(--border)] ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;