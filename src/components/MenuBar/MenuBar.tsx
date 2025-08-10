import React, { useState, useEffect } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import styles from "./MenuBar.module.scss";
import type { MenuBarProps } from "./types";
import cn from "classnames";

const MenuBar: React.FC<MenuBarProps> = ({ onMenuClick }) => {
  const [time, setTime] = useState("");
  const { showMessage } = useAppContext();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        formatMatcher: "basic",
      };

      setTime(now.toLocaleTimeString("en-US", options));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.menuBar}>
      <div className={cn(styles.menuItem, styles.appleLogo)}>
        <img src="/assets/icons/apple-logo.png" alt="Apple Logo" />
      </div>
      <div className={styles.menuItem}>
        File
        <div className={styles.dropdownContent}>
          <a href="#" onClick={() => onMenuClick("file", "new")}>
            New Window
          </a>
          <a
            href="#"
            onClick={() =>
              showMessage("Open functionality is not implemented yet.")
            }
          >
            Open...
          </a>
          <a
            href="#"
            onClick={() =>
              showMessage("Save functionality is not implemented yet.")
            }
          >
            Save
          </a>
          <a
            href="#"
            onClick={() =>
              showMessage("Print functionality is not implemented yet.")
            }
          >
            Print
          </a>
        </div>
      </div>
      <div className={styles.menuItem}>
        Edit
        <div className={styles.dropdownContent}>
          <a
            href="#"
            onClick={() =>
              showMessage("Cut functionality is not implemented yet.")
            }
          >
            Cut
          </a>
          <a
            href="#"
            onClick={() =>
              showMessage("Copy functionality is not implemented yet.")
            }
          >
            Copy
          </a>
          <a
            href="#"
            onClick={() =>
              showMessage("Paste functionality is not implemented yet.")
            }
          >
            Paste
          </a>
        </div>
      </div>
      <div className={styles.menuItem}>
        Help
        <div className={styles.dropdownContent}>
          <a href="#" onClick={() => onMenuClick("help", "about")}>
            About This Mac
          </a>
          <a
            href="#"
            onClick={() => showMessage("Help topics are not implemented yet.")}
          >
            Help Topics
          </a>
        </div>
      </div>
      <div className={styles.menuItemSpacer}></div>
      <div className={styles.menuItem} id="time-display">
        {time}
      </div>
    </div>
  );
};

export default MenuBar;
