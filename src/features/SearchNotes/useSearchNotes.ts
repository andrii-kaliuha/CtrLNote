import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { setSearchQuery } from "./searchSlice";
import type { NoteProps } from "../../shared/types/domain";

export const useSearchNotes = (notes: NoteProps[]) => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearchQuery(e.target.value));

  const filteredNotes = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    if (!lowerQuery) return notes;
    return notes.filter((note) => note.title.toLowerCase().includes(lowerQuery) || note.text.toLowerCase().includes(lowerQuery));
  }, [query, notes]);

  return { query, handleSearchChange, filteredNotes };
};
