import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/slices/searchSlice";
import { useTranslation } from "react-i18next";
import { NotesGroup } from "../ui/NotesGroup";
import { SearchInput } from "../ui/SearchInput";
import { NoteEditor } from "../components/NoteEditor";
import { RootState } from "../store/store";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const notes = useSelector((state: RootState) => state.notes.notes);
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
    query.trim().length > 0
      ? notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()) || note.text.toLowerCase().includes(query.toLowerCase()))
      : [];

  const pinnedNotes = filteredNotes.filter((note) => note.status === "pinned");
  const activeNotes = filteredNotes.filter((note) => note.status === "active");
  const archivedNotes = filteredNotes.filter((note) => note.status === "archived");
  const deletedNotes = filteredNotes.filter((note) => note.status === "deleted");

  return (
    <section>
      <SearchInput name="search-note" value={query} onChange={handleSearchChange} placeholder={t("search_placeholder")} />

      {query.trim().length === 0 && <p className="text-[var(--text-secondary)] text-center p-3">{t("search_instruction")}</p>}

      {query.trim().length > 0 && filteredNotes.length === 0 && (
        <p className="text-[var(--text-secondary)] text-center p-3">{t("search_no_results", { query })}</p>
      )}

      {query.trim().length > 0 && filteredNotes.length > 0 && (
        <>
          <NotesGroup notes={pinnedNotes} title={t("pinned")} />
          <NotesGroup notes={activeNotes} title={t("notes")} />
          <NotesGroup notes={archivedNotes} title={t("archive")} />
          <NotesGroup notes={deletedNotes} title={t("trash")} />
          <NoteEditor />
        </>
      )}
    </section>
  );
};
