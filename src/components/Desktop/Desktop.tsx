import React, { useState, useRef, useEffect } from "react";
import DesktopIcon from "../DesktopIcon/DesktopIcon";
import AboutMe from "../AboutMe/AboutMe";
import Projects from "../Projects/Projects";
import ContactMe from "../ContactMe/ContactMe";
import MyComputer from "../MyComputer/MyComputer";
import MenuBar from "../MenuBar/MenuBar";
import Help from "../Help/Help";
import Appearance from "../Appearance/Appearance";
import ContextMenu from "../ContextMenu/ContextMenu";
import Earth from "../Earth/Earth";
import { useAppContext } from "../../hooks/useAppContext";
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
      top: 50,
      right: 20,
    },
    {
      id: "about-me",
      icon: "/assets/icons/profile.png",
      label: "About Me",
      top: 150,
      right: 20,
    },
    {
      id: "projects",
      icon: "/assets/icons/projects.png",
      label: "My Projects",
      top: 250,
      right: 20,
    },
    {
      id: "contact-me",
      icon: "/assets/icons/contact-me.png",
      label: "Contact Me",
      top: 350,
      right: 20,
    },
    {
      id: "earth",
      icon: "/assets/icons/earth.png",
      label: "Earth",
      top: 450,
      right: 20,
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
                  right: window.innerWidth - (e.clientX - dragOffset.x),
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
        top: 50 + index * 100,
        right: 20,
      }));
    setDesktopIcons(sortedIcons);
  };

  const handleIconMouseDown = (id: string, e: React.MouseEvent) => {
    if (e.button !== 0) {
      return; // Only drag with left mouse button
    }

    e.preventDefault(); // Prevent text selection

    const icon = desktopIcons.find((icon) => icon.id === id);

    if (icon) {
      // For right positioning, we need to calculate from the right edge of the viewport
      const rightEdgePosition = window.innerWidth - icon.right;
      const offsetX = e.clientX - rightEdgePosition;
      const offsetY = e.clientY - icon.top;

      setDragOffset({ x: offsetX, y: offsetY });
      setDraggingIcon(id);
    }
  };

  const handleIconDoubleClick = (id: string) => {
    switch (id) {
      case "about-me":
        openWindow("about-me", "About Me", <AboutMe />, {
          icon: "/assets/icons/profile.png",
          size: { width: 550, height: 500 },
        });
        break;
      case "projects":
        openWindow("projects", "My Projects", <Projects />, {
          icon: "/assets/icons/projects.png",
        });
        break;
      case "contact-me":
        openWindow("contact-me", "Contact Me", <ContactMe />, {
          icon: "/assets/icons/contact-me.png",
        });
        break;
      case "my-computer":
        openWindow("my-computer", "My Computer", <MyComputer />, {
          icon: "/assets/icons/my-computer.png",
        });
        break;
      case "earth":
        openWindow("earth", "Earth", <Earth />, {
          icon: "/assets/icons/earth.png",
          size: { width: 650, height: 700 }, // Size to accommodate 650x650 canvas
          disableResize: true, // Disable resize
        });
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
    if (menu === "apple" && item === "about") {
      openWindow("about-this-mac", "About This Mac", <Help />, {
        icon: "/assets/icons/apple-logo.png",
      });
    }
    if (menu === "apple" && item === "appearance") {
      openWindow("appearance", "Appearance", <Appearance />, {
        size: { width: 500, height: 377 },
        disableResize: true,
      });
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
          right={icon.right}
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
