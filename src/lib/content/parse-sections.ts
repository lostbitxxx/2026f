export type NoteSection = {
  id: string;
  title: string;
};

export function getHeadingId(text: string): string | undefined {
  const sectionMatch = text.match(/^Section (\d+):/);
  if (sectionMatch) {
    return `section-${sectionMatch[1]}`;
  }

  if (text.startsWith("Final Key Takeaways")) {
    return "final-key-takeaways";
  }

  return undefined;
}

export function parseNoteSections(content: string): NoteSection[] {
  const sections: NoteSection[] = [];

  for (const line of content.split("\n")) {
    const sectionHeading = line.match(/^### (Section \d+: .+)$/);
    if (sectionHeading) {
      const title = sectionHeading[1];
      const id = getHeadingId(title);
      if (id) {
        sections.push({ id, title });
      }
      continue;
    }

    const takeawaysHeading = line.match(/^## (Final Key Takeaways.+)$/);
    if (takeawaysHeading) {
      const title = takeawaysHeading[1];
      const id = getHeadingId(title);
      if (id) {
        sections.push({ id, title });
      }
    }
  }

  return sections;
}
