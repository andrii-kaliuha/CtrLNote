import ArchiveIcon from "@mui/icons-material/Archive";
import { useState } from "react";
import notes from "../notes.json";
import { Note } from "./NotesPage";

export const ArchivePage = () => {
  const [isEmpty] = useState(false);
  return <section className="flex flex-col items-center w-full h-full">{isEmpty ? <EmptyArchive /> : <Archive />}</section>;
};

const EmptyArchive = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ArchiveIcon sx={{ fontSize: 128 }} />
      <p>Архів ваших нотаток знаходиться тут</p>
    </div>
  );
};

const Archive = () => {
  return (
    <ul className="columns-1 sm:columns-2 lg:columns-3 gap-3 px-3 w-full">
      {notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </ul>
  );
};
