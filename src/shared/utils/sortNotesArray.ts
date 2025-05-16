import { NoteProps, SortBy } from "../types/types";

export const sortNotesArray = (notes: NoteProps[], sortBy: SortBy): NoteProps[] => {
  const sortedNotes = [...notes];
  switch (sortBy) {
    case "titleAsc":
      sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "titleDesc":
      sortedNotes.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "dateAsc":
      sortedNotes.sort((a, b) => a.createdAt - b.createdAt);
      break;
    case "dateDesc":
      sortedNotes.sort((a, b) => b.createdAt - a.createdAt);
      break;
  }
  return sortedNotes;
};
