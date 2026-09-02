export const courses = {
  comp2211: {
    code: "COMP2211",
    title: "Exploring Artificial Intelligence",
    description:
      "Introduction to AI concepts, search algorithms, machine learning fundamentals, and intelligent systems.",
  },
  comp2711: {
    code: "COMP2711",
    title: "Discrete Mathematics",
    description:
      "Logic, sets, relations, combinatorics, graphs, and proof techniques for computer science.",
  },
  comp3511: {
    code: "COMP3511",
    title: "Legal Aspects and Ethics of Computing",
    description:
      "Legal frameworks, intellectual property, privacy, and ethical issues in computing and technology.",
  },
} as const;

export type CourseSlug = keyof typeof courses;

export const courseSlugs = Object.keys(courses) as CourseSlug[];

export function getCourse(slug: string) {
  return courses[slug as CourseSlug] ?? null;
}
