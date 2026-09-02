import Link from "next/link";
import { type CourseSlug, courses } from "@/lib/courses";
import { getChapters, hasContent } from "@/lib/content";
import { BrutalCard } from "./BrutalCard";

type CourseLayoutProps = {
  slug: CourseSlug;
};

export function CourseLayout({ slug }: CourseLayoutProps) {
  const course = courses[slug];
  const chapters = getChapters(slug);
  const contentAvailable = hasContent(slug);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <nav className="mb-8 text-sm uppercase tracking-wider">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{course.code}</span>
      </nav>

      <header className="mb-12 border-b-[3px] border-fg pb-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent">
          {course.code}
        </p>
        <h1 className="text-4xl font-bold uppercase tracking-tight">
          {course.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed">
          {course.description}
        </p>
      </header>

      <div className="flex flex-col gap-8">
        <BrutalCard>
          <h2 className="mb-4 text-xl font-bold uppercase tracking-wider">
            Topics
          </h2>
          {contentAvailable ? (
            <ul className="flex flex-col gap-2">
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <span className="font-bold uppercase tracking-wide">
                    {chapter.id}
                  </span>
                  <span className="mx-2">—</span>
                  <span>{chapter.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm uppercase tracking-wider text-fg/60">
              Topics coming soon
            </p>
          )}
        </BrutalCard>

        <BrutalCard>
          <h2 className="mb-4 text-xl font-bold uppercase tracking-wider">
            Notes
          </h2>
          {contentAvailable ? (
            <ul className="flex flex-col gap-3">
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <Link
                    href={`/courses/${slug}/notes/${chapter.id}`}
                    className="inline-block border-[3px] border-fg px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-fg hover:text-bg"
                  >
                    {chapter.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm uppercase tracking-wider text-fg/60">
              Notes will appear here
            </p>
          )}
        </BrutalCard>

        <BrutalCard>
          <h2 className="mb-4 text-xl font-bold uppercase tracking-wider">
            Quizzes
          </h2>
          {contentAvailable ? (
            <ul className="flex flex-col gap-3">
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <Link
                    href={`/courses/${slug}/quizzes/${chapter.id}`}
                    className="inline-block border-[3px] border-fg px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-fg hover:text-bg"
                  >
                    {chapter.title} — Quiz
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm uppercase tracking-wider text-fg/60">
              Quizzes by topic — coming soon
            </p>
          )}
        </BrutalCard>
      </div>
    </div>
  );
}
