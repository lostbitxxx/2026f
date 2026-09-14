export const comp3511Chapters = [
  {
    id: "ch1",
    title: "Chapter 1: Introduction to Operating Systems",
    noteFile: "ch1.md",
    quizFile: "ch1.json",
  },
  {
    id: "ch2",
    title: "Chapter 2: Operating System Structures",
    noteFile: "ch2.md",
    quizFile: "ch2.json",
  },
] as const;

export type Comp3511ChapterId = (typeof comp3511Chapters)[number]["id"];
