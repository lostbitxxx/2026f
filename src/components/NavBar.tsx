"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useNotesChrome } from "@/components/NotesChromeContext";
import { courses, courseSlugs } from "@/lib/courses";

function isNotesPath(pathname: string) {
  return /^\/courses\/[^/]+\/notes(\/|$)/.test(pathname);
}

export function NavBar() {
  const pathname = usePathname();
  const onNotes = isNotesPath(pathname);
  const { sectionsOpen, toggleSections, sectionsSidebarId, setSectionsOpen } =
    useNotesChrome();
  const [coursesOpen, setCoursesOpen] = useState(false);
  const coursesSidebarId = useId();

  useEffect(() => {
    setCoursesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!coursesOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCoursesOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [coursesOpen]);

  function openCourses() {
    setCoursesOpen(true);
    setSectionsOpen(false);
  }

  const navButtonClass =
    "border-[3px] border-fg bg-bg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-fg hover:text-bg";

  return (
    <>
      <header className="sticky top-0 z-50 border-b-[3px] border-fg bg-bg">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="text-lg font-bold uppercase tracking-widest hover:text-accent"
          >
            2026F Notes
          </Link>

          {onNotes ? (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                aria-expanded={coursesOpen}
                aria-controls={coursesSidebarId}
                onClick={() => (coursesOpen ? setCoursesOpen(false) : openCourses())}
                className={navButtonClass}
              >
                Courses
              </button>
              <button
                type="button"
                aria-expanded={sectionsOpen}
                aria-controls={sectionsSidebarId}
                onClick={() => {
                  setCoursesOpen(false);
                  toggleSections();
                }}
                className={navButtonClass}
              >
                {sectionsOpen ? "Hide Sections" : "Sections"}
              </button>
            </div>
          ) : (
            <ul className="flex flex-wrap items-center gap-2">
              {courseSlugs.map((slug) => (
                <li key={slug}>
                  <Link href={`/courses/${slug}`} className={`block ${navButtonClass}`}>
                    {courses[slug].code}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </header>

      {coursesOpen && (
        <button
          type="button"
          aria-label="Close courses sidebar"
          className="fixed inset-0 z-[55] bg-fg/40"
          onClick={() => setCoursesOpen(false)}
        />
      )}

      <aside
        id={coursesSidebarId}
        hidden={!coursesOpen}
        className="fixed inset-y-0 left-0 z-[60] w-72 overflow-y-auto border-r-[3px] border-fg bg-bg"
      >
        <nav className="px-4 py-8">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">
              Courses
            </p>
            <button
              type="button"
              onClick={() => setCoursesOpen(false)}
              className="border-[3px] border-fg bg-bg px-2 py-1 text-xs font-bold uppercase tracking-widest hover:bg-fg hover:text-bg"
            >
              Close
            </button>
          </div>
          <ul className="flex flex-col gap-1">
            {courseSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/courses/${slug}`}
                  onClick={() => setCoursesOpen(false)}
                  className="block border-[3px] border-fg bg-bg px-3 py-2 text-left text-xs font-bold uppercase tracking-wide transition-colors hover:bg-fg hover:text-bg"
                >
                  {courses[slug].code}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
