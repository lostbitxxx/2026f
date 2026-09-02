import type { CourseSlug } from "@/lib/courses";
import { comp3511Chapters } from "@/content/comp3511/chapters";
import type { Chapter } from "./types";

const chapterRegistry: Partial<Record<CourseSlug, readonly Chapter[]>> = {
  comp3511: comp3511Chapters,
};

export function hasContent(slug: CourseSlug): boolean {
  return Boolean(chapterRegistry[slug]?.length);
}

export function getChapters(slug: CourseSlug): readonly Chapter[] {
  return chapterRegistry[slug] ?? [];
}

export function getChapter(slug: CourseSlug, chapterId: string): Chapter | null {
  return getChapters(slug).find((chapter) => chapter.id === chapterId) ?? null;
}

export function getAllChapterParams(): { slug: CourseSlug; chapter: string }[] {
  const params: { slug: CourseSlug; chapter: string }[] = [];

  for (const slug of Object.keys(chapterRegistry) as CourseSlug[]) {
    for (const chapter of getChapters(slug)) {
      params.push({ slug, chapter: chapter.id });
    }
  }

  return params;
}
