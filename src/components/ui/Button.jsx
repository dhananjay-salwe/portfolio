import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  loading = false,
  href,
  target,
  onClick,
  ...props
}, ref) => {

  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 focus:ring-[var(--accent)] shadow-lg hover:shadow-xl",
    secondary: "bg-[var(--code-bg)] text-[var(--text-h)] border border-[var(--border)] hover:bg-[var(--bg)] focus:ring-[var(--accent)]",
    outline: "bg-transparent text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white focus:ring-[var(--accent)]",
    ghost: "bg-transparent text-[var(--text)] hover:bg-[var(--code-bg)] hover:text-[var(--text-h)] focus:ring-[var(--accent)]"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-md gap-1.5",
    md: "px-6 py-3 text-base rounded-lg gap-2",
    lg: "px-8 py-4 text-lg rounded-lg gap-2.5"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      {icon && !loading && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={combinedClasses}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      className={combinedClasses}
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;