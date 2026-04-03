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
      description:
        "I am currently working at Siloam Hospitals as a Fullstack Developer.",
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
      description: "I worked at Platon as a Fullstack Developer.",
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
      description: "I worked at Catamyst as a Frontend Developer.",
    },
  ],
};
