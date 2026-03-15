export const BOOKMARKS = [
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

export type PageId = (typeof BOOKMARKS)[number]["id"];

export const GITHUB_REPOS = [
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
      "Personal Website for Thiago Arantes (this one you're looking at 👀)",
    language: "TypeScript",
  },
];

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  CSS: "#563d7c",
  Vue: "#41b883",
};
