import { forwardRef } from "react";
import { useAppContext } from "../../contexts/useAppContext";
import AboutMe from "../AboutMe/AboutMe";
import Projects from "../Projects/Projects";
import ContactMe from "../ContactMe/ContactMe";
import styles from "./ContextMenu.module.scss";
import type { ContextMenuProps } from "./types";

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ x, y, onClose, orderIconsByName }, ref) => {
    const { openWindow } = useAppContext();

    const handleOpen = (type: string) => {
      onClose();
      switch (type) {
        case "about":
          openWindow(
            "about-me",
            "About Me",
            <AboutMe />,
            "/assets/icons/profile.png"
          );
          break;
        case "projects":
          openWindow(
            "projects",
            "My Projects",
            <Projects />,
            "/assets/icons/projects.png"
          );
          break;
        case "contact":
          openWindow(
            "contact-me",
            "Contact Me",
            <ContactMe />,
            "/assets/icons/contact-me.png"
          );
          break;
        default:
          break;
      }
    };

    return (
      <div
        ref={ref}
        className={styles.contextMenu}
        style={{ top: y, left: x, display: "block" }}
      >
        <div
          className={styles.contextMenuItem}
          onClick={() => handleOpen("about")}
        >
          Open About Me
        </div>
        <div
          className={styles.contextMenuItem}
          onClick={() => handleOpen("projects")}
        >
          Open Projects
        </div>
        <div
          className={styles.contextMenuItem}
          onClick={() => handleOpen("contact")}
        >
          Open Contact
        </div>
        <hr className={styles.contextMenuHr} />
        <div
          className={styles.contextMenuItem}
          onClick={() => {
            orderIconsByName();
            onClose();
          }}
        >
          Order Icons by Name
        </div>
        <hr className={styles.contextMenuHr} />
        <div className={styles.contextMenuItem} onClick={onClose}>
          Get Info
        </div>
      </div>
    );
  }
);

export default ContextMenu;
