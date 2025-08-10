import React from "react";
import styles from "./ProjectDetails.module.scss";

const ProjectDetails: React.FC = () => {
  return (
    <div>
      <h2>Project Details</h2>
      <p>
        This is a placeholder for project details. Here, you would typically
        find more in-depth information about a specific project, including:
      </p>
      <ul>
        <li>Project Goals and Objectives</li>
        <li>Technologies Used</li>
        <li>Challenges Faced and Solutions</li>
        <li>Screenshots or Demos</li>
        <li>Links to Live Demos or Repositories</li>
      </ul>
      <p>You can customize this content for each of your projects.</p>
      <button
        className={styles.button}
        onClick={() => alert("No more details available for this demo.")}
      >
        Back to Projects
      </button>
    </div>
  );
};

export default ProjectDetails;
