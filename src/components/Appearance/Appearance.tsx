import React, { useState } from "react";
import cn from "classnames";
import { useAppContext } from "../../hooks/useAppContext";
import styles from "./Appearance.module.scss";
import type { TabName } from "./types";

const colorPatterns = [
  { name: "Azul Dark", color: "#4169E1" },
  { name: "Azul Extra Light", color: "#E6F3FF" },
  { name: "Azul Light", color: "#ccccff" },
  { name: "Blueberry", color: "#6495ED" },
  { name: "Bondi", color: "#0BB5FF" },
  { name: "Bondi Dark", color: "#0080C7" },
  { name: "Bondi Extra Dark", color: "#003F7F" },
  { name: "Bondi Light", color: "#87CEEB" },
  { name: "Forest Green", color: "#228B22" },
  { name: "Graphite", color: "#696969" },
  { name: "Green Apple", color: "#8DB600" },
  { name: "Jade", color: "#00A86B" },
  { name: "Lime", color: "#32CD32" },
  { name: "Mint", color: "#98FB98" },
  { name: "Orange", color: "#FF8C00" },
  { name: "Pine", color: "#01796F" },
  { name: "Purple", color: "#9370DB" },
  { name: "Red", color: "#DC143C" },
  { name: "Sage", color: "#9CAF88" },
  { name: "Sea Green", color: "#2E8B57" },
  { name: "Silver", color: "#C0C0C0" },
  { name: "Spring Green", color: "#00FF7F" },
  { name: "Strawberry", color: "#FF69B4" },
  { name: "Tangerine", color: "#FF7F50" },
];

const Appearance: React.FC = () => {
  const { setBackgroundColor } = useAppContext();
  const [activeTab, setActiveTab] = useState<TabName>("Desktop");
  const [selectedPattern, setSelectedPattern] = useState("Azul Light");
  const [positionAutomatically, setPositionAutomatically] = useState(true);

  const tabs: TabName[] = [
    "Themes",
    "Appearance",
    "Fonts",
    "Desktop",
    "Sound",
    "Options",
  ];

  const handleSetDesktop = () => {
    const selectedColorPattern = colorPatterns.find(
      (p) => p.name === selectedPattern
    );

    if (selectedColorPattern) {
      setBackgroundColor(selectedColorPattern.color);
    }
  };

  const renderDesktopTab = () => (
    <div className={styles.desktopTab}>
      <div className={styles.desktopContent}>
        <div className={styles.leftSection}>
          <div className={styles.patternSection}>
            <label className={styles.sectionLabel}>Patterns:</label>
            <div className={styles.patternList}>
              {colorPatterns.map((pattern) => (
                <div
                  key={pattern.name}
                  className={cn(styles.patternItem, {
                    [styles.selectedPattern]: pattern.name === selectedPattern,
                  })}
                  onClick={() => setSelectedPattern(pattern.name)}
                >
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: pattern.color }}
                  />
                  {pattern.name}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.patternInfo}>
            <div className={styles.infoText}>Pattern: {selectedPattern}</div>
            <div className={styles.infoText}>16 x 16, 126 bytes</div>
            <div className={styles.infoText}>Picture: None</div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.pictureSection}>
            <label className={styles.sectionLabel}>Picture:</label>
            <button className={styles.placePictureButton}>
              Place Picture...
            </button>
          </div>
          <div className={styles.positionSection}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={positionAutomatically}
                onChange={(e) => setPositionAutomatically(e.target.checked)}
                className={styles.checkbox}
              />
              Position Automatically
            </label>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <button className={styles.setDesktopButton} onClick={handleSetDesktop}>
          Set Desktop
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Desktop":
        return renderDesktopTab();
      default:
        return (
          <div className={styles.tabPlaceholder}>
            <p>{activeTab} tab content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.appearance}>
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={cn(styles.tab, {
              [styles.activeTab]: tab === activeTab,
            })}
            onClick={() => setActiveTab(tab)}
            disabled={tab !== "Desktop"}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{renderTabContent()}</div>
    </div>
  );
};

export default Appearance;
