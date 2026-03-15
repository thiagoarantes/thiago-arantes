import { forwardRef } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import AboutMe from "../AboutMe/AboutMe";
import Projects from "../Projects/Projects";
import ContactMe from "../ContactMe/ContactMe";
import styles from "./ContextMenu.module.scss";
import type { ContextMenuProps } from "./types";
import MyComputer from "../MyComputer/MyComputer";
import { asset } from "../../utils/asset";

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ x, y, onClose, orderIconsByName }, ref) => {
    const { openWindow } = useAppContext();

    const handleOpen = (type: string) => {
      onClose();

      switch (type) {
        case "my-computer":
          openWindow("my-computer", "My Computer", <MyComputer />, {
            icon: asset("/assets/icons/my-computer.png"),
          });
          break;
        case "about":
          openWindow("about-me", "About Me", <AboutMe />, {
            icon: asset("/assets/icons/profile.png"),
            size: { width: 550, height: 500 },
          });
          break;
        case "projects":
          openWindow("projects", "My Projects", <Projects />, {
            icon: asset("/assets/icons/projects.png"),
          });
          break;
        case "contact":
          openWindow("contact-me", "Contact Me", <ContactMe />, {
            icon: asset("/assets/icons/contact-me.png"),
          });
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
      </div>
    );
  }
);

export default ContextMenu;
