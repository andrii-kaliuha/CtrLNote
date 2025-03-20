import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectPinnedNotes = (state: RootState) => state.notes.pinnedNotes;
export const selectArchivedNotes = (state: RootState) => state.notes.archivedNotes;
export const selectDeletedNotes = (state: RootState) => state.notes.deletedNotes;
export const selectSearchQuery = (state: RootState) => state.notes.searchQuery;
export const selectSearchHistory = (state: RootState) => state.notes.searchHistory;

export const selectFilteredNotes = createSelector([selectNotes, selectSearchQuery], (notes, searchQuery) => {
  if (!searchQuery) {
    return notes;
  }
  const lowerCaseSearchQuery = searchQuery.toLowerCase();
  return notes.filter(
    (note) => note.title.toLowerCase().includes(lowerCaseSearchQuery) || note.text.toLowerCase().includes(lowerCaseSearchQuery)
  );
});

export const selectFilteredPinnedNotes = createSelector([selectPinnedNotes, selectSearchQuery], (pinnedNotes, searchQuery) => {
  if (!searchQuery) {
    return pinnedNotes;
  }
  const lowerCaseSearchQuery = searchQuery.toLowerCase();
  return pinnedNotes.filter(
    (note) => note.title.toLowerCase().includes(lowerCaseSearchQuery) || note.text.toLowerCase().includes(lowerCaseSearchQuery)
  );
});
