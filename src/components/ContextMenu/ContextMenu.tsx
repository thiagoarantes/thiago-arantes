import { forwardRef, useState } from "react";
import cn from "classnames";
import { useAppContext } from "../../hooks/useAppContext";
import AboutMe from "../AboutMe/AboutMe";
import Projects from "../Projects/Projects";
import ContactMe from "../ContactMe/ContactMe";
import styles from "./ContextMenu.module.scss";
import type { ContextMenuProps } from "./types";
import MyComputer from "../MyComputer/MyComputer";

// Color palette based on the attached image
const colorPalette = [
  "#BA5B5B",
  "#FF7B43",
  "#FFBF43",
  "#9BBA5B",
  "#9BBA5B",
  "#5BBA6B",
  "#5C9B8A",
  "#5B8B7B",
  "#4A7C59",
  "#BA7B5B",
  "#8B6B47",
  "#BA5BBA",
  "#5B5BBA",
  "#5B7BBA",
  "#CCCCFF",
  "#4B7BFF",
  "#43BFFF",
  "#5B84BA",
  "#BA9B5B",
  "#666666",
  "#000000",
];

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ x, y, onClose, orderIconsByName }, ref) => {
    const { openWindow, setBackgroundColor, backgroundColor } = useAppContext();
    const [showColorSubmenu, setShowColorSubmenu] = useState(false);

    const handleOpen = (type: string) => {
      onClose();
      switch (type) {
        case "my-computer":
          openWindow(
            "my-computer",
            "My Computer",
            <MyComputer />,
            "/assets/icons/my-computer.png"
          );
          break;
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
    };

    return (
      <div
        ref={ref}
        className={styles.contextMenu}
        style={{ top: y, left: x, display: "block" }}
      >
        <div
          className={styles.contextMenuItem}
          onClick={() => {
            handleOpen("my-computer");
          }}
        >
          Open My Computer
        </div>
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
          className={cn(styles.contextMenuItem, styles.submenuParent)}
          onMouseEnter={() => setShowColorSubmenu(true)}
          onMouseLeave={() => setShowColorSubmenu(false)}
        >
          Background Color
          <img
            src="/assets/arrow.png"
            alt=">"
            className={styles.submenuArrow}
          />
          {showColorSubmenu && (
            <div className={styles.colorSubmenu}>
              <div className={styles.colorGrid}>
                {colorPalette.map((color, index) => (
                  <div
                    key={index}
                    className={cn(styles.colorSwatch, {
                      [styles.selectedColor]: color === backgroundColor,
                    })}
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
        <div
          className={styles.contextMenuItem}
          onClick={() => handleOpen("about")}
        >
          About This Mac
        </div>
      </div>
    );
  }
);

export default ContextMenu;
