import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizViewer } from "@/components/content/QuizViewer";
import { getCourse, type CourseSlug } from "@/lib/courses";
import {
  getAllChapterParams,
  getChapter,
  getQuiz,
} from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string; chapter: string }>;
};

export function generateStaticParams() {
  return getAllChapterParams().map(({ slug, chapter }) => ({
    slug,
    chapter,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, chapter } = await params;
  const course = getCourse(slug);
  const quiz = getQuiz(slug as CourseSlug, chapter);

  if (!course || !quiz) {
    return { title: "Quiz Not Found" };
  }

  return {
    title: `${quiz.title} — ${course.code}`,
    description: `Quiz for ${course.code}, ${quiz.title}`,
  };
}

export default async function QuizPage({ params }: PageProps) {
  const { slug, chapter } = await params;
  const course = getCourse(slug);
  const chapterMeta = getChapter(slug as CourseSlug, chapter);
  const quiz = getQuiz(slug as CourseSlug, chapter);

  if (!course || !chapterMeta || !quiz) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <nav className="mb-8 text-sm uppercase tracking-wider">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/courses/${slug}`} className="hover:text-accent">
          {course.code}
        </Link>
        <span className="mx-2">/</span>
        <span>Quizzes</span>
        <span className="mx-2">/</span>
        <span>{chapterMeta.id}</span>
      </nav>

      <header className="mb-8 border-b-[3px] border-fg pb-6">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent">
          {course.code}
        </p>
        <h1 className="text-3xl font-bold uppercase tracking-tight">
          {quiz.title}
        </h1>
      </header>

      <QuizViewer quiz={quiz} />
    </div>
  );
}
