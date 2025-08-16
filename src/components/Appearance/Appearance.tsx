import React, { useState } from "react";
import cn from "classnames";
import { useAppContext } from "../../hooks/useAppContext";
import styles from "./Appearance.module.scss";
import type { TabName } from "./types";

const colorPatterns = [
  { name: "Azul Dark", color: "#4169E1" },
  { name: "Azul Extra Light", color: "#E6F3FF" },
  { name: "Azul Light", color: "#ccccff" },
  { name: "Blue Dalmatian", image: "/assets/wallpapers/blue-dalmatian.png" },
  { name: "Blueberry", color: "#6495ED" },
  {
    name: "Blueberry Oxigen",
    image: "/assets/wallpapers/blueberry-oxigen.png",
  },
  { name: "Blueberry Union", image: "/assets/wallpapers/blueberry-union.png" },
  { name: "Bondi", color: "#0BB5FF" },
  { name: "Bondi Dark", color: "#0080C7" },
  { name: "Bondi Extra Dark", color: "#003F7F" },
  { name: "Bondi Light", color: "#87CEEB" },
  { name: "Capsules", image: "/assets/wallpapers/capsules.png" },
  { name: "Default", image: "/assets/wallpapers/default.png" },
  { name: "Forest Green", color: "#228B22" },
  { name: "Graphite", color: "#696969" },
  { name: "Green Apple", color: "#8DB600" },
  { name: "Heavy Petal", image: "/assets/wallpapers/heavy-petal.png" },
  { name: "Indigo Foam", image: "/assets/wallpapers/indigo-foam.png" },
  { name: "Jade", color: "#00A86B" },
  { name: "Lime", color: "#32CD32" },
  { name: "MacOS", image: "/assets/wallpapers/macos.png" },
  { name: "Mint", color: "#98FB98" },
  { name: "Orange", color: "#FF8C00" },
  { name: "Pine", color: "#01796F" },
  { name: "Purple", color: "#9370DB" },
  { name: "Quantum Foam", image: "/assets/wallpapers/quantum-foam.png" },
  { name: "Red", color: "#DC143C" },
  { name: "Sage", color: "#9CAF88" },
  { name: "Sea Green", color: "#2E8B57" },
  { name: "Silver", color: "#C0C0C0" },
  { name: "Spring Green", color: "#00FF7F" },
  { name: "Strawberry", color: "#FF69B4" },
  { name: "Tangerine", color: "#FF7F50" },
  {
    name: "Tangerine Fusion",
    image: "/assets/wallpapers/tangerine-fusion.png",
  },
  { name: "Tub", image: "/assets/wallpapers/tub.png" },
  { name: "UFO", image: "/assets/wallpapers/ufo.png" },
];

const Appearance: React.FC = () => {
  const { setBackgroundColor, setBackgroundImage } = useAppContext();
  const [activeTab, setActiveTab] = useState<TabName>("Desktop");
  const [selectedPattern, setSelectedPattern] = useState("Azul Light");

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
      if ("image" in selectedColorPattern && selectedColorPattern.image) {
        setBackgroundImage(selectedColorPattern.image);
      } else if (
        "color" in selectedColorPattern &&
        selectedColorPattern.color
      ) {
        setBackgroundImage(""); // Clear any existing background image
        setBackgroundColor(selectedColorPattern.color);
      }
    }
  };

  const renderDesktopTab = () => {
    const selectedColorPattern = colorPatterns.find(
      (p) => p.name === selectedPattern
    );

    return (
      <div className={styles.desktopTab}>
        <div className={styles.desktopContent}>
          <div className={styles.leftSection}>
            <div className={styles.previewSection}>
              <label className={styles.sectionLabel}>Preview:</label>
              <div
                className={styles.previewArea}
                style={
                  selectedColorPattern && "image" in selectedColorPattern
                    ? {
                        backgroundImage: `url(${selectedColorPattern.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }
                    : {
                        backgroundColor:
                          selectedColorPattern?.color || "#ccccff",
                      }
                }
              >
                <div className={styles.previewDesktop}>
                  <div className={styles.previewIcon}></div>
                  <div className={styles.previewIcon}></div>
                  <div className={styles.previewIcon}></div>
                </div>
              </div>
              <div className={styles.patternInfo}>
                <div className={styles.infoText}>
                  Pattern: {selectedPattern}
                </div>
                <div className={styles.infoText}>16 x 16, 126 bytes</div>
                <div className={styles.infoText}>
                  Picture:{" "}
                  {selectedColorPattern && "image" in selectedColorPattern
                    ? "Yes"
                    : "None"}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.patternSection}>
              <label className={styles.sectionLabel}>Patterns:</label>
              <div className={styles.patternList}>
                {colorPatterns.map((pattern) => (
                  <div
                    key={pattern.name}
                    className={cn(styles.patternItem, {
                      [styles.selectedPattern]:
                        pattern.name === selectedPattern,
                    })}
                    onClick={() => setSelectedPattern(pattern.name)}
                  >
                    <div
                      className={styles.colorSwatch}
                      style={
                        "image" in pattern
                          ? {
                              backgroundImage: `url(${pattern.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }
                          : { backgroundColor: pattern.color }
                      }
                    />
                    {pattern.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <button
            className={styles.setDesktopButton}
            onClick={handleSetDesktop}
          >
            Set Desktop
          </button>
        </div>
      </div>
    );
  };

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
