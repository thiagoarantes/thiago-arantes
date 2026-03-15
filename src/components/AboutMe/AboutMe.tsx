import React, { useState } from "react";
import styles from "./AboutMe.module.scss";
import cn from "classnames";
import { asset } from "../../utils/asset";

const BOOKMARKS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/thiagoarantes/",
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/thiagoarantes",
  },
] as const;

type PageId = (typeof BOOKMARKS)[number]["id"];

const AboutMe: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>("linkedin");
  const [url, setUrl] = useState<string>(BOOKMARKS[0].url);

  const navigateTo = (id: PageId) => {
    const bookmark = BOOKMARKS.find((b) => b.id === id);
    if (bookmark) {
      setActivePage(id);
      setUrl(bookmark.url);
    }
  };

  const handleGo = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.browser}>
      <div className={styles.toolbar}>
        <div className={styles.navButtons}>
          <button className={styles.navButton} title="Back" disabled>
            ◀
          </button>
          <button className={styles.navButton} title="Forward" disabled>
            ▶
          </button>
          <button
            className={styles.navButton}
            title="Refresh"
            onClick={() => navigateTo(activePage)}
          >
            ⟳
          </button>
          <button
            className={styles.navButton}
            title="Home"
            onClick={() => navigateTo("linkedin")}
          >
            🏠
          </button>
        </div>
        <div className={styles.addressBar}>
          <label className={styles.addressLabel} htmlFor="browser-url">
            Address
          </label>
          <div className={styles.addressInputWrapper}>
            <img
              className={styles.addressFavicon}
              src={asset("/assets/icons/earth.png")}
              alt=""
            />
            <input
              id="browser-url"
              className={styles.addressInput}
              type="text"
              value={url}
              readOnly
              spellCheck={false}
            />
          </div>
          <button className={styles.goButton} onClick={handleGo}>
            Go
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.bookmarksPanel}>
          <div className={styles.bookmarksHeader}>Bookmarks</div>
          <ul className={styles.bookmarksList}>
            {BOOKMARKS.map((bookmark) => (
              <li key={bookmark.id}>
                <button
                  className={cn(styles.bookmarkItem, {
                    [styles.bookmarkActive]: activePage === bookmark.id,
                  })}
                  onClick={() => navigateTo(bookmark.id)}
                >
                  {bookmark.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.content}>
          {activePage === "linkedin" && <LinkedInPage />}
          {activePage === "github" && <GitHubPage />}
        </div>
      </div>

      <div className={styles.statusBar}>
        <span className={styles.statusText}>Done</span>
        <span className={styles.statusZone}>Internet</span>
      </div>
    </div>
  );
};

const LinkedInPage: React.FC = () => (
  <div className={styles.linkedinPage}>
    <div className={styles.profileHeader}>
      <div className={styles.profileCover} />
      <div className={styles.profileInfo}>
        <div className={styles.profileAvatar}>
          <img src={asset("/assets/icons/profile.png")} alt="Thiago Arantes" />
        </div>
        <div className={styles.profileDetails}>
          <h2 className={styles.profileName}>Thiago Arantes</h2>
          <p className={styles.profileHeadline}>
            Front End Developer — Making the web awesome
          </p>
          <p className={styles.profileLocation}>Pierrefonds, Quebec, Canada</p>
          <p className={styles.profileCompany}>Autodesk</p>
        </div>
      </div>
    </div>

    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>About</h3>
      <p>
        I am a Front End Developer, and my true passion and calling is to make
        the web awesome. I enjoy building creative user interfaces and exploring
        new technologies — like this Mac OS 9 retro desktop you're looking at
        right now.
      </p>
    </div>

    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Languages</h3>
      <ul className={styles.infoList}>
        <li>
          <strong>French</strong> — Native or bilingual
        </li>
        <li>
          <strong>English</strong> — Native or bilingual
        </li>
        <li>
          <strong>Portuguese</strong> — Native or bilingual
        </li>
        <li>
          <strong>Spanish</strong> — Limited working proficiency
        </li>
      </ul>
    </div>

    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Certifications</h3>
      <ul className={styles.infoList}>
        <li>
          <strong>Team Leadership Learner</strong> — Blanchard (Sep 2025)
        </li>
        <li>
          <strong>AWS Certified Cloud Practitioner</strong> — Amazon Web
          Services (Nov 2022)
        </li>
      </ul>
    </div>

    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Honors &amp; Awards</h3>
      <ul className={styles.infoList}>
        <li>
          <strong>Bravissimo — Digital Engagement 2020</strong> — Intact
          Financial Corporation
        </li>
        <li>
          <strong>IntactLab Hackathon 2019 — 1st place</strong> — Intact
          Financial Corporation
        </li>
      </ul>
    </div>

    <div className={styles.pageFooter}>
      <a
        href="https://www.linkedin.com/in/thiagoarantes/"
        target="_blank"
        rel="noopener noreferrer"
      >
        View full profile on LinkedIn ↗
      </a>
    </div>
  </div>
);

const GITHUB_REPOS = [
  {
    name: "tindermon",
    description: "Tinder like application with Pokemon Theme",
    language: "TypeScript",
  },
  {
    name: "nuns",
    description: "Novice Log Sheet for Nuns on the Run board game",
    language: "CSS",
  },
  {
    name: "json2tree",
    description:
      "React App that converts JSON and JS arrays into visual TreeView components",
    language: "TypeScript",
  },
  {
    name: "teacherSheet",
    description: "Sheet for oral exam correction in English courses",
    language: "Vue",
  },
  {
    name: "hackerNews",
    description: "Simple version of Hacker News tool using Angular 19",
    language: "TypeScript",
  },
  {
    name: "pokemon-battle",
    description: "React 19 app to simulate a simple Pokemon Battle",
    language: "TypeScript",
  },
  {
    name: "thiago-arantes",
    description:
      "Personal Website for Thiago Arantes (this one your looking at 👀)",
    language: "TypeScript",
  },
];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  CSS: "#563d7c",
  Vue: "#41b883",
};

const GitHubPage: React.FC = () => (
  <div className={styles.githubPage}>
    <div className={styles.ghHeader}>
      <div className={styles.ghAvatar}>
        <img src={asset("/assets/icons/profile.png")} alt="Thiago Arantes" />
      </div>
      <div className={styles.ghUserInfo}>
        <h2 className={styles.ghDisplayName}>Thiago Arantes</h2>
        <p className={styles.ghUsername}>thiagoarantes</p>
        <p className={styles.ghBio}>
          Front End Engineer with a big passion for UX and amazing user
          interfaces.
        </p>
      </div>
    </div>

    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Popular repositories</h3>
      <div className={styles.ghRepoGrid}>
        {GITHUB_REPOS.map((repo) => (
          <div key={repo.name} className={styles.ghRepoCard}>
            <a
              className={styles.ghRepoName}
              href={`https://github.com/thiagoarantes/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.name}
            </a>
            <p className={styles.ghRepoDesc}>{repo.description}</p>
            <div className={styles.ghRepoMeta}>
              <span
                className={styles.ghLangDot}
                style={{
                  backgroundColor: LANGUAGE_COLORS[repo.language] || "#888",
                }}
              />
              <span>{repo.language}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className={styles.pageFooter}>
      <a
        href="https://github.com/thiagoarantes"
        target="_blank"
        rel="noopener noreferrer"
      >
        View full profile on GitHub ↗
      </a>
    </div>
  </div>
);

export default AboutMe;
