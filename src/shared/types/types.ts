import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";

export type NoteEditorState = { isOpen: boolean; noteId: string | null; title: string; text: string };

export type NoteStatus = "active" | "archived" | "deleted";

export type NoteProps = { id: string; title: string; text: string; createdAt: number; status: NoteStatus; deletedAt?: number };

export type NotesState = { notes: NoteProps[] };

export type SearchState = { searchQuery: string };

export type SettingsState = { theme: "light" | "dark"; language: string; mainColor: string; trashEnabled: boolean; autoDeletePeriod: number };

export type SortBy = "titleAsc" | "titleDesc" | "dateAsc" | "dateDesc";

export type NotesSorterProps = { sortBy: SortBy; changeSortBy: (newSortBy: SortBy) => void };

export type MoreVertMenuItemProps = { title: string; onClick: () => void; action: () => void };

export type MoreVertMenuProps = { status: NoteStatus; id: string };

export type NotesProps = { notes: NoteProps[] };

type Option = { value: string; name: string };

export type SettingProps = { title: string; value: string; options: Option[]; function: (event: SelectChangeEvent<string>) => void };

export type ButtonProps = { action: () => void; text: string };

export type TextFieldProps = {
  label: string;
  text: string;
  action: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
};

export type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
};

export type SwitchProps = { text: string; name: string; checked: boolean; onChange: (event: ChangeEvent<HTMLInputElement>) => void };

export type Action = { title: string; action: () => void };

export type MenuItemProps = { value: SortBy; text: string };
