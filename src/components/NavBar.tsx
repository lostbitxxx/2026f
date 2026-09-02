import Link from "next/link";
import { courses, courseSlugs } from "@/lib/courses";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-fg bg-bg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold uppercase tracking-widest hover:text-accent"
        >
          2026F Notes
        </Link>
        <ul className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/"
              className="block border-[3px] border-fg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-fg hover:text-bg"
            >
              Home
            </Link>
          </li>
          {courseSlugs.map((slug) => (
            <li key={slug}>
              <Link
                href={`/courses/${slug}`}
                className="block border-[3px] border-fg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-fg hover:text-bg"
              >
                {courses[slug].code}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
