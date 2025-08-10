import React from "react";
import styles from "./ContactMe.module.scss";

const ContactMe: React.FC = () => {
  return (
    <div>
      <h2>Contact Me</h2>
      <p>I'd love to hear from you! You can reach me via:</p>
      <ul>
        <li>
          <b>Email:</b>
          <a href="mailto:your.email@example.com">your.email@example.com</a>
        </li>
        <li>
          <b>LinkedIn:</b>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/yourprofile
          </a>
        </li>
        <li>
          <b>GitHub:</b>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/yourusername
          </a>
        </li>
      </ul>
      <p>
        Feel free to send a message or connect on social media. I'm always open
        to new opportunities and collaborations!
      </p>
      <button
        className={styles.button}
        onClick={() => alert("Send Message clicked!")}
      >
        Send Message
      </button>
    </div>
  );
};

export default ContactMe;
