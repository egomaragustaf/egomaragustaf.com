import { Icons } from "@/components/icon";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Ego Maragustaf",
  initials: "EGM",
  url: "https://egomaragustaf.com",
  description:
    "Software Engineer that love building things and helping people.",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
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
