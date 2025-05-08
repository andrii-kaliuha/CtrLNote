import { Notes } from "../components/Notes";
import { NotesGroupProps } from "../types";

export const NotesGroup: React.FC<NotesGroupProps> = ({ notes, title }) =>
  notes.length > 0 && (
    <>
      <h2 className="text-lg p-3">{title}</h2>
      <Notes notes={notes} />
    </>
  );
