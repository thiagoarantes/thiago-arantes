import React from "react";
import styles from "./DesktopIcon.module.scss";
import type { DesktopIconProps } from "./types";
import cn from "classnames";

const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  icon,
  label,
  top,
  left,
  onDoubleClick,
  onMouseDown,
  isDragging = false,
}) => {
  return (
    <div
      className={cn(styles.desktopIcon, { [styles.dragging]: isDragging })}
      id={id}
      style={{ top: top, left: left }}
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
    >
      <img src={icon} alt={label} className={styles.iconImage} />
      <span>{label}</span>
    </div>
  );
};

export default DesktopIcon;
