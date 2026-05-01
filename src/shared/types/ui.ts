import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import { NoteProps, NoteStatus, SortBy } from "./domain";

export type NotesProps = { notes: NoteProps[] };

export type NotesSorterProps = { sortBy: SortBy; changeSortBy: (newSortBy: SortBy) => void };

export type MoreVertMenuProps = { status: NoteStatus; id: string };

type Option = { value: string; name: string };

export type SettingProps = {
  idKey: string;
  title: string;
  value: string;
  options: Option[];
  onChange: (event: SelectChangeEvent<string>) => void;
};

export type ButtonProps = { action: () => void; text: string };

export type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
};

export type SwitchProps = { text: string; name: string; checked: boolean; onChange: (event: ChangeEvent<HTMLInputElement>) => void };

export type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
};
