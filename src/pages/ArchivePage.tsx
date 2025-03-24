import React from "react";
import { useSelector } from "react-redux";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Note as NoteType } from "../store/slices/notesSlice";
import { Note } from "../components/Note";
import { RootState } from "../store/store";

export const ArchivePage = () => {
  const archivedNotes = useSelector((state: RootState) => state.notes.archivedNotes);

  return (
    <section className="flex flex-col items-center w-full h-full">
      {archivedNotes.length === 0 ? <EmptyArchive /> : <Archive archivedNotes={archivedNotes} />}
    </section>
  );
};

const EmptyArchive = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ArchiveIcon sx={{ fontSize: 128 }} />
      <p>Архів ваших нотаток знаходиться тут</p>
    </div>
  );
};

interface ArchiveProps {
  archivedNotes: NoteType[];
}

const Archive: React.FC<ArchiveProps> = ({ archivedNotes }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {archivedNotes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </ul>
  );
};
