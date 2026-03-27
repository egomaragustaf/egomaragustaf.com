import { Icons } from "@/components/icon";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
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
