import { BrutalButton } from "@/components/BrutalButton";
import { BrutalCard } from "@/components/BrutalCard";
import { courseSlugs, courses } from "@/lib/courses";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="mb-16 border-[3px] border-fg bg-bg p-10 brutal-shadow">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">
          Fall 2026
        </p>
        <h1 className="text-5xl font-bold uppercase leading-tight tracking-tight">
          Course Notes
          <br />
          &amp; Quizzes
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed">
          Study notes and topic-based quizzes for your courses. Pick a course
          below to get started.
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold uppercase tracking-wider">
          Courses
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courseSlugs.map((slug) => {
            const course = courses[slug];
            return (
              <BrutalCard key={slug} className="flex flex-col justify-between">
                <div>
                  <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent">
                    {course.code}
                  </p>
                  <h3 className="mb-3 text-xl font-bold uppercase tracking-tight">
                    {course.title}
                  </h3>
                  <p className="text-sm leading-relaxed">{course.description}</p>
                </div>
                <div className="mt-8">
                  <BrutalButton href={`/courses/${slug}`}>Enter</BrutalButton>
                </div>
              </BrutalCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
