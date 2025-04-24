import React from "react";
import { useSelector } from "react-redux";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Note as NoteType } from "../store/slices/notesSlice";
import { Note } from "../components/Note";
import { RootState } from "../store/store";

export const ArchivePage = () => {
  const { notes } = useSelector((state: RootState) => state.notes);

  const archivedNotes = notes.filter((note) => note.status === "archived");

  return (
    <section className="flex flex-col items-center w-full h-full">
      {archivedNotes.length === 0 ? <EmptyArchive /> : <Archive archivedNotes={archivedNotes} />}
    </section>
  );
};

const EmptyArchive = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <ArchiveIcon sx={{ fontSize: 128 }} />
    <p className="mt-3 text-lg text-[var(--text-secondary)]">Архів ваших нотаток знаходиться тут</p>
  </div>
);

type ArchiveProps = { archivedNotes: NoteType[] };

const Archive: React.FC<ArchiveProps> = ({ archivedNotes }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {archivedNotes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </ul>
  );
};
