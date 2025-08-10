import React from "react";
import styles from "./MyComputer.module.scss";

const MyComputer: React.FC = () => {
  return (
    <div>
      <h2>My Computer</h2>
      <p>
        Welcome to My Computer! This section would typically display your drives
        and connected devices. For this demo, it's just a placeholder.
      </p>
      <p>Operating System: Mac OS 9.2.2 (Simulated)</p>
      <p>Processor: PowerPC G4 (Simulated)</p>
      <button
        className={styles.button}
        onClick={() => alert("System information unavailable.")}
      >
        System Info
      </button>
    </div>
  );
};

export default MyComputer;
