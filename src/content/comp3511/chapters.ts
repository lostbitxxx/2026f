export const comp3511Chapters = [
  {
    id: "ch1",
    title: "Chapter 1: Introduction to Operating Systems",
    noteFile: "ch1.md",
    quizFile: "ch1.json",
  },
] as const;

export type Comp3511ChapterId = (typeof comp3511Chapters)[number]["id"];
