import fs from "fs";
import path from "path";
import type { CourseSlug } from "@/lib/courses";
import { getChapter } from "./get-chapters";
import type { Note } from "./types";

export function getNote(
  slug: CourseSlug,
  chapterId: string,
): Note | null {
  const chapter = getChapter(slug, chapterId);
  if (!chapter) {
    return null;
  }

  const filePath = path.join(
    process.cwd(),
    "src/content",
    slug,
    "notes",
    chapter.noteFile,
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1] ?? chapter.title;

  return {
    id: chapterId,
    title,
    content,
  };
}
