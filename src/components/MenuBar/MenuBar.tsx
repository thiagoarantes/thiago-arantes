import React, { useState, useEffect } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import styles from "./MenuBar.module.scss";
import type { MenuBarProps } from "./types";
import cn from "classnames";

const MenuBar: React.FC<MenuBarProps> = ({ onMenuClick }) => {
  const [timeToDisplay, setTimeToDisplay] = useState("");
  const [dateToDisplay, setDateToDisplay] = useState("");
  const [isDisplayingTime, setIsDisplayingTime] = useState(true);
  const [showControlPanelsSubmenu, setShowControlPanelsSubmenu] =
    useState(false);
  const { showMessage } = useAppContext();

  useEffect(() => {
    const tickTime = setInterval(() => {
      const now = new Date();

      setTimeToDisplay(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          formatMatcher: "basic",
        })
      );

      setDateToDisplay(
        now.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(tickTime);
  }, []);

  const toggleTime = () => {
    setIsDisplayingTime((current) => !current);
  };

  return (
    <div className={styles.menuBar}>
      <div className={cn(styles.menuItem, styles.appleLogo)}>
        <img src="/assets/icons/apple-logo.png" alt="Apple Logo" />
        <div className={styles.dropdownContent}>
          <a href="#" onClick={() => onMenuClick("apple", "about")}>
            About This Mac
          </a>
          <hr className={styles.menuSeparator} />
          <div
            className={cn(styles.submenuParent)}
            onMouseEnter={() => setShowControlPanelsSubmenu(true)}
            onMouseLeave={() => setShowControlPanelsSubmenu(false)}
          >
            <img
              src="/assets/icons/control-panel.png"
              alt="Control Panels"
              className={styles.menuIcon}
            />
            Control Panels
            <img
              src="/assets/arrow.png"
              alt=">"
              className={styles.submenuArrow}
            />
            {showControlPanelsSubmenu && (
              <div className={styles.submenu}>
                <a href="#" onClick={() => onMenuClick("apple", "appearance")}>
                  Appearance
                </a>
              </div>
            )}
          </div>
        </div>
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
          <a
            href="#"
            onClick={() => showMessage("Help topics are not implemented yet.")}
          >
            Help Topics
          </a>
        </div>
      </div>
      <div className={styles.menuItemSpacer}></div>
      <div id="time-display" onClick={toggleTime}>
        {isDisplayingTime ? timeToDisplay : dateToDisplay}
      </div>
    </div>
  );
};

export default MenuBar;
