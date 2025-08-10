import React from "react";
import styles from "./MessageBox.module.scss";
import type { MessageBoxProps } from "./types";

const MessageBox: React.FC<MessageBoxProps> = ({ message, onClose }) => {
  return (
    <div className={styles.messageBoxOverlay}>
      <div className={styles.messageBox}>
        <p>{message}</p>
        <button className="macos9-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
