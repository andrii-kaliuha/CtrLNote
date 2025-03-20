import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotes,
  selectPinnedNotes,
  selectArchivedNotes,
  selectDeletedNotes,
  selectSearchQuery,
  selectSearchHistory,
} from "../store/notesSelectors";
import { setSearchQuery, addSearchQueryToHistory } from "../store/slices/notesSlice";
import { Note } from "./NotesPage";

export const SearchPage = () => {
  const notes = useSelector(selectNotes);
  const pinnedNotes = useSelector(selectPinnedNotes);
  const archivedNotes = useSelector(selectArchivedNotes);
  const deletedNotes = useSelector(selectDeletedNotes);
  const searchQuery = useSelector(selectSearchQuery);
  const searchHistory = useSelector(selectSearchHistory);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(searchQuery);

  const handleSearch = () => {
    dispatch(setSearchQuery(searchValue));
    dispatch(addSearchQueryToHistory(searchValue));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const allNotes = useMemo(() => {
    return [...notes, ...pinnedNotes, ...archivedNotes, ...deletedNotes];
  }, [notes, pinnedNotes, archivedNotes, deletedNotes]);

  const filteredNotes = useMemo(() => {
    if (!searchQuery) {
      return [];
    }
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return allNotes.filter(
      (note) => note.title.toLowerCase().includes(lowerCaseSearchQuery) || note.text.toLowerCase().includes(lowerCaseSearchQuery)
    );
  }, [allNotes, searchQuery]);

  return (
    <section>
      <div className="flex">
        <input type="text" value={searchValue} onChange={handleSearchChange} placeholder="Пошук нотаток..." />
        <button onClick={handleSearch}>Пошук</button>
      </div>

      <div>
        <h2>Результати пошуку</h2>
        <ul className="columns-1 md:columns-2 lg:columns-3 gap-3 w-full">
          {filteredNotes.map((note) => (
            <Note key={note.id} {...note} />
          ))}
        </ul>
      </div>

      <div>
        <h2>Історія пошуку</h2>
        <ul>
          {searchHistory.map((query, index) => (
            <li key={index}>{query}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
