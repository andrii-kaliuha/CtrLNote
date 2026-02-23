import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { openEmptyNoteEditor } from "../store/slices/noteEditorSlice";
import { useTranslation } from "react-i18next";
import type { SortBy } from "../shared/types/types";
import { NoteEditor } from "../components/NoteEditor";
import { Notes } from "../components/Notes";
import { NotesSorter } from "../components/NotesSorter";
import { sortNotesArray } from "../shared/utils/sortNotesArray";
import { SearchInput } from "../shared/ui/SearchInput";
import { setSearchQuery } from "../store/slices/searchSlice";
import { IconButton } from "@mui/material";
import { Add, MoreVert } from "@mui/icons-material";
import { NoteEditor2 } from "../components/NoteEditor2";

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

  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const [query, setQuery] = useState(() => searchQuery ?? "");

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearchQuery(value));
  };

  const filteredNotes =
    query.trim().length > 0 ?
      notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()) || note.text.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <section className="h-full w-full flex gap-3">
      {/* <div className="flex overflow-auto min-w-74 flex-1"> */}
      <div className="flex min-w-74 flex-1">
        {/* <SearchInput name="search-note" value={query} onChange={handleSearchChange} placeholder={t("search_placeholder")} /> */}
        {/* {pinnedNotes.length > 0 && (
        <>
          <div className="pl-3 pb-3 sm:p-3 flex justify-between items-center">
            <h2>{t("pinned")}</h2>
            <NotesSorter sortBy={pinnedSortBy} changeSortBy={setPinnedSortBy} />
          </div>
          <Notes notes={pinnedNotes} />
        </>
      )} */}

        <div className="flex flex-col gap-3">
          {/* <div className="pb-3 flex gap-3 overflow-auto"> */}
          <div className="flex gap-3">
            {/* <h2>{t("notes")}</h2> */}
            <SearchInput name="search-note" value={query} onChange={handleSearchChange} placeholder={t("search_placeholder")} />
            <AddNoteButton action={handleCreateNewNote} />
            <EditMenu />
            {/* <NotesSorter sortBy={activeSortBy} changeSortBy={setActiveSortBy} /> */}
          </div>
          <div className="overflow-y-auto">
            <Notes notes={activeNotes} addButton={true} action={handleCreateNewNote} />
          </div>
        </div>
      </div>
      {/* <NoteEditor2 /> */}
      <NoteEditor />
    </section>
  );
};

const AddNoteButton = ({ action }: { action: () => void }) => {
  return (
    <IconButton aria-label="Add note" onClick={action} sx={{ backgroundColor: "var(--color-surface)", borderRadius: "8px", padding: "12px" }}>
      <Add sx={{ width: 24, height: 24, color: "var(--text-primary)" }} />
    </IconButton>
  );
};

const EditMenu = () => {
  return (
    <IconButton aria-label="Add note" sx={{ backgroundColor: "var(--color-surface)", borderRadius: "8px", padding: "12px" }}>
      <MoreVert sx={{ width: 24, height: 24, color: "var(--text-primary)" }} />
    </IconButton>
  );
};
