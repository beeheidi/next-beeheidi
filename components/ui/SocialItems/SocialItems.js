import React from "react";
import { Link } from "@/i18n/navigation";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function SocialItems() {
  // Composants SVG pour les réseaux qui n'ont pas d'icône dans lucide-react
  const TwitterIcon = () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="text-gray-400"
        >
          <path
            fill="currentColor"
            d="m17.687 3.063l-4.996 5.711l-4.32-5.711H2.112l7.477 9.776l-7.086 8.099h3.034l5.469-6.25l4.78 6.25h6.102l-7.794-10.304l6.625-7.571zm-1.064 16.06L5.654 4.782h1.803l10.846 14.34z"
          />
        </svg>
  );

  const PinterestIcon = () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="text-gray-400"
        >
          <path
            fill="currentColor"
            d="M13.372 2.094a10.003 10.003 0 0 0-5.369 19.074a7.8 7.8 0 0 1 .162-2.292c.185-.839 1.296-5.463 1.296-5.463a3.7 3.7 0 0 1-.324-1.577c0-1.485.857-2.593 1.923-2.593a1.334 1.334 0 0 1 1.342 1.508c0 .9-.578 2.262-.88 3.54a1.544 1.544 0 0 0 1.575 1.923c1.897 0 3.17-2.431 3.17-5.301c0-2.201-1.457-3.847-4.143-3.847a4.746 4.746 0 0 0-4.93 4.793a2.96 2.96 0 0 0 .648 1.97a.48.48 0 0 1 .162.554c-.046.184-.162.623-.208.785a.354.354 0 0 1-.51.253c-1.384-.554-2.036-2.077-2.036-3.816c0-2.847 2.384-6.255 7.154-6.255c3.796 0 6.319 2.777 6.319 5.747c0 3.909-2.176 6.848-5.393 6.848a2.86 2.86 0 0 1-2.454-1.246s-.579 2.316-.692 2.754a8 8 0 0 1-1.019 2.131c.923.28 1.882.42 2.846.416a9.99 9.99 0 0 0 9.996-10.002a10 10 0 0 0-8.635-9.904"
          />
        </svg>
  );

  // Tableau des réseaux sociaux
  const socialNetworks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/Beeheidi.ch",
      icon: <Facebook className="text-gray-400" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/beeheidi.ch",
      icon: <Instagram className="text-gray-400" />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/Beeheidi_ch",
      icon: <TwitterIcon />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/20117764",
      icon: <Linkedin className="text-gray-400" />,
    },
    {
      name: "Pinterest",
      href: "https://www.pinterest.fr/Beeheidi_Switzerland/",
      icon: <PinterestIcon />,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {socialNetworks.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-foreground p-2 rouded-2xl hover:opacity-80 transition-opacity duration-200"
          aria-label={social.name}
        >
          {social.icon}
      </Link>
      ))}
    </div>
  );
}
