import React, { useState, useRef, useEffect } from "react";
import DesktopIcon from "../DesktopIcon/DesktopIcon";
import AboutMe from "../AboutMe/AboutMe";
import Projects from "../Projects/Projects";
import ContactMe from "../ContactMe/ContactMe";
import MyComputer from "../MyComputer/MyComputer";
import MenuBar from "../MenuBar/MenuBar";
import Help from "../Help/Help";
import ContextMenu from "../ContextMenu/ContextMenu";
import { useAppContext } from "../../contexts/useAppContext";
import styles from "./Desktop.module.scss";
import type { DesktopIcon as DesktopIconType } from "./types";

const Desktop: React.FC = () => {
  const { openWindow, showMessage } = useAppContext();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        closeContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  const [desktopIcons, setDesktopIcons] = useState<DesktopIconType[]>([
    {
      id: "my-computer",
      icon: "/assets/icons/my-computer.png",
      label: "My Computer",
      top: 70,
      left: 20,
    },
    {
      id: "about-me",
      icon: "/assets/icons/profile.png",
      label: "About Me",
      top: 170,
      left: 20,
    },
    {
      id: "projects",
      icon: "/assets/icons/projects.png",
      label: "My Projects",
      top: 270,
      left: 20,
    },
    {
      id: "contact-me",
      icon: "/assets/icons/contact-me.png",
      label: "Contact Me",
      top: 370,
      left: 20,
    },
  ]);
  const [draggingIcon, setDraggingIcon] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingIcon) {
        setDesktopIcons((icons) =>
          icons.map((icon) =>
            icon.id === draggingIcon
              ? {
                  ...icon,
                  left: e.clientX - dragOffset.x,
                  top: e.clientY - dragOffset.y,
                }
              : icon
          )
        );
      }
    };

    const handleMouseUp = () => {
      setDraggingIcon(null);
    };

    if (draggingIcon) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingIcon, dragOffset]);

  const orderIconsByName = () => {
    const sortedIcons = [...desktopIcons]
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((icon, index) => ({
        ...icon,
        top: 70 + index * 100,
        left: 20,
      }));
    setDesktopIcons(sortedIcons);
  };

  const handleIconMouseDown = (id: string, e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only drag with left mouse button
    e.preventDefault(); // Prevent text selection
    const icon = desktopIcons.find((icon) => icon.id === id);
    if (icon) {
      const offsetX = e.clientX - icon.left;
      const offsetY = e.clientY - icon.top;
      setDragOffset({ x: offsetX, y: offsetY });
      setDraggingIcon(id);
    }
  };

  const handleIconDoubleClick = (id: string) => {
    switch (id) {
      case "about-me":
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
      case "contact-me":
        openWindow(
          "contact-me",
          "Contact Me",
          <ContactMe />,
          "/assets/icons/contact-me.png"
        );
        break;
      case "my-computer":
        openWindow(
          "my-computer",
          "My Computer",
          <MyComputer />,
          "/assets/icons/my-computer.png"
        );
        break;
      default:
        break;
    }
  };

  const handleMenuClick = (menu: string, item: string) => {
    if (menu === "file" && item === "new") {
      const newWindowId = `new-window-${Date.now()}`;
      openWindow(newWindowId, "New Window", <div>This is a new window.</div>);
    }
    if (menu === "file" && item === "open") {
      showMessage("Open functionality is not implemented yet.");
    }
    if (menu === "file" && item === "save") {
      showMessage("Save functionality is not implemented yet.");
    }
    if (menu === "file" && item === "print") {
      showMessage("Print functionality is not implemented yet.");
    }
    if (menu === "edit" && item === "cut") {
      showMessage("Cut functionality is not implemented yet.");
    }
    if (menu === "edit" && item === "copy") {
      showMessage("Copy functionality is not implemented yet.");
    }
    if (menu === "edit" && item === "paste") {
      showMessage("Paste functionality is not implemented yet.");
    }
    if (menu === "help" && item === "about") {
      openWindow(
        "help",
        "About This Mac",
        <Help />,
        "/assets/icons/finder.png"
      );
    }
    if (menu === "help" && item === "topics") {
      showMessage("Help topics are not implemented yet.");
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <div className={styles.desktop} onContextMenu={handleContextMenu}>
      <MenuBar onMenuClick={handleMenuClick} />
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={`${icon.id}-icon`}
          icon={icon.icon}
          label={icon.label}
          top={icon.top}
          left={icon.left}
          onDoubleClick={() => handleIconDoubleClick(icon.id)}
          onMouseDown={(e) => handleIconMouseDown(icon.id, e)}
          isDragging={draggingIcon === icon.id}
        />
      ))}
      {contextMenu && (
        <ContextMenu
          ref={contextMenuRef}
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          orderIconsByName={orderIconsByName}
        />
      )}
    </div>
  );
};

export default Desktop;
