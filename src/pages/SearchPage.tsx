import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/slices/notesSlice";
import type { NotesState } from "../types";
import { useTranslation } from "react-i18next";
import { NotesGroup } from "../ui/NotesGroup";
import { SearchInput } from "../ui/SearchInput";
import { NoteEditor } from "../components/NoteEditor";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const searchQuery = useSelector((state: { notes: NotesState }) => state.notes.searchQuery);
  const notes = useSelector((state: { notes: NotesState }) => state.notes.notes);
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
    <>
      <SearchInput name="search-note" value={query} onChange={handleSearchChange} placeholder={t("search_placeholder")} />
      {/* Перевіряємо чи є запит */}
      {query.trim().length > 0 ? (
        // Якщо є запит, перевіряємо, чи щось знайдено
        filteredNotes.length > 0 ? (
          <>
            <NotesGroup notes={pinnedNotes} title={t("pinned")} />
            <NotesGroup notes={activeNotes} title={t("notes")} />
            <NotesGroup notes={archivedNotes} title={t("archive")} />
            <NotesGroup notes={deletedNotes} title={t("trash")} />
            <NoteEditor />
          </>
        ) : (
          // Якщо є запит, але нічого не знайдено
          <p className="text-[var(--text-secondary)] text-center p-3">{t("search_no_results", { query })}</p>
        )
      ) : (
        // Якщо запиту немає (поле пошуку порожнє)
        <p className="text-[var(--text-secondary)] text-center p-3">{t("search_instruction")}</p>
      )}
    </>
  );
};
