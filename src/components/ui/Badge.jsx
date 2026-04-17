import { motion } from 'framer-motion';

const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  icon,
  animated = true,
  ...props
}) => {

  const baseClasses = "inline-flex items-center font-medium rounded-full transition-all duration-200";

  const variantClasses = {
    default: "bg-[var(--code-bg)] text-[var(--text-h)] border border-[var(--border)]",
    primary: "bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)]",
    secondary: "bg-[var(--social-bg)] text-[var(--text)] border border-[var(--border)]",
    success: "bg-green-100 text-green-800 border border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700",
    skill: "bg-gradient-to-r from-[var(--accent-bg)] to-[var(--social-bg)] text-[var(--text-h)] border border-[var(--accent-border)] hover:scale-105 hover:shadow-sm"
  };

  const sizeClasses = {
    xs: "px-2 py-1 text-xs gap-1",
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-5 py-2.5 text-lg gap-2.5"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon && (
        <span className="flex-shrink-0 text-current">
          {typeof icon === 'string' ? icon : icon}
        </span>
      )}
      <span className="whitespace-nowrap">{children}</span>
    </>
  );

  if (animated) {
    return (
      <motion.span
        className={combinedClasses}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={
          variant === 'skill'
            ? { scale: 1.05, y: -1 }
            : { scale: 1.02 }
        }
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {content}
      </motion.span>
    );
  }

  return (
    <span className={combinedClasses} {...props}>
      {content}
    </span>
  );
};

// Predefined skill level badges
const SkillBadge = ({ skill, showLevel = true, ...props }) => (
  <Badge
    variant="skill"
    icon={skill.icon}
    animated={true}
    className="group cursor-default"
    {...props}
  >
    {skill.name}
    {showLevel && (
      <span className="ml-1 text-xs opacity-75 group-hover:opacity-100 transition-opacity">
        ({skill.level})
      </span>
    )}
  </Badge>
);

// Tech stack badge for projects
const TechBadge = ({ tech, ...props }) => (
  <Badge
    variant="secondary"
    size="xs"
    animated={true}
    className="hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] hover:border-[var(--accent-border)]"
    {...props}
  >
    {tech}
  </Badge>
);

// Status badge for projects or experience
const StatusBadge = ({ status, variant, ...props }) => {
  const statusVariants = {
    'in-progress': 'warning',
    'completed': 'success',
    'active': 'primary',
    'featured': 'primary'
  };

  return (
    <Badge
      variant={variant || statusVariants[status] || 'default'}
      size="xs"
      animated={true}
      {...props}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
    </Badge>
  );
};

Badge.Skill = SkillBadge;
Badge.Tech = TechBadge;
Badge.Status = StatusBadge;

export default Badge;