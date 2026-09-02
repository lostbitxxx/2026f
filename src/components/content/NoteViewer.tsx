"use client";

import { useEffect, useState } from "react";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import type { NoteSection } from "@/lib/content/parse-sections";

type NoteViewerProps = {
  sections: NoteSection[];
  content: string;
};

export function NoteViewer({ sections, content }: NoteViewerProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <aside className="lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] lg:w-72 lg:shrink-0 lg:overflow-y-auto lg:border-r-[3px] lg:border-fg">
        <nav className="border-b-[3px] border-fg px-4 py-4 lg:border-b-0 lg:py-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
            Sections
          </p>
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {sections.map((section) => (
              <li key={section.id} className="shrink-0 lg:shrink">
                <a
                  href={`#${section.id}`}
                  onClick={() => setActiveId(section.id)}
                  className={`block border-[3px] border-fg px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors lg:text-left ${
                    activeId === section.id
                      ? "bg-fg text-bg"
                      : "bg-bg hover:bg-fg/10"
                  }`}
                >
                  {section.title.replace(/^Section \d+: /, "")}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="min-w-0 flex-1 px-6 py-8 lg:px-12 lg:py-12">
        <MarkdownContent content={content} />
      </div>
    </div>
  );
}
