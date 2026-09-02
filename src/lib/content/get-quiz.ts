import fs from "fs";
import path from "path";
import type { CourseSlug } from "@/lib/courses";
import { getChapter } from "./get-chapters";
import type { McQuizQuestion, OpenQuizQuestion, Quiz, QuizQuestion } from "./types";

function normalizeQuestion(raw: Record<string, unknown>): QuizQuestion {
  if (raw.type === "open") {
    return {
      type: "open",
      id: raw.id as string,
      source: raw.source as string,
      prompt: raw.prompt as string,
      answer: raw.answer as string,
    };
  }

  return {
    type: "mc",
    id: raw.id as string,
    source: raw.source as string,
    prompt: raw.prompt as string,
    options: raw.options as McQuizQuestion["options"],
    answer: raw.answer as string,
    explanation: raw.explanation as string,
  };
}

function normalizeQuiz(raw: Record<string, unknown>): Quiz {
  const topics = (raw.topics as Record<string, unknown>[]).map((topic) => ({
    id: topic.id as string,
    title: topic.title as string,
    questions: (topic.questions as Record<string, unknown>[]).map(
      normalizeQuestion,
    ),
  }));

  return {
    id: raw.id as string,
    title: raw.title as string,
    topics,
  };
}

export function getQuiz(
  slug: CourseSlug,
  chapterId: string,
): Quiz | null {
  const chapter = getChapter(slug, chapterId);
  if (!chapter) {
    return null;
  }

  const filePath = path.join(
    process.cwd(),
    "src/content",
    slug,
    "quizzes",
    chapter.quizFile,
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  return normalizeQuiz(JSON.parse(raw) as Record<string, unknown>);
}
