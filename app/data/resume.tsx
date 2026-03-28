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
};
