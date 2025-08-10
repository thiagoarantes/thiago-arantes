import React from "react";
import styles from "./DesktopIcon.module.scss";
import type { DesktopIconProps } from "./types";

const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  icon,
  label,
  top,
  left,
  onDoubleClick,
  onMouseDown,
}) => {
  return (
    <div
      className={styles.desktopIcon}
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
