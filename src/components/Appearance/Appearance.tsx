import React from "react";
import cn from "classnames";
import { useAppContext } from "../../hooks/useAppContext";
import styles from "./Appearance.module.scss";

// Color palette based on the context menu (keeping the same colors)
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

const Appearance: React.FC = () => {
  const { setBackgroundColor, backgroundColor } = useAppContext();

  const handleColorSelect = (color: string) => {
    setBackgroundColor(color);
  };

  return (
    <div className={styles.appearance}>
      <h2>Appearance</h2>
      <div className={styles.section}>
        <h3>Desktop Background</h3>
        <p>Select a color for your desktop background:</p>
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
    </div>
  );
};

export default Appearance;
