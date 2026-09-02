import { notFound } from "next/navigation";
import { CourseLayout } from "@/components/CourseLayout";
import { courseSlugs, getCourse, type CourseSlug } from "@/lib/courses";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return { title: "Course Not Found" };
  }

  return {
    title: `${course.code} — ${course.title}`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  return <CourseLayout slug={slug as CourseSlug} />;
}
