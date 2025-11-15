// ===================== ICON IMPORTS =====================
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
} from "lucide-react";

import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

// ===================== IMAGE IMPORTS =====================
import PROJECT_IMG_1 from "../assets/images/chat-app.png";
import PROJECT_IMG_2 from "../assets/images/mysql-manager.png";
import PROJECT_IMG_3 from "../assets/images/profile-card.png";
import PROJECT_IMG_4 from "../assets/images/weather-app.png";
import PROJECT_IMG_5 from "../assets/images/Portfolio.png";
// import PROJECT_IMG_6 from "../assets/images/project-6.png";
// import PROJECT_IMG_7 from "../assets/images/project-7.png";

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
// …add more as needed!

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
  },{
    title: "OfficeMaster PowerBl workshop",
    issuer: "OfficeMaster",
    year: "Jul 27th, 2025",
    image: CERT_14,
  },{
    title: "Be10x Al tools and ChatGPT workshop",
    issuer: "Be10x",
    year: "July 27th, 2025",
    image: CERT_15,
  },{
    title: "Introduction to Generative Al Studio",
    issuer: "SimpliLearn | SillUp",
    year: "26th July 2025",
    image: CERT_16,
  },{
    title: "Sky Skill | React",
    issuer: "Sky Skill",
    year: "30th July, 2025",
    image: CERT_17,
  },{
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
  }
];



// ===================== PROJECTS =====================
export const PROJECTS = [
  {
    id: 1,
    title: "Real-Time Chat Application",
    description:
      "A Real-Time Chat Application like whatsApp ,Instagram with login Authentication and Live chat rooms.",
    image: PROJECT_IMG_1,
    tags: ["HTML 5", "CSS", "JavaScript","WebScoket","ExpressJs"],
    liveUrl: "https://chattrexx.onrender.com/",
    githubUrl: "https://github.com/aniket-g-3101/Chat_Application",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 2,
    title: "MySQL Manager",
    description:
      "Build a custom web-based tool (like phpMyAdmin) from scratch .Secure login with session handling ,Full CRUD operations, Database & table management.",
    image: PROJECT_IMG_2,
    tags: ["Django", "HTML 5", "CSS", "JavaScript","MySQL"],
    // liveUrl: "#",
    githubUrl: "https://github.com/aniket-g-3101/mysql_manager",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 3,
    title: "Personal Profile Card",
    description:
      "A Modern Looking ,Attractive Profile Card build using HTML and CSS showing up my information , skills and a little more .",
    image: PROJECT_IMG_3,
    tags: ["HTML 5", "CSS"],
    liveUrl: "https://aniketz-profile.vercel.app/",
    githubUrl: "https://github.com/aniket-g-3101/profile-card",
    featured: false,
    category: "Web App",
  },
   {
    id: 4,
    title: "Weather App",
    description:
      "Developed a responsive weather app with city/postcode search, autocomplete functionality, and dynamic UI that adapts to weather conditions.",
    image: PROJECT_IMG_4,
    tags: ["HTML 5", "CSS","JavaScript","WeatherAPI"],
    liveUrl: "https://realtime-weatherr.netlify.app/",
    githubUrl: "https://github.com/aniket-g-3101/weather-app",
    featured: false,
    category: "Web App",
  },
  {
    id: 5,
    title: "Personal Portfolio",
    description:
      "Developed a responsive and beautiful Personal Portfolio Web-App, dynamic UI that mirrors my Skills and Capability.",
    image: PROJECT_IMG_5,
    tags: ["React", "Tailwind CSS","JavaScript","Framer Motion"],
    liveUrl: "https://im-aniket.vercel.app/",
    githubUrl: "https://github.com/aniket-g-3101/my-portfolio",
    featured: true,
    category: "Web App",
  },
];

// ===================== JOURNEY =====================
export const JOURNEY_STEPS = [
  {
    year: "2020",
    title: "Completed SSC",
    company: "Self-taught",
    description:
      "Completed My SSC from Pandharpur securing 86.40%.",
    icon: Code2,
    color: "bg-blue-500",
  },
  {
    year: "2022",
    title: "Completed HSC",
    company: "Self-taught",
    description:
      "Completed My SSC from Pandharpur securing 70.33%.",
    icon: Briefcase,
    color: "bg-green-500",
  },
  {
    year: "2023",
    title: "Started Coding Journey",
    company: "Self-taught",
    description:
      "Started coding Journey by taking admission to the course BCS(ECS) in Sangola College Sangola.",
    icon: Rocket,
    color: "bg-orange-500",
  },
//   {
//     year: "2024",
//     title: "Freelance & Open Source",
//     company: "Independent",
//     description:
//       "Started freelancing and contributing to open source projects.",
//     icon: Award,
//     color: "bg-purple-500",
//   },
//   {
//     year: "2025",
//     title: "Senior Developer",
//     company: "Present",
//     description:
//       "Launched multiple web applications and exploring AI integration.",
//     icon: Zap,
//     color: "bg-pink-500",
//   },
];

// ===================== PASSIONS =====================
export const PASSIONS = [
  {
    icon: Heart,
    title: "User Experience",
    description: "Crafting intuitive interfaces that users love.",
  },
  {
    icon: Coffee,
    title: "Problem Solving",
    description: "Turning complex challenges into elegant solutions.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "Always exploring new technologies and best practices.",
  },
];

// ===================== SOCIAL LINKS =====================
export const SOCIAL_LINKS = [
  { name: "GitHub", icon: FiGithub, url: "https://github.com/aniket-g-3101", color: "hover:text-gray-400", bgColor: "hover:bg-gray-800" },
  { name: "LinkedIn", icon: FiLinkedin, url: "https://linkedin.com/in/aniketgavali", color: "hover:text-blue-400", bgColor: "hover:bg-blue-500/10" },
  { name: "LeetCode", icon: FiTwitter, url: "https://leetcode.com/u/aniket-g-3101/", color: "hover:text-sky-400", bgColor: "hover:bg-sky-500/10" },
  { name: "Email", icon: Mail, url: "mailto:aniket.g.dev@gmail.com", color: "hover:text-red-400", bgColor: "hover:bg-red-100" },
];

// ===================== CONTACT INFO =====================
export const CONTACT_INFO = [
  { icon: MapPin, label: "Location", value: "Solapur,India" },
  { icon: Mail, label: "Email", value: "aniket.g.dev@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 78220 50904" },
];
