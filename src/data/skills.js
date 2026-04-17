export const skillsData = {
  frontend: {
    title: "Frontend",
    icon: "💻",
    skills: [
      { name: "React.js", level: "Intermediate", icon: "⚛️" },
      { name: "Angular 15+", level: "Intermediate", icon: "🅰️" },
      { name: "JavaScript (ES6+)", level: "Intermediate", icon: "🟨" },
      { name: "TypeScript", level: "Intermediate", icon: "🔷" },
      { name: "HTML5", level: "Intermediate", icon: "🌐" },
      { name: "CSS3", level: "Intermediate", icon: "🎨" },
      { name: "Tailwind CSS", level: "Intermediate", icon: "💨" },
      { name: "Bootstrap 5", level: "Intermediate", icon: "🅱️" },
      { name: "Material UI", level: "Intermediate", icon: "📱" },
      { name: "Redux", level: "Beginner", icon: "🔄" },
      { name: "Next.js", level: "Beginner", icon: "▲" }
    ]
  },
  backend: {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Java", level: "Intermediate", icon: "☕" },
      { name: "Spring Boot", level: "Intermediate", icon: "🍃" },
      { name: "Spring MVC", level: "Intermediate", icon: "🌱" },
      { name: "Spring Security", level: "Beginner", icon: "🔒" },
      { name: "Hibernate / JPA", level: "Intermediate", icon: "🗃️" },
      { name: "Python", level: "Intermediate", icon: "🐍" },
      { name: "Django", level: "Intermediate", icon: "🎸" },
      { name: "Flask", level: "Intermediate", icon: "🧪" },
      { name: "FastAPI", level: "Intermediate", icon: "⚡" },
      { name: "PHP", level: "Intermediate", icon: "🐘" },
      { name: "Laravel", level: "Intermediate", icon: "🔴" },
      { name: "REST APIs", level: "Intermediate", icon: "🔌" },
      { name: "JWT / OAuth2", level: "Beginner", icon: "🔑" }
    ]
  },
  database: {
    title: "Database",
    icon: "🗄️",
    skills: [
      { name: "MySQL", level: "Intermediate", icon: "🐬" },
      { name: "SQLite", level: "Intermediate", icon: "💾" },
      { name: "Hibernate ORM", level: "Intermediate", icon: "🔗" },
      { name: "JDBC", level: "Intermediate", icon: "🔌" },
      { name: "Query Optimization", level: "Intermediate", icon: "🚀" }
    ]
  },
  aitools: {
    title: "AI, CV, DevOps & Tools",
    icon: "🤖",
    skills: [
      { name: "OpenCV", level: "Intermediate", icon: "👁️" },
      { name: "MediaPipe", level: "Intermediate", icon: "📹" },
      { name: "ONNXRuntime", level: "Intermediate", icon: "🧩" },
      { name: "TensorFlow", level: "Beginner", icon: "📈" },
      { name: "OpenAI API", level: "Intermediate", icon: "🧠" },
      { name: "Gemini API", level: "Intermediate", icon: "✨" },
      { name: "Prompt Engineering", level: "Intermediate", icon: "💬" },
      { name: "Nginx", level: "Intermediate", icon: "🌐" },
      { name: "Gunicorn", level: "Intermediate", icon: "🛡️" },
      { name: "Domain Verification", level: "Intermediate", icon: "✅" },
      { name: "Git & GitHub", level: "Advanced", icon: "📚" },
      { name: "GitLab", level: "Intermediate", icon: "🦊" },
      { name: "Maven", level: "Intermediate", icon: "🔧" },
      { name: "Docker", level: "Intermediate", icon: "🐳" },
      { name: "Postman", level: "Advanced", icon: "📮" },
      { name: "Lighthouse", level: "Beginner", icon: "⚡" },
      { name: "VS Code", level: "Advanced", icon: "💻" },
      { name: "npm", level: "Intermediate", icon: "📦" },
      { name: "Vite", level: "Intermediate", icon: "⚡" }
    ]
  }
};

export const getAllSkills = () => {
  return Object.values(skillsData).flatMap(category =>
    category.skills.map(skill => ({
      ...skill,
      category: category.title
    }))
  );
};

export const getSkillsByCategory = (categoryKey) => {
  return skillsData[categoryKey]?.skills || [];
};