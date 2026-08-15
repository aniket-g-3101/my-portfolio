import {
  Code2,
  GraduationCap,
  Briefcase,
  Award,
  Rocket,
  Heart,
  Coffee,
  BookOpen,
  Zap,
  Database,
  Server,
  Cloud,
  Mail,
  MapPin,
  Phone,
  Globe,
  Lightbulb,
  Layout,
  Puzzle,
  Compass,
  Calendar,
  UserCheck,
} from "lucide-react";

import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

// ===================== IMAGE IMPORTS =====================
import PROJECT_IMG_1 from "../assets/images/chat-app.png";
import PROJECT_IMG_2 from "../assets/images/mysql-manager.png";
import PROJECT_IMG_3 from "../assets/images/profile-card.png";
import PROJECT_IMG_4 from "../assets/images/weather-app.png";
import PROJECT_IMG_5 from "../assets/images/Portfolio.png";
import PROJECT_IMG_6 from "../assets/images/voice-to-code.png";
import PROJECT_IMG_7 from "../assets/images/luxstay.png";
import PROJECT_IMG_8 from "../assets/images/contact-manager.png";
import PROJECT_IMG_9 from "../assets/images/home-rental.png";
import PROJECT_IMG_10 from "../assets/images/room-design.png";
import PROJECT_IMG_11 from "../assets/images/fitclub.png";
import PROJECT_IMG_12 from "../assets/images/voting-system.png";
import PROJECT_IMG_13 from "../assets/images/exam-system.png";

// ===================== TECH STACK =====================
export const TECH_STACK = [
  "JavaScript",
  "HTML5",
  "Sass",
  "Webpack",
  "Vite",
  "Jest",
  "Cypress",
  "Figma",
  "Adobe",
  "Notion",
  "Slack",
];

// ===================== STATS =====================
export const STATS = [
  { number: "10+", label: "Projects Completed" },
  { number: "2", label: "Years Experience" },
  { number: "10+", label: "Technologies" },
];

// ===================== CERTIFICATES =====================
import CERT_1 from "../assets/Certificates/oracle.png";
import CERT_2 from "../assets/Certificates/AWS-1.png";
import CERT_3 from "../assets/Certificates/Simpli-Learn-1.png";
import CERT_4 from "../assets/Certificates/AWS-3.png";
import CERT_5 from "../assets/Certificates/Forage-DV.png";
import CERT_6 from "../assets/Certificates/edurika.png";
import CERT_7 from "../assets/Certificates/AWS-2.png";
import CERT_8 from "../assets/Certificates/HackerRank-CSS.png";
import CERT_9 from "../assets/Certificates/HackerRank-Frontend.png";
import CERT_10 from "../assets/Certificates/HP-1.png";
import CERT_11 from "../assets/Certificates/HP-2.png";
import CERT_12 from "../assets/Certificates/Knowledge-Gate.png";
import CERT_13 from "../assets/Certificates/AI.png";
import CERT_14 from "../assets/Certificates/powerBi.png";
import CERT_15 from "../assets/Certificates/be10x.png";
import CERT_16 from "../assets/Certificates/Simpli-Learn-2.png";
import CERT_17 from "../assets/Certificates/skyskill.png";
import CERT_18 from "../assets/Certificates/Unified-Mentor.png";
import CERT_19 from "../assets/Certificates/Deloitte.png";
import CERT_20 from "../assets/Certificates/Communication-Skills.png";
import CERT_21 from "../assets/Certificates/Interview-Skills.png";
import CERT_22 from "../assets/Certificates/Resume-and-Cover-letter.png";

export const CERTIFICATES = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Al Foundations Associate",
    issuer: "Oracle",
    year: "September 21, 2025",
    image: CERT_1,
  },
  {
    title: "Domain 1 Review: AWS Certified Cloud Practitioner (CLF-C02 - English)",
    issuer: "AWS",
    year: "July 26, 2025",
    image: CERT_2,
  },
  {
    title: "Introduction to Data Analytics",
    issuer: "SimpliLearn | SillUp",
    year: "26th July 2025",
    image: CERT_3,
  },
  {
    title: "Domain 2 Review: AWS Certified Machine",
    issuer: "AWS",
    year: "July 26, 2025",
    image: CERT_4,
  },
  {
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Forage | Tata",
    year: "September 23rd, 2025",
    image: CERT_5,
  },
  {
    title: "Edurika Full Stack Development Internship Program",
    issuer: "Edurika",
    year: "26th Jul. 2025",
    image: CERT_6,
  },
  {
    title: "Domain 1 Review: AWS Certified Machine",
    issuer: "AWS",
    year: "July 26, 2025",
    image: CERT_7,
  },
  {
    title: "HackerRank CSS (Basic)",
    issuer: "HackerRank",
    year: "26 Sep. 2024",
    image: CERT_8,
  },
  {
    title: "HackerRank Software Engineer Intern",
    issuer: "HackerRank",
    year: "27 Jul, 2025",
    image: CERT_9,
  },
  {
    title: "HP LIFE online course Agile Project Management",
    issuer: "HP LIFE",
    year: "26 July,2025",
    image: CERT_10,
  },
  {
    title: "HP LIFE online course Effective Leadership",
    issuer: "HP LIFE",
    year: "26 July,2025",
    image: CERT_11,
  },
  {
    title: "Java Certification Test — Knowledge-Gate",
    issuer: "Knowledge Gate",
    year: "8 Aug,2025",
    image: CERT_12,
  },
  {
    title: "Freedom with AI Masterclass",
    issuer: "Freedom With AI",
    year: "26 July,2025",
    image: CERT_13,
  },
  {
    title: "OfficeMaster PowerBl workshop",
    issuer: "OfficeMaster",
    year: "Jul 27th, 2025",
    image: CERT_14,
  },
  {
    title: "Be10x Al tools and ChatGPT workshop",
    issuer: "Be10x",
    year: "July 27th, 2025",
    image: CERT_15,
  },
  {
    title: "Introduction to Generative Al Studio",
    issuer: "SimpliLearn | SillUp",
    year: "26th July 2025",
    image: CERT_16,
  },
  {
    title: "Sky Skill | React",
    issuer: "Sky Skill",
    year: "30th July, 2025",
    image: CERT_17,
  },
  {
    title: "Internship as Frontend Development Intern",
    issuer: "Unified Mentor Pvt Ltd.",
    year: "5 July 2025 - 5 Sep 2025",
    image: CERT_18,
  },
  {
    title: "Deloitte | Data Analytics Job Simulation",
    issuer: "Deloitte",
    year: "15th November, 2025",
    image: CERT_19,
  },
  {
    title: "Communication Skills",
    issuer: "Tcs | Nextstep",
    year: "17th December, 2025",
    image: CERT_20,
  },
  {
    title: "Interview Skills",
    issuer: "Tcs | Nextstep",
    year: "17th December, 2025",
    image: CERT_21,
  },
  {
    title: "Write Effective Resume and Cover letter",
    issuer: "Tcs | Nextstep",
    year: "17th December, 2025",
    image: CERT_22,
  },
];

// ===================== PROJECTS =====================
export const PROJECTS = [
  {
    id: 1,
    title: "Chattrexx - Real-Time Chat App",
    shortTitle: "Chattrexx",
    subtitle: "Real-Time Chat App",
    description:
      "A full-stack real-time chat application featuring instant private messaging, user authentication, room channels, and online presence status.",
    image: PROJECT_IMG_1,
    tags: ["Node.js", "Express.js", "Socket.io", "Firebase Auth", "Tailwind CSS"],
    liveUrl: "https://chattrexx.onrender.com/",
    githubUrl: "https://github.com/aniket-g-3101/Chat_Application",
    featured: true,
    category: "Full Stack",
    iconKey: "MessageSquare",
    journey: [
      { step: "01", name: "IDEA", desc: "Identified need for instant messaging with sub-second latency" },
      { step: "02", name: "DESIGN", desc: "Designed dark mode chat layout and real-time event flow" },
      { step: "03", name: "DEVELOP", desc: "Built Node/Express backend with Socket.io and Firebase" },
      { step: "04", name: "TEST", desc: "Tested multi-user rooms and instant websocket fallback" },
      { step: "05", name: "DEPLOY", desc: "Deployed live application on Render web services" },
    ],
  },
  {
    id: 2,
    title: "Voice-to-Code AI - Intelligent Code Generator",
    shortTitle: "Voice-to-Code AI",
    subtitle: "AI Code Generator",
    description:
      "AI-powered voice developer tool that converts spoken prompts and natural language into formatted, production-ready code snippets.",
    image: PROJECT_IMG_6,
    tags: ["React", "Vite", "WebSpeech API", "Grok SDK", "Express.js", "Tailwind CSS"],
    liveUrl: "https://voice-to-code-ai.vercel.app/",
    githubUrl: "https://github.com/aniket-g-3101/Voice-To-Code-Ai",
    featured: true,
    category: "Tools",
    iconKey: "Mic",
    journey: [
      { step: "01", name: "IDEA", desc: "Targeted hands-free AI code generation for rapid prototyping" },
      { step: "02", name: "DESIGN", desc: "Crafted sleek voice visualizer and dual code display tabs" },
      { step: "03", name: "DEVELOP", desc: "Integrated WebSpeech API with Grok LLM SDK backend" },
      { step: "04", name: "TEST", desc: "Tested speech accuracy, prompt parsing, and code syntax" },
      { step: "05", name: "DEPLOY", desc: "Launched live web app on Vercel platform" },
    ],
  },
  {
    id: 3,
    title: "MySQL Manager (Django)",
    shortTitle: "MySQL Manager",
    subtitle: "Database Management",
    description:
      "A web-based database administration console (phpMyAdmin alternative) supporting schema browsing, session handling, and raw SQL queries.",
    image: PROJECT_IMG_2,
    tags: ["Python", "Django", "MySQL", "JavaScript", "Tailwind CSS"],
    liveUrl: "",
    githubUrl: "https://github.com/aniket-g-3101/mysql_manager",
    featured: true,
    category: "Full Stack",
    iconKey: "Database",
    journey: [
      { step: "01", name: "IDEA", desc: "Needed a clean, browser-based SQL inspection tool" },
      { step: "02", name: "DESIGN", desc: "Structured database tree view and tabular result panels" },
      { step: "03", name: "DEVELOP", desc: "Engineered Django ORM wrappers and SQL query runner" },
      { step: "04", name: "TEST", desc: "Validated transaction security & multi-table operations" },
      { step: "05", name: "DEPLOY", desc: "Packaged database management suite" },
    ],
  },
  {
    id: 4,
    title: "FitClub Gym Management Dashboard",
    shortTitle: "FitClub Gym System",
    subtitle: "Gym Dashboard",
    description:
      "Comprehensive fitness club administration platform to manage member plans, trainer schedules, attendance, and revenue stats.",
    image: PROJECT_IMG_11,
    tags: ["React 18", "Vite", "Tailwind CSS", "LocalStorage"],
    liveUrl: "https://fitclub-org.vercel.app/",
    githubUrl: "https://github.com/aniket-g-3101/fitclub",
    featured: false,
    category: "Full Stack",
    iconKey: "Dumbbell",
    journey: [
      { step: "01", name: "IDEA", desc: "Centralized gym membership & trainer scheduling" },
      { step: "02", name: "DESIGN", desc: "Designed metric dashboard cards and member tables" },
      { step: "03", name: "DEVELOP", desc: "Built React dashboard with LocalStorage persistence" },
      { step: "04", name: "TEST", desc: "Verified member subscription status calculations" },
      { step: "05", name: "DEPLOY", desc: "Hosted live dashboard on Vercel" },
    ],
  },
  {
    id: 5,
    title: "Escape AI Cyber Room Experience",
    shortTitle: "Escape AI Room",
    subtitle: "AI Experience App",
    description:
      "Interactive AI-driven puzzle game with cybernetic visuals, timed riddles, and intelligent adaptive challenge hints.",
    image: PROJECT_IMG_10,
    tags: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: "https://github.com/aniket-g-3101/Escape-Ai-Room-Design",
    featured: false,
    category: "Tools",
    iconKey: "Cpu",
    journey: [
      { step: "01", name: "IDEA", desc: "Fused AI story prompts with puzzle room mechanics" },
      { step: "02", name: "DESIGN", desc: "Designed dark cyberpunk UI widgets and status displays" },
      { step: "03", name: "DEVELOP", desc: "Engineered puzzle evaluation state machine in React" },
      { step: "04", name: "TEST", desc: "Simulated countdown timer and win condition triggers" },
      { step: "05", name: "DEPLOY", desc: "Published interactive AI puzzle game" },
    ],
  },
  {
    id: 6,
    title: "Online Voting System (Java)",
    shortTitle: "Online Voting System",
    subtitle: "Secure Voting Platform",
    description:
      "Enterprise desktop application built with Java Swing and Oracle DB, featuring biometric voter ID checks, digital balloting, and audit logs.",
    image: PROJECT_IMG_12,
    tags: ["Java", "Java Swing", "Oracle SQL", "JDBC"],
    liveUrl: "",
    githubUrl: "https://github.com/aniket-g-3101/Voting-System",
    featured: false,
    category: "Others",
    iconKey: "Vote",
    journey: [
      { step: "01", name: "IDEA", desc: "Created secure digital voting system to eliminate manual errors" },
      { step: "02", name: "DESIGN", desc: "Designed voter authentication and confidential ballot screen" },
      { step: "03", name: "DEVELOP", desc: "Programmed Java Swing frontend connected to Oracle DB" },
      { step: "04", name: "TEST", desc: "Executed concurrency locks and vote tally integrity tests" },
      { step: "05", name: "DEPLOY", desc: "Packaged desktop Java enterprise application" },
    ],
  },
  {
    id: 7,
    title: "Online Exam System (Java)",
    shortTitle: "Online Exam System",
    subtitle: "Exam & Testing System",
    description:
      "Desktop examination platform built with Java Swing and Oracle DB, offering automated MCQ scoring, question banks, and timer controls.",
    image: PROJECT_IMG_13,
    tags: ["Java", "Java Swing", "Oracle SQL", "JDBC"],
    liveUrl: "",
    githubUrl: "https://github.com/aniket-g-3101/OnlineExamSystem",
    featured: false,
    category: "Others",
    iconKey: "BookOpen",
    journey: [
      { step: "01", name: "IDEA", desc: "Automated student examination testing and instant grading" },
      { step: "02", name: "DESIGN", desc: "Created timed test screen with question status grid" },
      { step: "03", name: "DEVELOP", desc: "Built Java Swing interface with SQL database backend" },
      { step: "04", name: "TEST", desc: "Tested auto-submit timer triggers and grade calculation" },
      { step: "05", name: "DEPLOY", desc: "Delivered desktop testing platform" },
    ],
  },
  {
    id: 8,
    title: "Home Rental Property Finder",
    shortTitle: "Home Rental App",
    subtitle: "Property Platform",
    description:
      "A modern real estate portal for discovering, comparing, and booking residential properties across major metropolitan cities.",
    image: PROJECT_IMG_9,
    tags: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: "https://github.com/aniket-g-3101/home-rental-webapp",
    featured: false,
    category: "Web Apps",
    iconKey: "Home",
    journey: [
      { step: "01", name: "IDEA", desc: "Simplified property hunting with instant filters" },
      { step: "02", name: "DESIGN", desc: "Mapped out property cards and price filter sliders" },
      { step: "03", name: "DEVELOP", desc: "Built React frontend with client-side listing search" },
      { step: "04", name: "TEST", desc: "Verified property detail modal navigation" },
      { step: "05", name: "DEPLOY", desc: "Released web application preview" },
    ],
  },
  {
    id: 9,
    title: "Contact Manager Web App",
    shortTitle: "Contact Manager",
    subtitle: "Lead & Directory App",
    description:
      "Full-stack contact directory app built using Django REST backend and React frontend with instant search, category tags, and profile updates.",
    image: PROJECT_IMG_8,
    tags: ["Django REST", "React", "Python", "Tailwind CSS"],
    liveUrl: "",
    githubUrl: "https://github.com/aniket-g-3101/contact_manager_Django",
    featured: false,
    category: "Full Stack",
    iconKey: "UserCheck",
    journey: [
      { step: "01", name: "IDEA", desc: "Streamlined directory contact management" },
      { step: "02", name: "DESIGN", desc: "Designed contact list drawer and quick edit modals" },
      { step: "03", name: "DEVELOP", desc: "Connected Django REST API with React state management" },
      { step: "04", name: "TEST", desc: "Tested search indexing and field validation" },
      { step: "05", name: "DEPLOY", desc: "Delivered full stack contact dashboard" },
    ],
  },
  {
    id: 10,
    title: "LuxStay - Hotel Booking Platform",
    shortTitle: "LuxStay Hotel App",
    subtitle: "Hotel Booking System",
    description:
      "Full-featured hospitality booking platform with real-time room availability, filter by amenities, customer reviews, and guest reservations.",
    image: PROJECT_IMG_7,
    tags: ["Python", "Django", "HTML5", "CSS3", "JavaScript"],
    liveUrl: "",
    githubUrl: "https://github.com/aniket-g-3101/hotel-management-system",
    featured: false,
    category: "Web Apps",
    iconKey: "Hotel",
    journey: [
      { step: "01", name: "IDEA", desc: "Simplified hotel room browsing and instant booking" },
      { step: "02", name: "DESIGN", desc: "Designed luxury card grids and date-range pickers" },
      { step: "03", name: "DEVELOP", desc: "Built Django backend models and relational room DB" },
      { step: "04", name: "TEST", desc: "Verified booking collision checks and user auth" },
      { step: "05", name: "DEPLOY", desc: "Deployed web application preview" },
    ],
  },
  {
    id: 11,
    title: "Personal Developer Portfolio",
    shortTitle: "Developer Portfolio",
    subtitle: "Interactive Portfolio",
    description:
      "High-performance personal developer portfolio featuring glassmorphism aesthetics, custom Lenis smooth scroll, and interactive project showcases.",
    image: PROJECT_IMG_5,
    tags: ["React 18", "Tailwind CSS", "Framer Motion", "Lenis Scroll"],
    liveUrl: "https://im-aniket.vercel.app/",
    githubUrl: "https://github.com/aniket-g-3101/my-portfolio",
    featured: true,
    category: "Web Apps",
    iconKey: "Layout",
    journey: [
      { step: "01", name: "IDEA", desc: "Planned interactive digital showcase for skills and work" },
      { step: "02", name: "DESIGN", desc: "Crafted modern theme tokens and micro-interactions" },
      { step: "03", name: "DEVELOP", desc: "Built with React 18, Tailwind CSS, & Framer Motion" },
      { step: "04", name: "TEST", desc: "Audited lighthouse score, frame rates, and mobile UI" },
      { step: "05", name: "DEPLOY", desc: "Hosted live on Vercel with custom domain" },
    ],
  },
  {
    id: 12,
    title: "Vibrant Weather Forecast App",
    shortTitle: "Vibrant Weather App",
    subtitle: "Weather Forecast",
    description:
      "Interactive weather engine featuring city autocomplete, 7-day forecast cards, and adaptive ambient UI backgrounds matching live weather states.",
    image: PROJECT_IMG_4,
    tags: ["JavaScript", "HTML5", "CSS3", "WeatherAPI"],
    liveUrl: "https://realtime-weatherr.netlify.app/",
    githubUrl: "https://github.com/aniket-g-3101/weather-app",
    featured: false,
    category: "Web Apps",
    iconKey: "CloudSun",
    journey: [
      { step: "01", name: "IDEA", desc: "Wanted instant weather updates with condition themes" },
      { step: "02", name: "DESIGN", desc: "Created weather cards adapting visually to weather API" },
      { step: "03", name: "DEVELOP", desc: "Integrated WeatherAPI and geolocation services" },
      { step: "04", name: "TEST", desc: "Verified search debounce and API fallback states" },
      { step: "05", name: "DEPLOY", desc: "Hosted live on Netlify cloud" },
    ],
  },
  {
    id: 13,
    title: "Personal Interactive Profile Card",
    shortTitle: "Personal Profile Card",
    subtitle: "Digital ID Card",
    description:
      "A modern, responsive digital profile card highlighting skills, social channels, and contact info with pure CSS hover animations.",
    image: PROJECT_IMG_3,
    tags: ["HTML5", "CSS3", "Flexbox", "CSS Animations"],
    liveUrl: "https://aniketz-profile.vercel.app/",
    githubUrl: "https://github.com/aniket-g-3101/profile-card",
    featured: false,
    category: "Others",
    iconKey: "FileText",
    journey: [
      { step: "01", name: "IDEA", desc: "Created fast digital card for developer profile" },
      { step: "02", name: "DESIGN", desc: "Stylized frosted glass container and glowing borders" },
      { step: "03", name: "DEVELOP", desc: "Coded with semantic HTML and keyframe CSS" },
      { step: "04", name: "TEST", desc: "Tested responsive scaling on mobile screens" },
      { step: "05", name: "DEPLOY", desc: "Deployed as shareable Vercel web card" },
    ],
  },
];


// ===================== JOURNEY =====================
export const JOURNEY_STEPS = [
  {
    year: "2023",
    title: "Started My Development Journey",
    description:
      "Began my Bachelor of Computer Science journey and started building a strong foundation in programming and web development.",
    icon: Code2,
    color: "bg-blue-500",
  },
  {
    year: "2024",
    title: "Built & Explored",
    description:
      "Worked on multiple web development projects while expanding my skills across frontend, backend, databases and APIs.",
    icon: Rocket,
    color: "bg-indigo-500",
  },
  {
    year: "2025",
    title: "Frontend Developer Intern",
    description:
      "Joined Unified Mentor as a Frontend Developer and gained hands-on experience building responsive applications and reusable UI components.",
    icon: Briefcase,
    color: "bg-green-500",
  },
  {
    year: "2025 – 2026",
    title: "Freelance Development",
    description:
      "Started working on freelance projects, solving real-world requirements and building practical web solutions for clients.",
    icon: Zap,
    color: "bg-orange-500",
  },
  {
    year: "2026",
    title: "BCS Graduate • 9.42 CGPA",
    description:
      "Successfully completed my Bachelor of Computer Science with 9.42 CGPA and continue to grow as a developer.",
    icon: GraduationCap,
    color: "bg-purple-500",
  },
];

// ===================== PASSIONS =====================
export const PASSIONS = [
  {
    icon: Heart,
    title: "Building for the Web",
    description: "Creating responsive and interactive experiences using modern technologies.",
  },
  {
    icon: Puzzle,
    title: "Solving Problems",
    description: "Breaking complex requirements into practical and efficient solutions.",
  },
  {
    icon: Layout,
    title: "Clean Interfaces",
    description: "Designing beautiful, intuitive and user-focused interfaces.",
  },
  {
    icon: BookOpen,
    title: "Learning & Exploring",
    description: "Continuously learning new things and staying updated with latest trends.",
  },
];

// ===================== SOCIAL LINKS =====================
export const SOCIAL_LINKS = [
  { name: "GitHub", icon: FiGithub, url: "https://github.com/aniket-g-3101", color: "hover:text-gray-400", bgColor: "hover:bg-gray-800" },
  { name: "LinkedIn", icon: FiLinkedin, url: "https://linkedin.com/in/aniketgavali", color: "hover:text-blue-400", bgColor: "hover:bg-blue-500/10" },
  { name: "LeetCode", icon: FiTwitter, url: "https://leetcode.com/u/aniket-g-3101/", color: "hover:text-sky-400", bgColor: "hover:bg-sky-500/10" },
  { name: "Email", icon: Mail, url: "mailto:aniketgavaliwork@gmail.com", color: "hover:text-red-400", bgColor: "hover:bg-red-100" },
];

// ===================== CONTACT INFO =====================
export const CONTACT_INFO = [
  { icon: MapPin, label: "Location", value: "Pandharpur, Maharashtra, India" },
  { icon: Mail, label: "Email", value: "aniketgavaliwork@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 78220 50904" },
];
