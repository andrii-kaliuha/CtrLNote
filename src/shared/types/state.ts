import { NoteProps } from "./domain";

export type NoteEditorState = { isOpen: boolean; noteId: string | null; title: string; text: string };

export type NotesState = { notes: NoteProps[] };

export type SearchState = { searchQuery: string };

export type SettingsState = { theme: "light" | "dark"; language: string; mainColor: string; trashEnabled: boolean; autoDeletePeriod: number };
