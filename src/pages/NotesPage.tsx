import { IconButton } from "@mui/material";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import type { SortBy } from "../types";
import { NoteEditor } from "../components/NoteEditor";
import { Notes } from "../components/Notes";
import { Note } from "../components/Note";
import { Add } from "@mui/icons-material";
import { openEmptyNoteEditor } from "../store/slices/noteEditorSlice";
import { useTranslation } from "react-i18next";
import { NotesSorter, sortNotesArray } from "../components/NotesSorter";

export const NotesPage = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const [pinnedSortBy, setPinnedSortBy] = useState<SortBy>("dateDesc");
  const [activeSortBy, setActiveSortBy] = useState<SortBy>("dateDesc");

  const pinnedNotes = useMemo(() => {
    const filtered = notes.filter((note) => note.status === "pinned");

    return sortNotesArray(filtered, pinnedSortBy);
  }, [notes, pinnedSortBy]);

  const activeNotes = useMemo(() => {
    const filtered = notes.filter((note) => note.status === "active");

    return sortNotesArray(filtered, activeSortBy);
  }, [notes, activeSortBy]);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleCreateNewNote = () => {
    dispatch(openEmptyNoteEditor());
  };

  return (
    <section>
      {pinnedNotes.length > 0 && (
        <>
          <div className="p-3 flex justify-between items-center">
            <h2>{t("pinned")}</h2>
            <NotesSorter sortBy={pinnedSortBy} changeSortBy={setPinnedSortBy} />
          </div>
          <Notes notes={pinnedNotes} />
        </>
      )}
      <div className="p-3 flex justify-between items-center">
        <h2>{t("notes")}</h2>
        <NotesSorter sortBy={activeSortBy} changeSortBy={setActiveSortBy} />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {activeNotes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
        <li className="p-3 rounded-lg relative bg-[var(--color-surface)] flex justify-center items-center h-[180px]">
          <IconButton onClick={handleCreateNewNote} sx={{ ":hover": { backgroundColor: "var(--color-hover)" } }}>
            <Add sx={{ width: 48, height: 48, color: "var(--text-primary)" }} />
          </IconButton>
        </li>
      </ul>
      <NoteEditor />
    </section>
  );
};
