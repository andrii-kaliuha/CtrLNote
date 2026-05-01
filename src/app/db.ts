import Dexie, { Table } from "dexie";
import type { NoteProps } from "../shared/types/domain";

interface MyDatabase extends Dexie {
  notes: Table<NoteProps>;
}

export const db = new Dexie("CtrLNoteDB") as MyDatabase;

db.version(1).stores({
  notes: "++id, status, title",
});
