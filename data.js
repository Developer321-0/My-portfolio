/**
 * Muhammad Arslan - Portfolio Data
 * Easily edit this file to update projects, skills, timeline, or contact info.
 */

export const personalInfo = {
  name: "Muhammad Arslan",
  titles: [
    "Intelligent Automation Systems",
    "AI-Powered Web Applications",
    "Smart Business Workflows",
    "Data-Driven Solutions"
  ],
  tagline: "Building intelligent, automated systems and high-performance applications that bridge the gap between AI research and practical, scalable engineering.",
  about: "I am a BS Computer Science student at the Institute of Space Technology, Islamabad. Passionate about Artificial Intelligence, automation workflows, and building smart web applications, I focus on crafting seamless digital solutions that solve real-world problems.",
  profilePicture: "./assets/profile.jpeg",
  socials: {
    github: "https://github.com/Developer321-0",
    linkedin: "https://www.linkedin.com/in/muhammad-arslan-1763aa334/",
    email: "mailto:arslank5859e@gmail.com"
  }
};

export const skills = [
  {
    category: "AI & Machine Learning",
    items: [
      { name: "Python", icon: "devicon-python-plain" },
      { name: "Machine Learning / Deep Learning", icon: "devicon-tensorflow-original" },
      { name: "NLP & LLM Integration", icon: "devicon-opencv-plain" },
      { name: "Prompt Engineering", icon: "devicon-numpy-original" }
    ]
  },
  {
    category: "Workflow Automation",
    items: [
      { name: "n8n Automation Workflows", icon: "devicon-nodejs-plain" },
      { name: "API & Webhook Integrations", icon: "devicon-fastapi-plain" },
      { name: "Cloud Automations", icon: "devicon-googlecloud-plain" },
      { name: "Cron Jobs & Web Scraping", icon: "devicon-python-plain" }
    ]
  },
  {
    category: "Web Development",
    items: [
      { name: "HTML5 / CSS3 / Modern JS", icon: "devicon-javascript-plain" },
      { name: "Node.js & Express", icon: "devicon-express-original" },
      { name: "RESTful APIs", icon: "devicon-postman-plain" },
      { name: "SQL & NoSQL Databases", icon: "devicon-mongodb-plain" }
    ]
  }
];

export const education = [
  {
    institution: "Institute of Space Technology, Islamabad",
    degree: "BS Computer Science",
    duration: "2023 - Present",
    details: "Focusing on Artificial Intelligence, Software Engineering, Algorithms, and System Architectures. Actively working on workflow automation projects and AI research applications."
  },
  {
    institution: "FG Sir Syed College, Rawalpindi",
    degree: "Intermediate in Computer Science",
    duration: "Completed",
    details: "Strong academic foundation in Mathematics, Physics, and Computer Science, leading towards specialized undergraduate studies in AI & Computing."
  }
];

export const projects = [
  {
    title: "AI-Powered Smart Hiring System",
    description: "An intelligent recruitment platform that utilizes artificial intelligence and NLP to screen CVs, parse candidate experience, match skills against job descriptions, and automatically shortlist the top candidates.",
    techStack: ["Python", "OpenAI API", "NLP", "FastAPI", "React"],
    image: "assets/hiring-system-dashboard.png",
    githubLink: "https://github.com/[ADD YOUR LINK HERE]",
    liveLink: "https://[ADD YOUR LINK HERE]",
    featured: true
  },
  {
    title: "AI-Powered Smart Inventory Store",
    description: "A comprehensive modern e-commerce storefront enhanced with AI-driven product recommendations, semantic product search, and automated AI chat support to personalize user shopping experiences.",
    techStack: ["Node.js", "Express", "MongoDB", "Vector Search", "Tailwind CSS"],
    image: "assets/ecommerce-system-dashboard.png",
    githubLink: "https://github.com/Developer321-0/AI-powered-Smart-Inventory-Store",
    liveLink: "https://[ADD YOUR LINK HERE]",
    featured: true
  },
  {
    title: "Freight Automation (n8n)",
    description: "A robust workflow automation system designed for logistics and freight management. It parses incoming shipping inquiries, automates quoting, fetches live rates, and syncs logistics data to external CRM platforms automatically.",
    techStack: ["n8n Workflows", "Webhooks", "JSON Parser", "Google Sheets API", "Slack API"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
    githubLink: "https://github.com/Developer321-0/Freight-Automation-",
    liveLink: "https://[ADD YOUR LINK HERE]",
    featured: true
  },
  {
    title: "Finance Analyzer Automation (n8n)",
    description: "An automated financial analysis system built to process recurring statements, track expenditures, classify categories via AI models, and email clean, interactive reports with metrics.",
    techStack: ["n8n", "AI Classification", "Gmail Trigger", "PostgreSQL", "Google Sheets"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    githubLink: "https://github.com/Developer321-0/AI-Finance-Analyzer",
    liveLink: "https://[ADD YOUR LINK HERE]",
    featured: true
  }
];
