import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { setSearchQuery } from "./searchSlice";
import { NoteProps } from "../../shared/types/types";

export const useSearchNotes = (notes: NoteProps[]) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const [query, setQuery] = useState(searchQuery ?? "");

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearchQuery(value));
  };

  const filteredNotes = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    if (!lowerQuery) return notes;

    if (lowerQuery.startsWith("#")) {
      const tagQuery = lowerQuery.slice(1);
      return notes.filter((note) => note.tags?.some((tag) => tag.toLowerCase().includes(tagQuery)));
    }

    return notes.filter((note) => note.title.toLowerCase().includes(lowerQuery) || note.text.toLowerCase().includes(lowerQuery));
  }, [query, notes]);

  return { query, handleSearchChange, filteredNotes };
};
