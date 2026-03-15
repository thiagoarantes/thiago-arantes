import React from "react";
import styles from "./ContactMe.module.scss";
import { asset } from "../../utils/asset";

const SOCIAL_LINKS = [
  {
    id: "email",
    label: "Email",
    href: "mailto:thiagoarantes@gmail.com",
    icon: (
      <img
        src={asset("/assets/icons/email.png")}
        alt="Email"
        aria-hidden="true"
        tabIndex={-1}
        style={{ display: "block" }}
      />
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/thiagoarantes",
    icon: (
      <img
        src={asset("/assets/icons/instagram.png")}
        alt="Instagram"
        aria-hidden="true"
        tabIndex={-1}
        style={{ display: "block" }}
      />
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/thiagoarantes/",
    icon: (
      <img
        src={asset("/assets/icons/linkedin.png")}
        alt="LinkedIn"
        aria-hidden="true"
        tabIndex={-1}
        style={{ display: "block" }}
      />
    ),
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/thiagoarantes",
    icon: (
      <img
        src={asset("/assets/icons/github.png")}
        alt="GitHub"
        aria-hidden="true"
        tabIndex={-1}
        style={{ display: "block" }}
      />
    ),
  },
] as const;

const ContactMe: React.FC = () => {
  return (
    <div className={styles.container}>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.id}
          className={styles.socialLink}
          href={link.href}
          target={link.id === "email" ? undefined : "_blank"}
          rel={link.id === "email" ? undefined : "noopener noreferrer"}
          title={link.label}
        >
          <span className={styles.iconImage}>{link.icon}</span>
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
};

export default ContactMe;
