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
  {
    id: "ch3",
    title: "Chapter 3: Processes",
    noteFile: "ch3.md",
    quizFile: "ch3.json",
  },
  {
    id: "ch4",
    title: "Chapter 4: Threads & Concurrency",
    noteFile: "ch4.md",
    quizFile: "ch4.json",
  },
  {
    id: "ch5",
    title: "Chapter 5: CPU Scheduling",
    noteFile: "ch5.md",
    quizFile: "ch5.json",
  },
  {
    id: "ch6",
    title: "Chapter 6: Synchronization Tools",
    noteFile: "ch6.md",
    quizFile: "ch6.json",
  },
] as const;

export type Comp3511ChapterId = (typeof comp3511Chapters)[number]["id"];
