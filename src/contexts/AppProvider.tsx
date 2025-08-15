import { useCallback, useEffect, useState, useRef } from "react";
import type { AppWindow } from "./types";
import { AppContext } from "./AppContext";
import MessageBox from "../components/MessageBox/MessageBox";
import Window from "../components/Window/Window";
import AboutMe from "../components/AboutMe/AboutMe";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [messageBox, setMessageBox] = useState<string | null>(null);
  const [windowZIndex, setWindowZIndex] = useState(10); // Keep track of window z-index
  const [backgroundColor, setBackgroundColor] = useLocalStorage(
    "macos9-background-color",
    "#ccccff"
  ); // Persisted background color
  const hasOpenedInitialWindow = useRef(false);

  const openWindow = useCallback(
    (
      id: string,
      title: string,
      content: React.ReactNode,
      options?: {
        icon?: string;
        size?: { width: number; height: number };
        disableResize?: boolean;
      }
    ) => {
      if (windows.find((w) => w.id === id)) {
        // If window already exists, bring it to front and make it active
        const newZIndex = windowZIndex + 1;
        setWindowZIndex(newZIndex);
        setWindows(
          windows.map((w) => (w.id === id ? { ...w, zIndex: newZIndex } : w))
        );
        setActiveWindow(id);
        return;
      }

      // Generate random position like in the original
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const menuBarHeight = 24;
      const initialWidth = options?.size?.width || 500;
      const initialHeight = options?.size?.height || 350;

      let posX = Math.random() * (viewportWidth - initialWidth - 40) + 20;
      let posY =
        Math.random() * (viewportHeight - initialHeight - menuBarHeight - 40) +
        menuBarHeight +
        20;

      // Clamp positions to ensure they are within the visible area
      posX = Math.max(20, Math.min(posX, viewportWidth - initialWidth - 20));
      posY = Math.max(
        menuBarHeight + 20,
        Math.min(posY, viewportHeight - initialHeight - 20)
      );

      const newZIndex = windowZIndex + 1;
      setWindowZIndex(newZIndex);
      setWindows([
        ...windows,
        {
          id,
          title,
          content,
          icon: options?.icon,
          position: { x: posX, y: posY },
          size: { width: initialWidth, height: initialHeight },
          zIndex: newZIndex,
          disableResize: options?.disableResize,
        },
      ]);
      setActiveWindow(id);
    },
    [windows, windowZIndex]
  );

  const focusWindow = (id: string) => {
    // Bring the focused window to front by giving it a new higher z-index
    const newZIndex = windowZIndex + 1;

    setWindowZIndex(newZIndex);
    setWindows(
      windows.map((w) => (w.id === id ? { ...w, zIndex: newZIndex } : w))
    );
    setActiveWindow(id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id));

    if (activeWindow === id) {
      setActiveWindow(
        windows.length > 1 ? windows[windows.length - 2].id : null
      );
    }
  };

  const showMessage = (message: string) => {
    setMessageBox(message);
  };

  const hideMessage = () => {
    setMessageBox(null);
  };

  // Apply background color to body element
  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  // Open About Me window on app load (only once)
  useEffect(() => {
    if (!hasOpenedInitialWindow.current) {
      hasOpenedInitialWindow.current = true;
      openWindow("about-me", "About Me", <AboutMe />, {
        icon: "/assets/icons/profile.png",
      });
    }
  }, [openWindow]);

  return (
    <AppContext.Provider
      value={{ openWindow, showMessage, setBackgroundColor, backgroundColor }}
    >
      {children}
      {windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          icon={win.icon}
          onClose={() => closeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          isActive={activeWindow === win.id}
          initialPosition={win.position}
          initialSize={win.size}
          zIndex={win.zIndex}
          disableResize={win.disableResize}
        >
          {win.content}
        </Window>
      ))}
      {messageBox && <MessageBox message={messageBox} onClose={hideMessage} />}
    </AppContext.Provider>
  );
};
