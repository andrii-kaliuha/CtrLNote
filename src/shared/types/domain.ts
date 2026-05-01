export type NoteStatus = "active" | "archived" | "deleted";

export type NoteProps = { id: string; title: string; text: string; createdAt: number; status: NoteStatus; deletedAt?: number };

export type SortBy = "titleAsc" | "titleDesc" | "dateAsc" | "dateDesc";
