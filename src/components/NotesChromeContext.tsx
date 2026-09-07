"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type NotesChromeContextValue = {
  sectionsOpen: boolean;
  setSectionsOpen: (open: boolean) => void;
  toggleSections: () => void;
  sectionsSidebarId: string;
};

const NotesChromeContext = createContext<NotesChromeContextValue | null>(null);

export function NotesChromeProvider({ children }: { children: ReactNode }) {
  const [sectionsOpen, setSectionsOpen] = useState(true);
  const sectionsSidebarId = useId();

  const toggleSections = useCallback(() => {
    setSectionsOpen((open) => !open);
  }, []);

  const value = useMemo(
    () => ({
      sectionsOpen,
      setSectionsOpen,
      toggleSections,
      sectionsSidebarId,
    }),
    [sectionsOpen, toggleSections, sectionsSidebarId],
  );

  return (
    <NotesChromeContext.Provider value={value}>
      {children}
    </NotesChromeContext.Provider>
  );
}

export function useNotesChrome() {
  const context = useContext(NotesChromeContext);
  if (!context) {
    throw new Error("useNotesChrome must be used within NotesChromeProvider");
  }
  return context;
}
