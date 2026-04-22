import Dexie, { Table } from "dexie";
import { NoteProps } from "./shared/types/types";

export class CtrLNoteDB extends Dexie {
  notes!: Table<NoteProps>;

  constructor() {
    super("CtrLNoteDB");

    this.version(1).stores({
      notes: "++id, status, title",
    });
  }
}

export const db = new CtrLNoteDB();
