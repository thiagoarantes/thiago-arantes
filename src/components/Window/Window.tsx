import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import styles from "./Window.module.scss";
import type { WindowProps } from "./types";
import cn from "classnames";
import { GEOMETRY_KEY_PREFIX, loadSavedGeometry } from "./utils";

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  children,
  onClose,
  onFocus,
  isActive,
  initialPosition = { x: 50, y: 50 },
  initialSize = { width: 500, height: 350 },
  zIndex = 10,
  disableResize = false,
}) => {
  const saved = useMemo(() => loadSavedGeometry(id), [id]);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(
    saved ? { x: saved.x, y: saved.y } : initialPosition,
  );
  const [size, setSize] = useState(
    saved ? { width: saved.width, height: saved.height } : initialSize,
  );
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [originalState, setOriginalState] = useState({
    x: saved?.x ?? initialPosition.x,
    y: saved?.y ?? initialPosition.y,
    width: saved?.width ?? initialSize.width,
    height: saved?.height ?? initialSize.height,
  });
  const windowRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleTitlebarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only start dragging if clicking on the titlebar itself, not buttons
    if ((e.target as HTMLElement).tagName === "BUTTON") {
      return;
    }

    setIsDragging(true);

    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseDown = () => {
    onFocus();
  };

  const handleMaximize = () => {
    if (isMinimized) {
      handleMinimize();
      return;
    }

    if (isMaximized) {
      // Restore
      setPosition({ x: originalState.x, y: originalState.y });
      setSize({ width: originalState.width, height: originalState.height });
      setIsMaximized(false);
    } else {
      // Save current state
      setOriginalState({
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
      });
      // Maximize
      setPosition({ x: 0, y: 24 }); // Below menu bar
      setSize({
        width: window.innerWidth - 4,
        height: window.innerHeight - 30,
      });
      setIsMaximized(true);
    }
  };

  const handleMinimize = () => {
    const newIsMinimized = !isMinimized;

    setIsMinimized((current) => !current);

    if (newIsMinimized) {
      setSize({ width: initialSize.width, height: 20 });
    } else {
      setSize({ width: initialSize.width, height: initialSize.height });
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && windowRef.current) {
        let newX = e.clientX - dragStartPos.current.x;
        let newY = e.clientY - dragStartPos.current.y;

        // Boundary checks to keep window within viewport and below menu bar
        const menuBarHeight = 24;
        const windowRect = windowRef.current.getBoundingClientRect();

        // Keep window from going above menu bar
        if (newY < menuBarHeight) {
          newY = menuBarHeight;
        }

        // Keep window from going off left edge
        if (newX < 0) {
          newX = 0;
        }

        // Keep window from going off right edge
        if (newX + windowRect.width > window.innerWidth) {
          newX = window.innerWidth - windowRect.width;
        }

        // Keep window from going off bottom edge
        if (newY + windowRect.height > window.innerHeight) {
          newY = window.innerHeight - windowRect.height;
        }

        setPosition({ x: newX, y: newY });
      }
    },
    [isDragging],
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Track manual resize via CSS resize and update state
  useEffect(() => {
    if (!windowRef.current || disableResize) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        setSize({ width, height });

        if (height <= 20) {
          setIsMinimized(true);
        }

        // Update original state for maximize functionality (only if not maximized)
        if (!isMaximized) {
          setOriginalState((prev) => ({
            ...prev,
            width,
            height,
          }));
        }
      }
    });

    resizeObserver.observe(windowRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [disableResize, isMaximized]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, isDragging]);

  // Persist window geometry to localStorage (debounced, skip maximized/minimized)
  useEffect(() => {
    if (isMaximized || isMinimized) return;

    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(
          `${GEOMETRY_KEY_PREFIX}${id}`,
          JSON.stringify({
            x: position.x,
            y: position.y,
            width: size.width,
            height: size.height,
          }),
        );
      } catch {
        /* ignore quota errors */
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    id,
    position.x,
    position.y,
    size.width,
    size.height,
    isMaximized,
    isMinimized,
  ]);

  return (
    <div
      ref={windowRef}
      id={id}
      className={cn(styles.window, {
        [styles.inactive]: !isActive,
        [styles.noResize]: disableResize,
        [styles.minimized]: isMinimized,
      })}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={styles.windowTitlebar}
        onMouseDown={handleTitlebarMouseDown}
      >
        <div className={styles.windowControlsLeft}>
          <button
            className={cn(styles.windowControlButton, styles.closeButton)}
            title="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          ></button>
        </div>
        <span className={styles.windowTitle}>
          {icon && (
            <img className={styles.windowTitleIcon} src={icon} alt={title} />
          )}
          <span>{title}</span>
        </span>
        <div className={styles.windowControlsRight}>
          <button
            className={cn(styles.windowControlButton, styles.maximizeButton, {
              [styles.disabled]: disableResize,
            })}
            title="Maximize"
            onClick={(e) => {
              e.stopPropagation();
              if (!disableResize) handleMaximize();
            }}
            disabled={disableResize}
          ></button>
          <button
            className={cn(styles.windowControlButton, styles.minimizeButton)}
            title="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              handleMinimize();
            }}
          ></button>
        </div>
      </div>
      <div
        className={cn(styles.windowContent, {
          [styles.minimized]: isMinimized,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Window;
