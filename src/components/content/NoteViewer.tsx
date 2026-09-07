"use client";

import { useEffect, useState } from "react";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import { useNotesChrome } from "@/components/NotesChromeContext";
import type { NoteSection } from "@/lib/content/parse-sections";

type NoteViewerProps = {
  sections: NoteSection[];
  content: string;
};

function isMobileViewport() {
  return window.matchMedia("(max-width: 1023px)").matches;
}

export function NoteViewer({ sections, content }: NoteViewerProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const { sectionsOpen, setSectionsOpen, sectionsSidebarId } = useNotesChrome();

  useEffect(() => {
    setSectionsOpen(!isMobileViewport());
  }, [setSectionsOpen]);

  useEffect(() => {
    if (!sectionsOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isMobileViewport()) {
        setSectionsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sectionsOpen, setSectionsOpen]);

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

  function handleSectionClick(sectionId: string) {
    setActiveId(sectionId);
    if (isMobileViewport()) {
      setSectionsOpen(false);
    }
  }

  return (
    <div className="flex w-full flex-col lg:flex-row">
      {sectionsOpen && (
        <button
          type="button"
          aria-label="Close sections sidebar"
          className="fixed inset-0 z-[55] bg-fg/40 lg:hidden"
          onClick={() => setSectionsOpen(false)}
        />
      )}

      <aside
        id={sectionsSidebarId}
        hidden={!sectionsOpen}
        className="fixed inset-y-0 left-0 z-[60] w-72 overflow-y-auto border-r-[3px] border-fg bg-bg lg:sticky lg:top-[57px] lg:z-auto lg:h-[calc(100vh-57px)] lg:shrink-0"
      >
        <nav className="px-4 py-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
            Sections
          </p>
          <ul className="flex flex-col gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => handleSectionClick(section.id)}
                  className={`block border-[3px] border-fg px-3 py-2 text-left text-xs font-bold uppercase tracking-wide transition-colors ${
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
