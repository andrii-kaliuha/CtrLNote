import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { openEmptyNoteEditor } from "../store/slices/noteEditorSlice";
import { useTranslation } from "react-i18next";
import type { SortBy } from "../shared/types/types";
import { NoteEditor } from "../components/NoteEditor";
import { Notes } from "../components/Notes";
import { NotesSorter } from "../components/NotesSorter";
import { sortNotesArray } from "../shared/utils/sortNotesArray";

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
          <div className="pl-3 pb-3 sm:p-3 flex justify-between items-center">
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

      <Notes notes={activeNotes} addButton={true} action={handleCreateNewNote} />
      <NoteEditor />
    </section>
  );
};
