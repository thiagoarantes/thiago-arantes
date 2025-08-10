import React from "react";
import styles from "./AboutMe.module.scss";

const AboutMe: React.FC = () => {
  return (
    <div>
      <h2>About Me</h2>
      <p>
        Hello! I'm [Your Name], a passionate individual interested in [Your
        Interests/Field]. I enjoy [Hobby 1], [Hobby 2], and exploring new
        technologies. This website is a tribute to the classic Mac OS 9, a
        timeless operating system that shaped early computing experiences.
      </p>
      <p>
        I built this site to showcase my [skills/projects] and share a bit about
        myself in a unique, retro style. Feel free to explore the "desktop" and
        open the various "applications" (windows) to learn more!
      </p>
      <button
        className={styles.button}
        onClick={() => alert("You clicked the About Me button!")}
      >
        Learn More
      </button>
    </div>
  );
};

export default AboutMe;
