import React from "react";
import { useSelector } from "react-redux";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Note as NoteType } from "../store/slices/notesSlice";
import { Note } from "../components/Note";
import { RootState } from "../store/store";

export const ArchivePage = () => {
  // Фільтруємо архівовані нотатки з єдиного масиву
  const allNotes = useSelector((state: RootState) => state.notes.notes);
  const archivedNotes = allNotes.filter((note) => note.status === "archived");

  return (
    <section className="flex flex-col items-center w-full h-full p-4">
      {archivedNotes.length === 0 ? <EmptyArchive /> : <Archive archivedNotes={archivedNotes} />}
    </section>
  );
};

const EmptyArchive = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <ArchiveIcon sx={{ fontSize: 128 }} />
    <p className="mt-4 text-lg text-gray-600">Архів ваших нотаток знаходиться тут</p>
  </div>
);

interface ArchiveProps {
  archivedNotes: NoteType[];
}

const Archive: React.FC<ArchiveProps> = ({ archivedNotes }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {archivedNotes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </ul>
  );
};
