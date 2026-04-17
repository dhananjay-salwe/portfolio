// Maintain all project card content here.
// For images, place files in /public and reference them as '/file-name.png'.
// Current image files used: /attendo.png, /face-widget.png, /swayamsiddh.png, /face-recognition-1.png, /dataauth.png
export const featuredProjects = [
  {
    id: 'attendo',
    title: 'Attendo',
    subtitle: 'Student and Staff Attendance Management System',
    description: 'A comprehensive attendance management system for 200+ students and staff, featuring real-time tracking, automated reporting, and role-based access control.',
    longDescription: 'Attendo is a full-stack attendance platform built with Spring Boot and Angular 15 for 200+ users. It includes 15+ REST API endpoints, Spring Security authentication, role-based access control, and optimized MySQL queries for sub-second responses.',
    tech: ['Spring Boot', 'Hibernate', 'MySQL', 'Angular 15', 'REST APIs', 'Spring Security', 'TypeScript', 'Material UI'],
    image: '/attendo.png',
    github: 'https://github.com/dhananjay-salwe/Attendo_API',
    live: 'https://github.com/dhananjaysalwe/Attendo_ng',
    impact: 'Reduced manual data entry by 70% and improved API response time by 40%.',
    featured: true,
    category: 'Full Stack'
  },
  {
    id: 'f-widget',
    title: 'F-Widget Dashboard',
    subtitle: 'Embeddable Face Recognition Widget SaaS',
    description: 'A multi-tenant Laravel 11 platform that delivers secure embeddable face-recognition widgets with domain verification and per-session controls.',
    longDescription: 'Built a Shadow DOM-isolated widget architecture with floating and embedded modes, three-layer domain security, HMAC token validation, and per-session rate limiting. Deployed through a Dockerized Nginx/PHP-FPM stack with session persistence and usage analytics.',
    tech: ['Laravel 11', 'PHP 8.3', 'MySQL', 'Blade', 'Tailwind CSS', 'JavaScript', 'jQuery', 'Nginx', 'Docker'],
    image: '/face-widget.png',
    github: null,
    live: null,
    impact: 'Enabled secure embeddable face recognition with enterprise-grade domain verification and usage governance.',
    featured: true,
    category: 'SaaS'
  },
  {
    id: 'swayamsiddh',
    title: 'Swayamsiddh NGO Website',
    subtitle: 'Bilingual accessible site with secure admin',
    description: 'Laravel-powered NGO website with English/Marathi toggle, accessibility controls, and a hidden admin portal for news, events, and media management.',
    longDescription: 'Implemented a responsive Bootstrap 5 frontend with AOS animations, custom font-resizer, and bilingual content switching. Secured the admin area behind a custom entry path, added full CRUD for news/events, dynamic contact details, SMTP mail routing, and Hostinger-friendly storage so uploads publish instantly.',
    tech: ['Laravel', 'PHP 8.3', 'MySQL', 'Blade', 'Bootstrap 5', 'JavaScript', 'AOS', 'SMTP'],
    image: '/swayamsiddh.png',
    github: null,
    live: 'https://swayamsiddh.in',
    impact: 'Enabled the NGO team to self-manage bilingual updates through a hardened dashboard without touching code.',
    featured: true,
    category: 'Web Development'
  },
  {
    id: 'flask-face-recognition',
    title: 'Face Recognition Kiosk',
    subtitle: 'Flask liveness & anti-spoofing system',
    description: 'Real-time face authentication with MediaPipe landmarks, ArcFace embeddings, and MiniFASNet spoof detection behind Nginx/Gunicorn.',
    longDescription: 'Developed an end-to-end liveness verification stack using Flask, ONNXRuntime, and OpenCV with CLAHE normalization. Deployed behind Nginx and systemd-managed Gunicorn workers with MySQL-persisted embeddings, delivering 15-30 FPS with multi-layer anti-spoofing.',
    tech: ['Flask', 'Python 3.8', 'ONNXRuntime', 'OpenCV', 'MediaPipe', 'Gunicorn', 'MySQL', 'Nginx'],
    image: '/face-recognition-1.png',
    github: null,
    live: null,
    impact: 'Delivered real-time liveness and anti-spoofing at 15-30 FPS with hardened production deployment.',
    featured: true,
    category: 'AI/Computer Vision'
  },
  {
    id: 'dataauth',
    title: 'DataAuth',
    subtitle: 'Resume Authenticity Verification System',
    description: 'An automated resume verification system that parses PDF resumes and validates candidate details against LinkedIn profiles.',
    longDescription: 'DataAuth automates candidate screening by parsing resume PDFs and matching extracted fields against LinkedIn profile data through RapidAPI. It improves verification consistency and reduces recruiter effort while maintaining high match accuracy.',
    tech: ['PHP', 'Laravel', 'MySQL', 'RapidAPI', 'JavaScript', 'PDF Parsing'],
    image: '/dataauth.png',
    github: 'https://github.com/dhananjay-salwe/DataAuth',
    live: null,
    impact: 'Achieved 85% field-match accuracy, reduced HR screening time by 50%, and supported processing 50+ resumes daily.',
    featured: true,
    category: 'Full Stack'
  }
];

export const allProjects = [
  ...featuredProjects,
  // Additional projects can be added here
];
