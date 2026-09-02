import Link from "next/link";
import { notFound } from "next/navigation";
import { NoteViewer } from "@/components/content/NoteViewer";
import { getCourse, type CourseSlug } from "@/lib/courses";
import {
  getAllChapterParams,
  getChapter,
  getNote,
} from "@/lib/content";
import { parseNoteSections } from "@/lib/content/parse-sections";

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
  const note = getNote(slug as CourseSlug, chapter);

  if (!course || !note) {
    return { title: "Note Not Found" };
  }

  return {
    title: `${note.title} — ${course.code}`,
    description: `Notes for ${course.code}, ${note.title}`,
  };
}

export default async function NotePage({ params }: PageProps) {
  const { slug, chapter } = await params;
  const course = getCourse(slug);
  const chapterMeta = getChapter(slug as CourseSlug, chapter);
  const note = getNote(slug as CourseSlug, chapter);

  if (!course || !chapterMeta || !note) {
    notFound();
  }

  const sections = parseNoteSections(note.content);

  return (
    <div className="w-full">
      <div className="border-b-[3px] border-fg px-6 py-4 lg:px-12">
        <nav className="text-sm uppercase tracking-wider">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/courses/${slug}`} className="hover:text-accent">
            {course.code}
          </Link>
          <span className="mx-2">/</span>
          <span>Notes</span>
          <span className="mx-2">/</span>
          <span>{chapterMeta.id}</span>
        </nav>
      </div>

      <NoteViewer sections={sections} content={note.content} />
    </div>
  );
}
