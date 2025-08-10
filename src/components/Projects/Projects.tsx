import React from "react";
import { useAppContext } from "../../contexts/useAppContext";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import styles from "./Projects.module.scss";

const Projects: React.FC = () => {
  const { openWindow } = useAppContext();

  const handleViewDetails = () => {
    openWindow("project-details", "Project Details", <ProjectDetails />);
  };

  return (
    <div>
      <h2>My Projects</h2>
      <p>Here are some of the projects I've been working on:</p>
      <ul>
        <li>
          <b>Project Alpha:</b> A [brief description] utilizing [technologies].
        </li>
        <li>
          <b>Project Beta:</b> An interactive [brief description] built with
          [tools].
        </li>
        <li>
          <b>Project Gamma:</b> Research into [topic] and its applications.
        </li>
      </ul>
      <p>
        Each project aims to solve a problem or explore a new concept, pushing
        the boundaries of what's possible with code and creativity.
      </p>
      <button className={styles.button} onClick={handleViewDetails}>
        View Details
      </button>
    </div>
  );
};

export default Projects;
