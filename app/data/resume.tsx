import { Icons } from "@/components/icon";
import { HomeIcon, NotebookIcon, Users } from "lucide-react";
import {
  SiAngular,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";

export const DATA = {
  name: "Ego Maragustaf",
  initials: "EGM",
  url: "https://egomaragustaf.com",
  description:
    "Software Engineer that love building things and design. I like solving problems and learning new things.",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/about", icon: Users, label: "About" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  avatarUrl: "/me.webp",
  skills: [
    { name: "Typescript", icon: SiTypescript },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "React", icon: SiReact },
    { name: "Nestjs", icon: SiNestjs },
    { name: "Angular", icon: SiAngular },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/egomaragustaf",
        icon: Icons.github,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Siloam Hospitals",
      href: "https://siloamhospitals.com",
      badges: [],
      location: "Jakarta, Indonesia",
      title: "Fullstack Developer",
      logoUrl: "/siloam-hospitals-logo.jpeg",
      start: "Sep 2024",
      end: null,
      description: {
        role: "I am currently working at Siloam Hospitals as a Fullstack Developer.",
        responsibilities: [
          "Developed an inpatient management application using Next.js, Node.js, and TypeScript, deployed across 10+ hospital units in Indonesia.",
          "Developed a payment system application using Angular and TypeScript.",
          "Maintained and refactored legacy codebases to improve readability, modularity, and reusability.",
          "Delivered pull requests that consistently passed SonarQube quality checks with zero issues.",
          "Implemented unit testing using Jest with over 90% test coverage in each pull request.",
          "Optimized invoice generation for large datasets (5000+ items) using jsPDF, reducing processing time from minutes to under 30 seconds.",
        ],
      },
    },
    {
      company: "Platon",
      href: "https://platon.co.id",
      badges: [],
      location: "Remote",
      title: "Fullstack Developer",
      logoUrl: "/platon-logo.jpeg",
      start: "Feb 2024",
      end: "Aug 2024",
      description: {
        role: "I worked at Platon as a Fullstack Developer.",
        responsibilities: [
          "Developed a logistics dashboard for PT Berkat Karimar Mandiri (BKM) to support staff and driver reporting workflows using Next.js and Mantine UI (bkmtranslog.co.id).",
          "Designed and implemented RESTful services using Express.js and TypeScript to support application scalability and backend integration.",
        ],
      },
    },
    {
      company: "Catamyst",
      href: "https://catamyst.com/",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "/catamyst-logo.jpeg",
      start: "Jun 2023",
      end: "Jan 2024",
      description: {
        role: "I worked at Catamyst as a Frontend Developer.",
        responsibilities: [
          "Built an e-commerce web application with a focus on user experience, performance, and responsive design using Remix and Tailwind CSS.",
        ],
      },
    },
  ],
};
