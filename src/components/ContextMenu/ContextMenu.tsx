import { forwardRef, useState } from "react";
import { useAppContext } from "../../contexts/useAppContext";
import AboutMe from "../AboutMe/AboutMe";
import Projects from "../Projects/Projects";
import ContactMe from "../ContactMe/ContactMe";
import styles from "./ContextMenu.module.scss";
import type { ContextMenuProps } from "./types";

// Color palette based on the attached image
const colorPalette = [
  // Top row
  "#5B84BA",
  "#5C9B8A",
  "#BA7B5B",
  "#BA5B5B",
  "#5BBA6B",
  "#5B5BBA",
  "#9BBA5B",
  "#4A7C59",
  "#5B7BBA",
  "#BA5BBA",
  "#BA9B5B",
  // Bottom row
  "#9BBA5B",
  "#BA5BBA",
  "#FF7B43",
  "#8B6B47",
  "#4B7BFF",
  "#666666",
  "#FFBF43",
  "#5B8B7B",
  "#43BFFF",
  "#000000",
  "#ccccff",
];

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ x, y, onClose, orderIconsByName }, ref) => {
    const { openWindow, setBackgroundColor, backgroundColor } = useAppContext();
    const [showColorSubmenu, setShowColorSubmenu] = useState(false);

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

    const handleColorSelect = (color: string) => {
      setBackgroundColor(color);
      onClose();
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
        <div
          className={`${styles.contextMenuItem} ${styles.submenuParent}`}
          onMouseEnter={() => setShowColorSubmenu(true)}
          onMouseLeave={() => setShowColorSubmenu(false)}
        >
          Background Color
          {showColorSubmenu && (
            <div className={styles.colorSubmenu}>
              <div className={styles.colorGrid}>
                {/* Add current color at the top */}
                <div
                  className={`${styles.colorSwatch} ${styles.currentColor}`}
                  style={{ backgroundColor }}
                  onClick={() => handleColorSelect(backgroundColor)}
                  title="Current Color"
                />
                {colorPalette.map((color, index) => (
                  <div
                    key={index}
                    className={styles.colorSwatch}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
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
